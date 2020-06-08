# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::CommentsController do
  let(:creator) { create(:user) }
  let(:not_member) { create(:user) }
  let(:board) { create(:board) }
  let(:card) { create(:card, author: creator) }
  let!(:comment) { create(:comment, author: creator, card: card) }

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
        login_as(not_member)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(creator)
        authorize
      end

      it 'broadcasts updated item' do
        expect { response }.to have_broadcasted_to("board_#{board.slug}")
      end

      it 'creates card' do
        expect { response }.to change { Comment.count }.by(1)
      end

      it_behaves_like :controllers_api_successful_action, :ok
    end
  end

  describe 'PATCH #update' do
    subject(:response) { patch :update, params: params }
    let(:params) do
      { board_slug: board.slug, card_id: card.id,
        id: comment.id, content: Faker::Beer.name }
    end

    context 'authentication' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'authorization' do
      before do
        login_as(not_member)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(creator)
        authorize
      end

      it 'broadcasts updated item' do
        expect { response }.to have_broadcasted_to("board_#{board.slug}")
      end

      it 'updates card' do
        response
        expect(Comment.find(comment.id).content).to eq(params[:content])
      end

      it_behaves_like :controllers_api_successful_action, :ok
    end
  end

  describe 'DELETE #destroy' do
    subject(:response) { delete :destroy, params: params }
    let(:params) do
      { board_slug: board.slug, card_id: card.id,
        id: comment.id }
    end

    context 'authentication' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'authorization' do
      before do
        login_as(not_member)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(creator)
        authorize
      end

      it 'broadcasts updated item' do
        expect { response }.to have_broadcasted_to("board_#{board.slug}")
      end

      it 'creates card' do
        expect { response }.to change { Comment.count }.by(-1)
      end

      it_behaves_like :controllers_api_successful_action, :no_content
    end
  end
end
