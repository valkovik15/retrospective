function request(entityPath, method) {
  return fetch(entityPath, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").getAttribute('content')
    }
  });
}

export function destroy(id, onSuccess = () => {}, onFailure = () => {}) {
  const entityPath = `/api/${window.location.pathname}/action_items/${id}`;
  const method = 'DELETE';

  request(entityPath, method)
  .then((result) => {
    if (result.status == 204) {
      onSuccess();
      console.log('action_item #destroy success');
    }
    else { throw result }
  }).catch((error) => {
    error.json().then( errorHash => {
      onFailure();
      console.log(errorHash.error)
    })
  });  
}

export function move(id, onSuccess = () => {}, onFailure = () => {}) {
  const entityPath = `/api/${window.location.pathname}/action_items/${id}/move`;
  const method = 'POST';

  request(entityPath, method)
  .then((result) => {
    if (result.status == 200) {
      onSuccess();
      console.log('action_item #move success');
    }
    else { throw result }
  }).catch((error) => {
    error.json().then( errorHash => {
      onFailure();
      console.log(errorHash.error)
    })
  });  
}

export function transition(id, action, onSuccess = () => {}, onFailure = () => {}) {
  const entityPath = `/api/${window.location.pathname}/action_items/${id}/${action}`;
  const method = 'PUT';

  request(entityPath, method)
  .then((result) => {
    if (result.status == 200) {
      onSuccess();
      console.log(`action_item #${action} success`);
    }
    else { throw result }
  }).catch((error) => {
    error.json().then( errorHash => {
      onFailure();
      console.log(errorHash.error)
    })
  });  
}
