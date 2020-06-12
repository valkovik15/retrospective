# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :add_card, mutation: Mutations::AddCardMutation
    field :destroy_card, mutation: Mutations::DestroyCardMutation
    field :like_card, mutation: Mutations::LikeCardMutation
    field :update_card, mutation: Mutations::UpdateCardMutation
  end
end
