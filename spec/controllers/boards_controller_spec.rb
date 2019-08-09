# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BoardsController do
  login_user
  context 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  context 'GET #new' do
    it 'returns http success' do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  context 'GET #show' do
    it 'returns http success' do
      board = create(:board)
      get :show, params: { id: board.id }
      expect(response).to have_http_status(:success)
    end
  end

  context 'POST #create' do
    it 'redirects if params valid' do
      post :create, params: { board: FactoryBot.attributes_for(:board) }
      expect(response).to have_http_status(:redirect)
    end

    it 'renders new if params not valid' do
      post :create, params: { board: FactoryBot.attributes_for(:board, title: nil) }
      expect(response).to have_http_status(:success)
    end
  end
end
