/**
 * GitHub Pages 주소에서 GitHub 저장소 주소를 추출한다.
 * 예) https://user.github.io/my-app/ → https://github.com/user/my-app
 * @param {string} pagesUrl - 배포된 GitHub Pages URL
 * @returns {string} 저장소 URL (GitHub Pages 주소가 아니면 빈 문자열)
 */
export function getGithubRepoUrl(pagesUrl) {
  try {
    const { hostname, pathname } = new URL(pagesUrl);
    const match = hostname.match(/^([^.]+)\.github\.io$/i);
    if (!match) return '';

    const owner = match[1];
    const repo = pathname.split('/').filter(Boolean)[0] ?? `${owner}.github.io`;
    return `https://github.com/${owner}/${repo}`;
  } catch {
    return '';
  }
}
