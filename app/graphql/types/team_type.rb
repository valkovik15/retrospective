module Types
  class TeamType < Types::BaseObject
    field :name, String, null: false
    field :user_ids, Array, null: true
  end
end
