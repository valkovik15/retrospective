# frozen_string_literal: true

module API
  class BoardsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_board, only: :invite

    # rubocop: disable Metrics/MethodLength
    def invite
      user = User.find_by(email: board_params[:email])
      if user
        membership = @board.memberships.build(role: 'member', user_id: user.id)
        if membership.save
          render json: { email: user.email }
        else
          render json: { error: membership.errors.full_messages.join(',') }, status: 400
        end
      else
        render json: { error: 'User was not found' }, status: 400
      end
    end
    # rubocop: enable Metrics/MethodLength

    private

    def board_params
      params.require(:board).permit(:email)
    end

    def set_board
      @board = Board.find(params[:id])
    end
  end
end
