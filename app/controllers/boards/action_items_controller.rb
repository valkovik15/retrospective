# frozen_string_literal: true

module Boards
  class ActionItemsController < Boards::ApplicationController
    authorize :board, through: :current_board

    def create
      action_item = @board.action_items.build(action_item_params)
      authorize! action_item
      if action_item.save
        redirect_to @board, notice: 'Action Item was successfully saved'
      else
        redirect_to @board, alert: action_item.errors.full_messages.join(', ')
      end
    end

    private

    def current_board
      @board
    end

    def action_item_params
      params.require(:action_item).permit(:status, :body)
    end
  end
end
