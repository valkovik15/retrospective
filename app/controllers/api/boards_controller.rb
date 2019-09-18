# frozen_string_literal: true

module API
  class BoardsController < API::ApplicationController
    before_action :set_board
    before_action do
      authorize! @board
    end

    def invite
      users = Boards::FindUsersToInvite.new(board_params[:email], @board).call
      if users.any?
        result = Boards::InviteUsers.new(@board, users).call
        render json: result.value!, each_serializer: MembershipSerializer
      else
        render json: { error: 'User was not found' }, status: 400
      end
    end

    def suggestions
      result = Boards::Suggestions.new(params[:autocomplete]).call
      render json: result
    end

    private

    def board_params
      params.require(:board).permit(:email)
    end

    def set_board
      @board = Board.find_by!(slug: params[:slug])
    end
  end
end
