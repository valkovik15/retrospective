# frozen_string_literal: true

class MembershipsController < ApplicationController
  before_action :set_board
  skip_verify_authorized

  def create
    @membership = @board.memberships.build(user_id: current_user.id, role: :member)
    if @membership.save
      redirect_to @board, notice: "#{current_user.email.split('@').first} has joined the board!"
    else
      redirect_to @board, alert: @membership.errors.full_messages.join(', ')
    end
  end

  private

  def set_board
    @board = Board.find_by!(slug: params[:board_slug])
  end
end
