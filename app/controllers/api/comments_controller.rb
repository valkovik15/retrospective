# frozen_string_literal: true

module API
  class CommentsController < API::ApplicationController
    include BroadcastActions
    before_action :set_board, :set_card
    before_action :set_comment, only: %i[update destroy]

    def create
      @comment = Comment.new(author: current_user, card: @card, content: params[:content])
      authorize! @comment, context: { board: @board }, with: API::CommentPolicy
      if @comment.save
        broadcast_card('update_card', params[:board_slug], @card)
        render json: { comment: @comment }, status: :ok
      else
        render json: { error: @comment.errors }, status: :bad_request
      end
    end

    def update
      authorize! @comment, context: { board: @board }, with: API::CommentPolicy
      if @comment.update(content: params[:content])
        broadcast_card('update_card', params[:board_slug], @card)
        render json: { updated_content: @comment.content }, status: :ok
      else
        render json: { error: @comment.errors }, status: :bad_request
      end
    end

    def destroy
      authorize! @comment, context: { board: @board }, with: API::CommentPolicy
      if @comment.destroy
        broadcast_card('update_card', params[:board_slug], @card)
        head :no_content
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

    def set_comment
      @comment = Comment.find(params[:id])
    end
  end
end
