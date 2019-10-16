# frozen_string_literal: true

module API
  class CardsController < API::ApplicationController
    before_action :set_board, :set_card
    before_action do
      authorize! @card
    end

    def update
      if @card.update(body: params.permit(:edited_body)[:edited_body])
        render json: { updated_body: @card.body }, status: :ok
      else
        render json: { error: @card.errors }, status: :bad_request
      end
    end

    def destroy
      if @card.destroy
        head :no_content
      else
        render json: { error: @card.errors.full_messages.join(',') }, status: :bad_request
      end
    end

    def like
      if @card.like!
        render json: { likes: @card.likes }, status: :ok
      else
        render json: { error: @card.errors.full_messages.join(',') }, status: :bad_request
      end
    end

    private

    def set_board
      @board = Board.find_by!(slug: params[:board_slug])
    end

    def set_card
      @card = Card.find(params[:id])
    end
  end
end
