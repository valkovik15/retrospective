module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :email, String, null: false
    field :password, String, null: false
    field :remote_avatar_url, String, null: true
  end
end
