import React, {useState, useEffect} from 'react';
import {useMutation, useQuery, useSubscription} from '@apollo/react-hooks';
import {
  toggleReadyStatusMutation,
  getMembership,
  membershipUpdatedSubscription
} from './operations.gql';

const ReadyButton = () => {
  const [isReady, setIsReady] = useState(false);
  const [id, setId] = useState(0);
  const [skipQuery, setSkipQuery] = useState(false);
  const [skipSubscription, setSkipSubscription] = useState(true);
  const {loading, data} = useQuery(getMembership, {
    variables: {boardSlug: window.location.pathname.split('/')[2]},
    skip: skipQuery
  });
  const [toggleReadyStatus] = useMutation(toggleReadyStatusMutation);

  useSubscription(membershipUpdatedSubscription, {
    skip: skipSubscription,
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {membershipUpdated} = data;
      if (membershipUpdated && membershipUpdated.id === id) {
        setIsReady(membershipUpdated.ready);
      }
    },
    variables: {boardSlug: window.location.pathname.split('/')[2]}
  });

  useEffect(() => {
    if (!loading && Boolean(data)) {
      const {membership} = data;
      setId(membership.id);
      setIsReady(membership.ready);
      setSkipQuery(true);
    }
  }, [data, loading]);

  useEffect(() => {
    setSkipSubscription(false);
  }, []);

  return (
    <button
      className={`button is-large ${isReady ? 'is-success' : ''}`}
      type="button"
      onClick={() => {
        toggleReadyStatus({
          variables: {
            id
          }
        }).then(({data}) => {
          if (!data.toggleReadyStatus.membership) {
            console.log(data.toggleReadyStatus.errors.fullMessages.join(' '));
          }
        });
      }}
    >
      READY
    </button>
  );
};

export default ReadyButton;
