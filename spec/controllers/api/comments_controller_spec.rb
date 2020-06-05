# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::CommentsController do
  let(:creator) { create(:user) }
  let(:not_creator) { create(:user) }
  let(:board) {create(:board) }
  let(:card) { create(:card, author: creator) }

  let(:creatorship) do
    create(:membership, board: board, user: creator, role: 'creator')
  end

  describe 'POST #create' do
    subject(:response) { post :create, params: params }
    let(:params) { { board_slug: board.slug, card_id: card.id } }

    context 'authentication' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'authorization' do
      before do
        login_as(not_creator)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(creator)
        authorize
      end

      it 'broadcasts updated item' do
        expect { post :create, params: params }.to have_broadcasted_to("board_#{board.slug}")
      end

      it_behaves_like :controllers_api_successful_action, :ok
    end
  end
end
