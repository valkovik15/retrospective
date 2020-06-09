const logError = async error => {
  const errorHash = await error.json();
  console.log(errorHash.error);
};

const getCSRFToken = () => {
  return document
    .querySelector("meta[name='csrf-token']")
    .getAttribute('content');
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-Token': getCSRFToken()
};

export const createComment = async (cardId, commentContent, onComplete) => {
  try {
    const response = await fetch(
      `/api${window.location.pathname}/cards/${cardId}/comments`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          content: commentContent
        })
      }
    );
    if (response.status === 200) {
      onComplete();
    } else {
      throw response;
    }
  } catch (error) {
    await logError(error);
  }
};

export const editCard = async (cardId, inputValue, resetFunc) => {
  try {
    const response = await fetch(
      `/api${window.location.pathname}/cards/${cardId}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          edited_body: inputValue
        })
      }
    );
    if (response.status !== 200) {
      resetFunc();
      throw response;
    }
  } catch (error) {
    await logError(error);
  }
};

export const editComment = async (cardId, commentId, inputValue, resetFunc) => {
  try {
    const response = await fetch(
      `/api${window.location.pathname}/cards/${cardId}/comments/${commentId}`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          content: inputValue
        })
      }
    );
    if (response.status !== 200) {
      resetFunc();
      throw response;
    }
  } catch (error) {
    await logError(error);
  }
};

export const likeCard = async cardId => {
  try {
    const response = await fetch(
      `/api${window.location.pathname}/cards/${cardId}/like`,
      {
        method: 'PUT',
        headers
      }
    );
    if (response.status !== 200) {
      throw response;
    }
  } catch (error) {
    await logError(error);
  }
};

export const removeCard = async (cardId, onComplete) => {
  try {
    const response = await fetch(
      `/api${window.location.pathname}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers
      }
    );
    if (response.status !== 204) {
      throw response;
    } else if (onComplete) {
      onComplete(response);
    }
  } catch (error) {
    await logError(error);
  }
};

export const removeComment = async (cardId, commentId, onComplete) => {
  try {
    const response = await fetch(
      `/api${window.location.pathname}/cards/${cardId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers
      }
    );
    if (response.status !== 204) {
      throw response;
    } else if (onComplete) {
      onComplete(response);
    }
  } catch (error) {
    await logError(error);
  }
};
