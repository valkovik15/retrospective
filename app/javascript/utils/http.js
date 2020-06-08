export const getCSRFToken = () => {
  const tokenContainer = document.querySelector("meta[name='csrf-token']");
  if (!tokenContainer) {
    throw new Error('No CSRF token attached to page');
  }

  return tokenContainer.getAttribute('content');
};

export const getHeaders = (
  accept = 'application/json',
  contentType = 'application/json'
) => {
  return {
    Accept: accept,
    'Content-Type': contentType,
    'X-CSRF-Token': getCSRFToken()
  };
};
