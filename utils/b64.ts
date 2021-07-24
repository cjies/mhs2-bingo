export function stringToB64(str: string): string {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export function b64ToString(str: string): string {
  return decodeURIComponent(escape(window.atob(str)));
}
