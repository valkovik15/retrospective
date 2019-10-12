# frozen_string_literal: true

module Domains
  module Boards
    module Operations
      class InviteUsers
        include Dry::Monads[:result]
        attr_reader :board, :users

        def initialize(board, users)
          @board = board
          @users = users
        end

        def call
          users_array = users.map { |user| { role: 'member', user_id: user.id } }
          memberships = board.memberships.build(users_array)
          board.save
          Success(memberships)
        end
      end
    end
  end
end
