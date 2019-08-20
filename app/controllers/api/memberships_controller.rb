# frozen_string_literal: true

module API
  class MembershipsController < ApplicationController
    before_action :authenticate_user!, :set_board

    def index
      users = @board.users.pluck(:email)
      render json: users
    end

    private

    def membership_params
      params.require(:membership).permit(:email)
    end

    def set_board
      @board = Board.find(params[:board_id])
    end
  end
end
