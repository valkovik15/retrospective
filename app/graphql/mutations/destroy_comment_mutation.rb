# frozen_string_literal: true

module Mutations
  class DestroyCommentMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, Int, null: false
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(id:)
      comment = Comment.find(id)
      unless allowed_to?(:destroy?, comment, context: { user: context[:current_user] }, with: API::CommentPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end
      card = comment.card
      if comment.destroy
        RetrospectiveSchema.subscriptions.trigger('card_updated',
                                                  { board_slug: card.board.slug }, card)
        { id: id }
      else
        { errors: comment.errors }
      end
    end
  end
end
