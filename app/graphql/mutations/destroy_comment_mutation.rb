# frozen_string_literal: true

module Mutations
  class DestroyCommentMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, Int, null: false

    # rubocop:disable Metrics/MethodLength
    def resolve(id:)
      comment = Comment.find(id)
      authorize! comment, to: :destroy?, context: { user: context[:current_user] },
                          with: API::CommentPolicy
      card = comment.card
      if comment.destroy
        RetrospectiveSchema.subscriptions.trigger('card_updated',
                                                  { board_slug: card.board.slug }, card)
        { id: id }
      else
        { errors: { full_messages: comment.errors.full_messages } }
      end
    end
    # rubocop:enable Metrics/MethodLength
  end
end
