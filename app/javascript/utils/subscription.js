import {useEffect} from 'react';
import consumer from '../channels/consumer';

export function useBoardSubscription(handler) {
  useEffect(() => {
    const sub = consumer.subscriptions.create(
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
