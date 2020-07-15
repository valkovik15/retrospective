# frozen_string_literal: true

module Mutations
  class DestroyMembershipMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, Int, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(id:)
      membership = Membership.find(id)
      unless allowed_to?(:destroy?, membership, context: { membership: Membership.find_by(user: context[:current_user], board: membership.board) },
                                                with: API::MembershipPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end
      if membership.destroy
        RetrospectiveSchema.subscriptions.trigger('membership_destroyed',
                                                  { board_slug: membership.board.slug },
                                                  id: id)
        { id: id }
      else
        { errors: card.errors }
      end
    end
  end
end
