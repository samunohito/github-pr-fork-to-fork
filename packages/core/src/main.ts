import { fetchRepoInfo } from './api.js';
import { buildPullRequestUrl, extractOrgName, extractRepoName, isGitHubUrl } from './utils.js';

export async function appendForkToForkPullRequestLink() {
  const location = window.location.href;
  if (!isGitHubUrl(location)) {
    return;
  }

  const orgName = extractOrgName(location);
  const repoName = extractRepoName(location);
  if (!orgName || !repoName) {
    return
  }

  const ptn = new RegExp(`^/${orgName}/${repoName}/compare(/.+\?expand=1)?$`);
  const compareLinkElements = [...document.querySelectorAll(`a[href^="/${orgName}/${repoName}/compare"]`)]
    .filter(elem => {
      const href = elem.getAttribute('href');

      // - pr作成リンクの形式に則っているか
      // - この拡張機能で作ったリンクでないか（IDの有無で判定可能）
      return (href && ptn.test(href)) && !elem.id;
    });
  if (!compareLinkElements.length) {
    return;
  }

  const repoInfo = await fetchRepoInfo(orgName, repoName);
  if (!repoInfo || !repoInfo.default_branch || !repoInfo.parent) {
    // リポジトリ情報が取得できない場合やフォーク元がない場合はスキップ
    return;
  }
  const defaultBranch = repoInfo.default_branch;

  for (const compareLinkElement of compareLinkElements) {
    const detectedCompareLink = compareLinkElement.getAttribute('href');
    if (!detectedCompareLink) {
      // ほぼ型ガードだが、hrefがないものはスキップ
      continue;
    }

    const clonedElemId = `${compareLinkElement.textContent?.includes('Compare & pull request') ? 'compare-pull-request' : 'new-pull-request'}-fork-to-fork`
    if (document.getElementById(clonedElemId)) {
      // すでに複製したリンクが存在する場合はスキップ（ID生成ロジックを使いまわしたいのでここでやってる）
      continue;
    }

    // レイアウトが崩れるので少し調整
    compareLinkElement.classList.remove('mr-sm-n1', 'ml-sm-3');

    // pull requestのリンクを複製してfork to forkのリンクを作成
    const cloneCompareLinkElement = compareLinkElement.cloneNode(true) as HTMLAnchorElement;
    cloneCompareLinkElement.id = clonedElemId;
    cloneCompareLinkElement.setAttribute('href', buildPullRequestUrl(detectedCompareLink, orgName, repoName, defaultBranch));
    cloneCompareLinkElement.innerHTML = `${compareLinkElement.innerHTML} to fork`;

    // そのまま突っ込むと表示がおかしくなるので微調整するためのdivを作成
    const styledDiv = document.createElement('div');
    styledDiv.style.display = 'flex';
    styledDiv.style.alignItems = 'center';
    styledDiv.style.gap = '8px';
    compareLinkElement.parentElement?.append(styledDiv);

    styledDiv.append(compareLinkElement);
    styledDiv.append(cloneCompareLinkElement);

    console.log(`[GitHub Pull Request Fork to Fork] replaced ${detectedCompareLink} to ${compareLinkElement.getAttribute('href')}`);
  }
}