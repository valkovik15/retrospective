const jsonResponse = {
  "current_user": {
    "uid": "",
    "email": "current_user@mail.com",
    "avatarUrl": "",
    "isMember": true,
    "ready": true
  },
  "board": {
    "status": "open",
    "title": "Board_title_from_json",
    "members": [
      {
        "uid": "",
        "email": "member0@mail.com",
        "name": "member0",
        "role": "creator",
        "avatar_url": "",
        "ready": true
      },
      {
        "uid": "",
        "email": "member1@mail.com",
        "name": "member1",
        "role": "member",
        "avatar_url": "",
        "ready": true
      },
      {
        "uid": "",
        "email": "member2@mail.com",
        "name": "member2",
        "role": "member",
        "avatar_url": "",
        "ready": true
      },
      {
        "uid": "",
        "email": "member3@mail.com",
        "name": "member3",
        "role": "member",
        "avatar_url": "",
        "ready": false
      }
    ]
  }
};

//export default jsonResponse;
export const { board, current_user } = jsonResponse;
