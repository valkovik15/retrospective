# frozen_string_literal: true

class ActionItemsController < ApplicationController
  before_action :set_board

  def create
    @board.action_items.create(action_item_params)
    redirect_to @board
  end

  private

  def action_item_params
    params.require(:action_item).permit(:status, :body)
  end

  def set_board
    @board = Board.find(params[:board_id])
  end
end
