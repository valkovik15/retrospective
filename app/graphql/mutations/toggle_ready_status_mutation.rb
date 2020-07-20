# frozen_string_literal: true

module Mutations
  class ToggleReadyStatusMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :membership, Types::MembershipType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    # rubocop:disable Metrics/MethodLength
    def resolve(id:)
      membership = Membership.find(id)
      unless allowed_to?(:ready_toggle?, membership, context: { membership: membership },
                                                     with: API::MembershipPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end

      if membership.update(ready: !membership.ready)
        RetrospectiveSchema.subscriptions.trigger('membership_updated',
                                                  { board_slug: membership.board.slug },
                                                  membership)
        { membership: membership }
      else
        { errors: { full_messages: membership.errors.full_messages } }
      end
    end
    # rubocop:enable Metrics/MethodLength
  end
end
