export const getClientLanguage = () => {
  return Intl.DateTimeFormat().resolvedOptions().locale.substring(0, 2);
};
