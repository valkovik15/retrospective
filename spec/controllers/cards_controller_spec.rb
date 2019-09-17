# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CardsController do
  # login_user

  let_it_be(:board) { create(:board) }

  context 'POST #create' do
    it 'redirects' do
      post :create, params: { board_slug: board.slug,
                              card: FactoryBot.attributes_for(:card) }
      expect(response).to have_http_status(:redirect)
    end
  end
end
