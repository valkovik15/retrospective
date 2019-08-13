# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TeamsController do
  let_it_be(:team) { create(:team) }

  context 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  context 'GET #show' do
    it 'returns http success' do
      get :show, params: { id: team.id }
      expect(response).to have_http_status(:success)
    end
  end
end
