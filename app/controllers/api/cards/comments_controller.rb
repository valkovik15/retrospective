# frozen_string_literal: true

module API
  module Cards
    class CommentsController < API::ApplicationController
      include BroadcastActions
      before_action :set_board, :set_card

      def create
        @comment = Comment.new(author: current_user, card: @card, content: params[:content])
        authorize! @comment, context: { board: @board }
        if @comment.save
          render status: :ok
        else
          render json: { error: @comment.errors }, status: :bad_request
        end
      end

      private

      def set_board
        @board = Board.find_by!(slug: params[:board_slug])
      end

      def set_card
        @card = Card.find(params[:card_id])
      end
    end
  end
end
