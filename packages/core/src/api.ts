export async function fetchRepoInfo(orgName: string, repoName: string) {
  const response = await fetch(`https://api.github.com/repos/${orgName}/${repoName}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
      // Authorization: `Bearer `,
    },
  });
  return await response.json();
}