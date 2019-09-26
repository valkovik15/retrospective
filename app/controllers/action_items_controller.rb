# frozen_string_literal: true

class ActionItemsController < ApplicationController
  before_action :set_board
  before_action :set_action_item, except: :create
  authorize :board, through: :current_board
  before_action except: :create do
    authorize! @action_item
  end

  rescue_from ActionPolicy::Unauthorized do |ex|
    redirect_to @board, alert: ex.result.message
  end

  def create
    action_item = @board.action_items.build(action_item_params)
    authorize! action_item
    if action_item.save
      redirect_to @board, notice: 'Action Item was successfully saved'
    else
      redirect_to @board, alert: action_item.errors.full_messages.join(', ')
    end
  end

  def move
    if @action_item.move!(@board)
      redirect_to @board, notice: 'Action Item was successfully moved'
    else
      redirect_to @board, alert: @action_item.errors.full_messages.join(', ')
    end
  end

  def close
    if @action_item.close!
      redirect_to @board, notice: 'Action Item was successfully closed'
    else
      redirect_to @board, alert: @action_item.errors.full_messages.join(', ')
    end
  end

  def complete
    if @action_item.complete!
      redirect_to @board, notice: 'Action Item was successfully completed'
    else
      redirect_to @board, alert: @action_item.errors.full_messages.join(', ')
    end
  end

  def reopen
    if @action_item.reopen!
      redirect_to @board, notice: 'Action Item was successfully reopend'
    else
      redirect_to @board, alert: @action_item.errors.full_messages.join(', ')
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
