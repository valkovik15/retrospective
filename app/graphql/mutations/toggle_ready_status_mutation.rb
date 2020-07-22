# frozen_string_literal: true

module Mutations
  class ToggleReadyStatusMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :membership, Types::MembershipType, null: true
    # rubocop:disable Metrics/MethodLength
    def resolve(id:)
      membership = Membership.find(id)
      authorize! membership, to: :ready_toggle?,
                             context: { membership: membership }

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
