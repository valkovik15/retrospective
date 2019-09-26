# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActionItemsController do
  let_it_be(:board) { create(:board) }
  let_it_be(:action_item) { create(:action_item) }
  let_it_be(:closed_action_item) { create(:action_item, status: 'closed') }
  let_it_be(:creator) { create(:user) }
  let_it_be(:member) { create(:user) }
  let_it_be(:not_member) { create(:user) }
  let_it_be(:creatorship) do
    create(:membership, board: board, user: creator, role: 'creator')
  end
  let_it_be(:membership) do
    create(:membership, board: board, user: member, role: 'member')
  end

  before { bypass_rescue }

  describe 'PUT #create' do
    subject(:response) { post :create, params: params }
    let_it_be(:params) do
      { board_slug: board.slug,
        action_item: FactoryBot.attributes_for(:action_item) }
    end

    context 'when user is not logged in' do
      it { is_expected.to have_http_status(:redirect) }
    end

    context 'when user is logged_in' do
      context 'user is not a board member' do
        before { login_as not_member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { post :create, params: params }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is a board member' do
        before { login_as member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { post :create, params: params }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is the board creator' do
        before { login_as creator }
        context 'with valid params' do
          it { is_expected.to have_http_status(:redirect) }
        end

        context 'with invalid params' do
          let_it_be(:params) { params.merge action_item: { body: nil } }
          it { is_expected.to have_http_status(:redirect) }
        end
      end
    end
  end

  describe 'PUT #move' do
    subject(:response) { put :move, params: params }
    let_it_be(:params) do
      { board_slug: board.slug,
        id: action_item.id }
    end

    context 'when user is not logged in' do
      it { is_expected.to have_http_status(:redirect) }
    end

    context 'when user is logged_in' do
      context 'user is not a board member' do
        before { login_as not_member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { subject }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is a board member' do
        before { login_as member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { subject }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is the board creator' do
        before { login_as creator }
        it { is_expected.to have_http_status(:redirect) }
      end
    end
  end

  describe 'PUT #close' do
    subject(:response) { put :close, params: params }
    let_it_be(:params) do
      { board_slug: board.slug,
        id: action_item.id }
    end

    context 'when user is not logged in' do
      it { is_expected.to have_http_status(:redirect) }
    end

    context 'when user is logged_in' do
      context 'user is not a board member' do
        before { login_as not_member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { subject }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is a board member' do
        before { login_as member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { subject }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is the board creator' do
        before { login_as creator }
        it { is_expected.to have_http_status(:redirect) }
      end
    end
  end

  describe 'PUT #complete' do
    subject(:response) { put :complete, params: params }
    let_it_be(:params) do
      { board_slug: board.slug,
        id: action_item.id }
    end

    context 'when user is not logged in' do
      it { is_expected.to have_http_status(:redirect) }
    end

    context 'when user is logged_in' do
      context 'user is not a board member' do
        before { login_as not_member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { subject }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is a board member' do
        before { login_as member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { subject }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is the board creator' do
        before { login_as creator }
        it { is_expected.to have_http_status(:redirect) }
      end
    end
  end

  describe 'PUT #reopen' do
    subject(:response) { put :reopen, params: params }
    let_it_be(:params) do
      { board_slug: board.slug,
        id: closed_action_item.id }
    end

    context 'when user is not logged in' do
      it { is_expected.to have_http_status(:redirect) }
    end

    context 'when user is logged_in' do
      context 'user is not a board member' do
        before { login_as not_member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { subject }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is a board member' do
        before { login_as member }
        it 'raises error ActionPolicy::Unauthorized' do
          expect { subject }.to raise_error(ActionPolicy::Unauthorized)
        end
      end

      context 'user is the board creator' do
        before { login_as creator }
        it { is_expected.to have_http_status(:redirect) }
      end
    end
  end
end
