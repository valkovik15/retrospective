# frozen_string_literal: true

module Queries
  class Membership < Queries::BaseQuery
    description 'Returns membership by id'

    argument :board_slug, String, required: true

    type Types::MembershipType, null: false

    def resolve(board_slug:)
      ::Board.find_by!(slug: board_slug).memberships.find_by(user: context[:current_user])
    end
  end
end
