# frozen_string_literal: true

module Boards
  class InviteUsers
    include Resultable
    attr_reader :board, :users

    def initialize(board, users)
      @board = board
      @users = users
    end

    def call
      users_array = users.map { |user| { role: 'member', user_id: user.id } }
      board.memberships.build(users_array)
      board.save
      users_emails = users.pluck(:email)
      Success(email: users_emails)
    end
  end
end
