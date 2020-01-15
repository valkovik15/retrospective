module Types
  class ActionItemType < Types::BaseObject
    field :body, String, null: false
    field :board_id, Number, null: false
  end
end
