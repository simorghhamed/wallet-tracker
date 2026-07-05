export const getPlatform = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/android/.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
  if (/win/.test(userAgent)) return "windows";
  if (/mac/.test(userAgent)) return "macos";
  if (/linux/.test(userAgent)) return "linux";

  return "unknown";
};
