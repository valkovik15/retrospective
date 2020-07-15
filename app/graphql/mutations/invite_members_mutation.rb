# frozen_string_literal: true

module Mutations
  class InviteMembersMutation < Mutations::BaseMutation
    argument :email, String, required: true
    argument :board_slug, String, required: true

    field :memberships, [Types::MembershipType], null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(email:, board_slug:)
      board = Board.find_by!(slug: board_slug)
      unless allowed_to?(:invite?, board, context: { user: context[:current_user] }, with: API::BoardPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end

      users = Boards::FindUsersToInvite.new(email, board).call
      if users.any?
        result = Boards::InviteUsers.new(board, users).call
        memberships = result.value!
        RetrospectiveSchema.subscriptions.trigger('membership_list_updated', { board_slug: board.slug },
                                                  memberships)
        { memberships: memberships }
      else
        { errors:
          { full_messages: ['User was not found'] } }
      end
    end
  end
end
