# frozen_string_literal: true

module Mutations
  class InviteMembersMutation < Mutations::BaseMutation
    argument :email, String, required: true
    argument :board_slug, String, required: true

    field :memberships, [Types::MembershipType], null: true

    # rubocop:disable Metrics/MethodLength
    def resolve(email:, board_slug:)
      board = Board.find_by!(slug: board_slug)
      authorize! board, to: :invite?, context: { user: context[:current_user] }

      users = Boards::FindUsersToInvite.new(email, board).call
      if users.any?
        result = Boards::InviteUsers.new(board, users).call
        memberships = result.value!
        RetrospectiveSchema.subscriptions.trigger('membership_list_updated',
                                                  { board_slug: board.slug },
                                                  memberships)
        { memberships: memberships }
      else
        { errors:
          { full_messages: ['User was not found'] } }
      end
    end
    # rubocop:enable Metrics/MethodLength
  end
end
