# frozen_string_literal: true

module Mutations
  class UpdateCommentMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :attributes, Types::CommentAttributes, required: true

    field :comment, Types::CommentType, null: true
    def resolve(id:, attributes:)
      comment = Comment.find(id)

      authorize! comment, to: :update?, context: { user: context[:current_user] }

      if comment.update(attributes.to_h)
        card = comment.card
        RetrospectiveSchema.subscriptions.trigger('card_updated',
                                                  { board_slug: card.board.slug }, card)
        { comment: comment }
      else
        { errors: { full_messages: comment.errors.full_messages } }
      end
    end
  end
end
