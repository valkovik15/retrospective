# frozen_string_literal: true

module Mutations
  class UpdateCommentMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :attributes, Types::CommentAttributes, required: true

    field :comment, Types::CommentType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(id:, attributes:)
      comment = Comment.find(id)

      unless allowed_to?(:update?, comment, context: { user: context[:current_user] }, with: API::CommentPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end

      if comment.update(attributes.to_h)
        card = comment.card
        RetrospectiveSchema.subscriptions.trigger('card_updated',
                                                  { board_slug: card.board.slug }, card)
        { comment: comment }
      else
        { errors: comment.errors }
      end
    end
  end
end
