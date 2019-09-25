# frozen_string_literal: true

RSpec.describe API::MembershipsController do
  let_it_be(:creator) { create(:user) }
  let_it_be(:member) { create(:user) }
  let_it_be(:not_member) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:creatorship) do
    create(:membership, board: board, user: creator, role: 'creator')
  end
  let_it_be(:membership) do
    create(:membership, board: board, user: member, role: 'member')
  end

  describe 'GET #index' do
    subject(:response) { get :index, params: params }
    let_it_be(:params) { { board_slug: board.slug } }

    context 'when user is not logged in' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'when user is logged_in' do
      before { login_as not_member }

      it_behaves_like :controllers_api_successful_action
      it { is_expected.to match_json_schema('api/memberships/index') }
      it 'responds with a list of all board members' do
        expect(json_body.map { |h| h.dig('user', 'email') })
          .to contain_exactly(creator.email, member.email)
      end
    end
  end

  describe 'DELETE #destroy' do
    subject(:response) { delete :destroy, params: params }
    let_it_be(:params) { { board_slug: board.slug, id: membership.id } }

    context 'when user is not logged in' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'when user is logged_in' do
      context 'when user is not a board creator' do
        before { login_as member }
        it_behaves_like :controllers_api_unauthorized_action
      end

      context 'when user is the board creator' do
        before { login_as creator }
        it_behaves_like :controllers_api_successful_action, :no_content
      end
    end
  end

  describe 'POST #ready_status' do
    subject(:response) { post :ready_status, params: params }
    let_it_be(:params) { { board_slug: board.slug, id: membership.id } }

    context 'when user is not logged in' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'when user is logged_in' do
      context 'when user is not a board member' do
        before { login_as not_member }
        it { expect { subject }.to raise_error(ArgumentError) }
      end

      context 'when user is the board member' do
        before { login_as member }
        it_behaves_like :controllers_api_successful_action
        it 'responds with default boolean false ready status for newly created membership' do
          expect(json_body).to eq false
        end
      end
    end
  end

  describe 'POST #ready_toggle' do
    subject(:response) { post :ready_toggle, params: params }
    let_it_be(:params) { { board_slug: board.slug, id: membership.id } }

    context 'when user is not logged in' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'when user is logged_in' do
      context 'when user is not a board member' do
        before { login_as not_member }
        it { expect { subject }.to raise_error(ArgumentError) }
      end

      context 'when user is the board member' do
        before { login_as member }
        it_behaves_like :controllers_api_successful_action
        it 'switches boolean ready status value for existing memberships' do
          expect(json_body).to eq true
        end
      end
    end
  end
end
