const githubDomain = 'https://github.com';

export function isGitHubUrl(url: string) {
  return url.startsWith(githubDomain);
}

export function extractOrgName(url: string) {
  if (!isGitHubUrl(url)) {
    return '';
  }

  return url.replace(`${githubDomain}/`, '').split('/')[0];
}

export function extractRepoName(url: string) {
  if (!isGitHubUrl(url)) {
    return '';
  }

  const orgName = extractOrgName(url);
  return url.replace(`${githubDomain}/${orgName}/`, '').split('/')[0];
}

export function buildPullRequestUrl(detectedCompareUrl: string, orgName: string, repoName: string, defaultBranch: string) {
  const compareLink = `/${orgName}/${repoName}/compare`;
  if (detectedCompareUrl === compareLink) {
    // [New pull request]ボタンの場合
    return `/${orgName}/${repoName}/compare/${defaultBranch}...${orgName}:${defaultBranch}?expand=1`;
  }

  // [Compare & pull request]ボタンの場合
  const targetBranch = detectedCompareUrl.replace(`${compareLink}/`, '').split('?')[0];
  if (!targetBranch) {
    throw new Error('Target branch is not found');
  }

  return `/${orgName}/${repoName}/compare/${defaultBranch}...${orgName}:${targetBranch}?expand=1`;
}