import {useEffect} from 'react';
import ActionCable from 'actioncable';

export function useBoardSubscription(handler) {
  useEffect(() => {
    const sub = ActionCable.createConsumer().subscriptions.create(
      {
        channel: 'BoardChannel',
        board: window.location.pathname.slice(
          window.location.pathname.lastIndexOf('/') + 1
        )
      },
      {
        received: handler
      }
    );
    return function() {
      sub.unsubscribe();
    };
  }, [handler]);
}
