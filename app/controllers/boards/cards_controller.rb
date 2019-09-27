# frozen_string_literal: true

module Boards
  class CardsController < Boards::ApplicationController
    def create
      card = @board.cards.build(card_params.merge(author_id: current_user.id))
      authorize! card
      card.save!
      redirect_to @board
    end

    private

    def card_params
      params.require(:card).permit(:kind, :body)
    end
  end
end
