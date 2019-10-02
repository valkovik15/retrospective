# frozen_string_literal: true

module API
  class ActionItemsController < API::ApplicationController
    before_action :set_board, :set_action_item

    def update
      authorize! @action_item
      if @action_item.update(body: params.permit(:edited_body)[:edited_body])
        render json: { updated_body: @action_item.body }, status: :ok
      else
        render json: { error: @action_item.errors }, status: :bad_request
      end
    end

    def destroy
      authorize! @action_item
      if @action_item.destroy
        head :no_content
      else
        render json: { error: @action_item.errors.full_messages.join(',') }, status: :bad_request
      end
    end

    private

    def set_board
      @board = Board.find_by!(slug: params[:board_slug])
    end

    def set_action_item
      @action_item = ActionItem.find(params[:id])
    end
  end
end
