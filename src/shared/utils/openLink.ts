import * as WebBrowser from "expo-web-browser";

type OpenLinkOptions = {
  /** Tints the interactive controls (iOS only; Android styles its own tab). */
  controlsColor?: string;
};

/**
 * Opens a URL in the system in-app browser (SFSafariViewController /
 * Chrome Custom Tabs) so the site keeps its own origin, cookies and terms.
 * Never render third-party pages in a WebView.
 */
export function openLink(url: string, options: OpenLinkOptions = {}) {
  return (
    WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      ...options,
    })
      // Rejects when a browser is already open, which a double tap causes.
      // Nothing to tell the user — the first tap already opened the page.
      .catch(() => undefined)
  );
}
