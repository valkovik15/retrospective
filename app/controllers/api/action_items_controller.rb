# frozen_string_literal: true

module API
  class ActionItemsController < API::ApplicationController
    before_action :set_board, :set_action_item
    before_action do
      authorize! @action_item, context: { board: @board }
    end

    def update
      if @action_item.update(body: params.permit(:edited_body)[:edited_body])
        render json: { updated_body: @action_item.body }, status: :ok
      else
        render json: { error: @action_item.errors }, status: :bad_request
      end
    end

    def destroy
      if @action_item.destroy
        head :no_content
      else
        render json: { error: @action_item.errors.full_messages.join(',') }, status: :bad_request
      end
    end

    def move
      if @action_item.move!(@board)
        head :ok
      else
        render json: { error: @action_item.errors.full_messages.join(',') }, status: :bad_request
      end
    end

    def close
      if @action_item.close!
        head :ok
      else
        render json: { error: @action_item.errors.full_messages.join(',') }, status: :bad_request
      end
    end

    def complete
      if @action_item.complete!
        head :ok
      else
        render json: { error: @action_item.errors.full_messages.join(',') }, status: :bad_request
      end
    end

    def reopen
      if @action_item.reopen!
        head :ok
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
