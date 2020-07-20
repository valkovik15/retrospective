import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import {useMutation} from '@apollo/react-hooks';
import {inviteMembersMutation} from './operations.gql';
import User from '../User';

const InviteBlock = props => {
  const [memberships, setMemberships] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`/api/boards/${props.boardSlug}/memberships`)
      .then(res => res.json())
      .then(result => {
        setMemberships(result);
      });
  }, []);

  const [inviteMembers] = useMutation(inviteMembersMutation);

  const handleSubmit = e => {
    e.preventDefault();
    inviteMembers({
      variables: {
        email: selectedOption.map(a => a.value).toString(),
        boardSlug: window.location.pathname.split('/')[2]
      }
    }).then(({data}) => {
      if (data.inviteMembers.memberships) {
        const {memberships} = data.inviteMembers;
        setMemberships(oldMemberships => [
          ...new Set(oldMemberships.concat(memberships))
        ]);
        setSelectedOption(null);
      } else {
        console.log(data.inviteMembers.errors.fullMessages.join(' '));
        setSelectedOption(null);
      }
    });
  };

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
  };

  const onInputChange = e => {
    if (e) {
      fetch(`/api/boards/${props.boardSlug}/suggestions?autocomplete=${e}`)
        .then(res => res.json())
        .then(result => {
          const suggestions = [...new Set(result.users.concat(result.teams))];
          const optionsArray = suggestions.map(function(a) {
            return {
              value: a,
              label: a
            };
          });
          setOptions(optionsArray);
        });
    } else {
      setOptions([]);
    }
  };

  const usersListComponent = memberships.map(membership => {
    return (
      <User
        key={membership.id}
        shouldHandleDelete
        membership={membership}
        shouldDisplayReady={false}
      />
    );
  });
  const components = {
    DropdownIndicator: null
  };
  return (
    <>
      <p>users on this board:</p>
      <div className="tags">{usersListComponent}</div>
      <form onSubmit={handleSubmit}>
        <Select
          isMulti
          value={selectedOption}
          options={options}
          placeholder="Enter e-mail or team name..."
          components={components}
          onChange={handleChange}
          onInputChange={onInputChange}
        />
        <input type="submit" value="Invite" />
      </form>
    </>
  );
};

export default InviteBlock;
