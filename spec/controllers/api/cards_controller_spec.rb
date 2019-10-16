# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::CardsController do
  let(:author) { build_stubbed(:user) }
  let(:not_author) { build_stubbed(:user) }
  let(:board) { build_stubbed(:board) }
  let(:card) { build_stubbed(:card, author: author) }

  describe 'DELETE #destroy' do
    subject(:response) { delete :destroy, params: params }
    let(:params) { { board_slug: board.slug, id: card.id } }

    context 'authentication' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'authorization' do
      before do
        login_as(not_author)

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(Card).to receive(:find).with(card.id.to_s).and_return(card)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(author)
        authorize

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(Card).to receive(:find).with(card.id.to_s).and_return(card)
        allow(card).to receive(:destroy).and_return(true)
      end

      it_behaves_like :controllers_api_successful_action, :no_content
    end
  end

  describe 'PATCH #update' do
    subject(:response) { patch :update, params: params }
    let(:params) do
      {
        board_slug: board.slug,
        id: card.id,
        edited_body: Faker::ChuckNorris.fact
      }
    end

    context 'authentication' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'authorization' do
      before do
        login_as(not_author)

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(Card).to receive(:find).with(card.id.to_s).and_return(card)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(author)
        authorize

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(Card).to receive(:find).with(card.id.to_s).and_return(card)
        allow(card).to receive(:update).with(body: params[:edited_body]).and_return(true)
      end

      it_behaves_like :controllers_api_successful_action

      it { is_expected.to match_json_schema('api/cards/update') }
    end
  end

  describe 'PUT #like' do
    subject(:response) { put :like, params: params }
    let(:params) do
      {
        board_slug: board.slug,
        id: card.id
      }
    end

    context 'authentication' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'authorization' do
      before do
        login_as(author)

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(Card).to receive(:find).with(card.id.to_s).and_return(card)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(not_author)
        authorize

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(Card).to receive(:find).with(card.id.to_s).and_return(card)
        allow(card).to receive(:like!).and_return(true)
      end

      it_behaves_like :controllers_api_successful_action

      it { is_expected.to match_json_schema('api/cards/like') }
    end
  end
end
