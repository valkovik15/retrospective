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
        "avatar_url": "https://i.pravatar.cc/100?img=55",
        "ready": true
      },
      {
        "uid": "",
        "email": "member1@mail.com",
        "name": "member1",
        "role": "member",
        "avatar_url": "https://i.pravatar.cc/100?img=10",
        "ready": true
      },
      {
        "uid": "",
        "email": "member2@mail.com",
        "name": "member2",
        "role": "member",
        "avatar_url": "https://i.pravatar.cc/100?img=20",
        "ready": false
      },
      {
        "uid": "",
        "email": "member3@mail.com",
        "name": "member3",
        "role": "member",
        "avatar_url": "https://i.pravatar.cc/100?img=30",
        "ready": true
      },
      {
          "uid": "",
          "email": "member4@mail.com",
          "name": "member4",
          "role": "member",
          "avatar_url": "https://i.pravatar.cc/100?img=40",
          "ready": false
        }
    ]
  }
};

//export default jsonResponse;
export const { board, current_user } = jsonResponse;
