import React, {useState, useEffect} from 'react';
import {useSubscription} from '@apollo/react-hooks';
import {
  membershipUpdatedSubscription,
  membershipListUpdatedSubscription,
  membershipDestroyedSubscription
} from './operations.gql';
import User from '../User';

const MembershipList = () => {
  const [memberships, setMemberships] = useState([]);
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    fetch(`/api/${window.location.pathname}/memberships`)
      .then(res => res.json())
      .then(result => {
        setMemberships(result);
      });
  }, []);

  useSubscription(membershipDestroyedSubscription, {
    skip,
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {membershipDestroyed} = data;
      if (membershipDestroyed) {
        const {id} = membershipDestroyed;
        setMemberships(memberships => memberships.filter(el => el.id !== id));
      }
    },
    variables: {boardSlug: window.location.pathname.split('/')[2]}
  });

  useSubscription(membershipUpdatedSubscription, {
    skip,
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {membershipUpdated} = data;
      if (membershipUpdated) {
        const {id} = membershipUpdated;
        setMemberships(memberships => {
          const objIndex = memberships.findIndex(obj => obj.id === id);
          return [
            ...memberships.slice(0, objIndex),
            membershipUpdated,
            ...memberships.slice(objIndex + 1)
          ];
        });
      }
    },
    variables: {boardSlug: window.location.pathname.split('/')[2]}
  });

  useSubscription(membershipListUpdatedSubscription, {
    skip,
    onSubscriptionData: opts => {
      const {data} = opts.subscriptionData;
      const {membershipListUpdated} = data;
      if (membershipListUpdated) {
        setMemberships(memberships =>
          memberships.concat(membershipListUpdated)
        );
      }
    },
    variables: {boardSlug: window.location.pathname.split('/')[2]}
  });

  useEffect(() => {
    setSkip(false);
  }, []);

  const usersListComponent = memberships.map(membership => {
    return (
      <User
        key={membership.id}
        shouldDisplayReady
        membership={membership}
        shouldHandleDelete={false}
      />
    );
  });
  return (
    <>
      <p>users on this board:</p>
      <div className="tags">{usersListComponent}</div>
    </>
  );
};

export default MembershipList;
