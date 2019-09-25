# frozen_string_literal: true

RSpec.describe API::CardsController do
  let_it_be(:author) { create(:user) }
  let_it_be(:not_author) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:card) { create(:card, author: author) }

  describe 'DELETE #destroy' do
    subject(:response) { delete :destroy, params: params }
    let_it_be(:params) { { board_slug: board.slug, id: card.id } }

    context 'when user is not logged in' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'when user is logged in' do
      context 'when user is not the card author' do
        before { login_as not_author }
        it_behaves_like :controllers_api_unauthorized_action
      end

      context 'when user is the card author' do
        before { login_as author }
        it_behaves_like :controllers_api_successful_action, :no_content
      end
    end
  end

  describe 'PATCH #update' do
    subject(:response) { patch :update, params: params }
    let_it_be(:params) do
      {
        board_slug: board.slug,
        id: card.id,
        edited_body: Faker::ChuckNorris.fact
      }
    end

    context 'when user is not logged in' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'when user is logged_in' do
      context 'when user is not the card author' do
        before { login_as not_author }
        it_behaves_like :controllers_api_unauthorized_action
      end

      context 'when user is the card author' do
        before { login_as author }

        context 'when params are not valid' do
          let_it_be(:params) { params.merge edited_body: nil }
          it_behaves_like :controllers_api_failed_action
        end

        context 'when params are valid' do
          it_behaves_like :controllers_api_successful_action
          it { is_expected.to match_json_schema('api/cards/update') }
          it { expect(json_body['updated_body']).to eq params[:edited_body] }
        end
      end
    end
  end
end
