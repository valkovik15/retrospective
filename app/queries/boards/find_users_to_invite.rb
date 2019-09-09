# frozen_string_literal: true

module Boards
  class FindUsersToInvite
    attr_reader :query_string, :board

    def initialize(str, board)
      @query_string = str.split(',')
      @board = board
    end

    def call
      User.left_joins(:teams)
          .where('teams.name IN (?) or users.email IN (?)', query_string, query_string)
          .where.not(id: board.user_ids)
          .distinct
    end
  end
end
