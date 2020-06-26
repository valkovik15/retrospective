# frozen_string_literal: true

module Mutations
  class AddCommentMutation < Mutations::BaseMutation
    argument :attributes, Types::CommentAttributes, required: true

    field :comment, Types::CommentType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(attributes:)
      params = attributes.to_h
      comment = Comment.new(params.merge(author: context[:current_user]))
      unless allowed_to?(:create?, comment, context: { user: context[:current_user] }, with: API::CommentPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end

      if comment.save
        card = comment.card
        RetrospectiveSchema.subscriptions.trigger('card_updated', { board_slug: card.board.slug }, card)
        { comment: comment }
      else
        { errors: comment.errors }
      end
    end
  end
end
