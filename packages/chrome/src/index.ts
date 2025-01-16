import debounce, { type DebouncedFunction } from "debounce";
import { appendForkToForkPullRequestLink } from "github-pr-fork-to-fork-core";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let debounceHandle: DebouncedFunction<any> | null = null;
const observer = new MutationObserver(async () => {
  if (!window.location.pathname.match(/^\/[^/]+\/[^/]+(\/pulls)?$/g)) {
    return;
  }

  if (debounceHandle?.isPending) {
    debounceHandle.clear();
  }

  debounceHandle = debounce(() => appendForkToForkPullRequestLink(), 300);
  debounceHandle();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});