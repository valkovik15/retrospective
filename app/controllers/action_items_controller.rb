# frozen_string_literal: true

class ActionItemsController < ApplicationController
  before_action :set_board
  before_action :set_action_item, only: %i[move]
  authorize :board, through: :current_board

  rescue_from ActionPolicy::Unauthorized do |ex|
    redirect_to @board, alert: ex.result.message
  end

  def create
    action_item = @board.action_items.build(action_item_params)
    authorize! action_item
    action_item.save!
    redirect_to @board
  end

  def move
    authorize! @action_item
    @action_item.board_id = @board.id
    if @action_item.save!
      redirect_to @board, notice: 'Action Item was successfully moved'
    else
      redirect_to @board, alert: result.failure
    end
  end

  private

  def current_board
    @board
  end

  def action_item_params
    params.require(:action_item).permit(:status, :body)
  end

  def set_board
    @board = Board.find_by!(slug: params[:board_slug])
  end

  def set_action_item
    @action_item = ActionItem.find(params[:id])
  end
end
