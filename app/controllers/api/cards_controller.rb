# frozen_string_literal: true

module API
  class CardsController < ApplicationController
    before_action :set_board
    before_action :set_card

    rescue_from ActionPolicy::Unauthorized do |ex|
      render json: { error: ex.result.message }, status: 401
    end

    def destroy
      authorize! @card
      if @card.destroy
        head :ok
      else
        render json: { error: @card.errors.full_messages.join(',') }, status: 400
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
