# frozen_string_literal: true

module Mutations
  class LikeCommentMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :comment, Types::CommentType, null: true

    def resolve(id:)
      comment = Comment.find(id)
      authorize! comment, to: :like?, context: { user: context[:current_user] }
      if comment.like!
        RetrospectiveSchema.subscriptions.trigger('card_updated',
                                                  { board_slug: comment.card.board.slug },
                                                  comment.card)
        { comment: comment }
      else
        { errors: { full_messages: comment.errors.full_messages } }
      end
    end
  end
end
