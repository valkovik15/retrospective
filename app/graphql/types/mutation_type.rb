# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :add_action_item, mutation: Mutations::AddActionItemMutation
    field :add_card, mutation: Mutations::AddCardMutation
    field :add_comment, mutation: Mutations::AddCommentMutation
    field :close_action_item, mutation: Mutations::CloseActionItemMutation
    field :complete_action_item, mutation: Mutations::CompleteActionItemMutation
    field :destroy_action_item, mutation: Mutations::DestroyActionItemMutation
    field :destroy_card, mutation: Mutations::DestroyCardMutation
    field :destroy_comment, mutation: Mutations::DestroyCommentMutation
    field :like_card, mutation: Mutations::LikeCardMutation
    field :move_action_item, mutation: Mutations::MoveActionItemMutation
    field :reopen_action_item, mutation: Mutations::ReopenActionItemMutation
    field :update_action_item, mutation: Mutations::UpdateActionItemMutation
    field :update_card, mutation: Mutations::UpdateCardMutation
    field :update_comment, mutation: Mutations::UpdateCommentMutation
  end
end
