module Types
  class MembershipType < Types::BaseObject
    field :user_id, Number, null: false
    field :board_id, Number, null: false
    field :role, String, null: false
    field :ready, Boolean, null: false
  end
end
