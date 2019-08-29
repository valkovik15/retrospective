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
    ],
//========================================================
    "columns": [
      {
        "title": "MAD",
        "cards": [
          {
            "body": "This is a mad card from member1",
            "likes": 5,
            "abilities": ["edit","like","delete"],
            "author": {
                        "uid": "",
                        "email": "member1@mail.com",
                        "avatar_url": "https://i.pravatar.cc/100?img=10"
                      }
          },
          {
            "body": "This is a mad card from member2",
            "likes": 5,
            "abilities": ["edit","like","delete"],
            "author": {
                        "uid": "",
                        "email": "member2@mail.com",
                        "avatar_url": "https://i.pravatar.cc/100?img=20"
                      }
          }
        ]
      },
      {
        "title": "SAD",
        "cards": [
          {
            "body": "This is a sad card from member2",
            "likes": 5,
            "abilities": ["edit","like","delete"],
            "author": {
                        "uid": "",
                        "email": "member2@mail.com",
                        "avatar_url": "https://i.pravatar.cc/100?img=20"
                      }
          },
          {
            "body": "This is a sad card from member3",
            "likes": 5,
            "abilities": ["edit","like","delete"],
            "author": {
                        "uid": "",
                        "email": "member3@mail.com",
                        "avatar_url": "https://i.pravatar.cc/100?img=30"
                      }
          }
        ]
      },
      {
        "title": "GLAD",
        "cards": [
          {
            "body": "This is a glad card from member3",
            "likes": 5,
            "abilities": ["edit","like","delete"],
            "author": {
                        "uid": "",
                        "email": "member3@mail.com",
                        "avatar_url": "https://i.pravatar.cc/100?img=30"
                      }
          },
          {
            "body": "This is a glad card from member4",
            "likes": 5,
            "abilities": ["edit","like","delete"],
            "author": {
                        "uid": "",
                        "email": "member4@mail.com",
                        "avatar_url": "https://i.pravatar.cc/100?img=40"
                      }
          }
        ]
      }    
    ],
//===========================================
    "prev_action_items": [
      {
        "body": "prev action item 1",
        "status": "done"
      },
      {
        "body": "prev action item 2",
        "status": "prolong"
      }
    ],
//============================================
    "action_items": [
      {
        "body": "action item 1"
      },
      {
        "body": "action item 2"
      }
    ],
 //===========================================
  }
};

export const { board, current_user } = jsonResponse;
