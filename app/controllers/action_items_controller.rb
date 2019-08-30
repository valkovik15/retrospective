# frozen_string_literal: true

class ActionItemsController < ApplicationController
  before_action :set_board

  rescue_from ActionPolicy::Unauthorized do |ex|
    redirect_to @board, alert: ex.result.message
  end

  def create
    action_item = @board.action_items.build(action_item_params)
    authorize! action_item
    action_item.save!
    redirect_to @board
  end

  private

  def action_item_params
    params.require(:action_item).permit(:status, :body)
  end

  def set_board
    @board = Board.find_by!(slug: params[:board_slug])
  end
end
