module Types
  class MutationType < Types::BaseObject
    field :add_card, mutation: Mutations::AddCardMutation
    field :update_card, mutation: Mutations::UpdateCardMutation
  end
end
