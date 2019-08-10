# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActionItemsController do
  let(:board) { create(:board) }

  context 'POST #create' do
    it 'redirects' do
      post :create, params: { board_id: board.id,
                              action_item: FactoryBot.attributes_for(:action_item) }
      expect(response).to have_http_status(:redirect)
    end
  end
end
