# frozen_string_literal: true

RSpec.describe API::BoardsController do
  let_it_be(:member) { create(:user) }
  let_it_be(:not_member) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) { create(:membership, board: board, user: member) }

  describe 'POST #invite' do
    subject(:response) { post :invite, params: params }
    let_it_be(:params) { { slug: board.slug } }

    context 'when user is not logged in' do
      it_behaves_like 'an unauthenticated action'
    end

    context 'when user is logged_in' do
      context 'when user is not a board member' do
        before { login_as not_member }
        it_behaves_like 'an unauthorized action'
      end

      context 'when user is a board member' do
        before { login_as member }
        let_it_be(:invitee_1) { create(:user) }
        let_it_be(:invitee_2) { create(:user) }
        let_it_be(:invitee_3) { create(:user) }
        let_it_be(:membership) { create(:membership, board: board, user: invitee_3) }

        context 'when params are not valid or no new users to invite' do
          let_it_be(:params) do
            params.merge board: {
              email: "#{Faker::Internet.safe_email},#{invitee_3.email}"
            }
          end

          it_behaves_like 'a failed action'
        end

        context 'when params are valid' do
          let_it_be(:params) do
            params.merge board: {
              email: "#{invitee_1.email},#{invitee_2.email},#{invitee_3.email}"
            }
          end

          it_behaves_like 'a successful action'
          it { is_expected.to match_json_schema('api/boards/invite') }
          it 'invites only nonmembers' do
            expect(json_body.map { |h| h.dig('user', 'email') })
              .to contain_exactly(invitee_1.email, invitee_2.email)
          end
        end
      end
    end
  end

  describe 'POST #suggestions' do
    subject(:response) { post :suggestions, params: params }
    let_it_be(:params) { { slug: board.slug } }

    context 'when user is not logged in' do
      it_behaves_like 'an unauthenticated action'
    end

    context 'when user is logged_in' do
      context 'when user is not a board member' do
        before { login_as not_member }
        it_behaves_like 'an unauthorized action'
      end

      context 'when user is a board member' do
        before { login_as member }
        let_it_be(:suggestion_user_1) { create(:user, email: 'suggestion_user_1@example.com') }
        let_it_be(:suggestion_user_2) { create(:user, email: 'SUGGESTION_USER_2@example.com') }
        let_it_be(:non_suggestion_user) { create(:user, email: 'non_suggestion_user@example.com') }
        let_it_be(:suggestion_team) { create(:team, name: 'suggestion_team') }

        context 'when autocomplete param value is an empty string' do
          let_it_be(:params) { params.merge autocomplete: '' }

          it_behaves_like 'a successful action'
          it { is_expected.to match_json_schema('api/boards/suggestions') }
          it 'responds with a list of all users and teams from db' do
            expect(json_body['users']).not_to be_empty
            expect(json_body['teams']).not_to be_empty
          end
        end

        context 'when autocomplete param has value' do
          let_it_be(:params) { params.merge autocomplete: 'suggestion' }

          it_behaves_like 'a successful action'
          it { is_expected.to match_json_schema('api/boards/suggestions') }
          it 'responds with a list of users and teams from db that fit query case insensitively' do
            expect(json_body['users'])
              .to contain_exactly(suggestion_user_1.email, suggestion_user_2.email)
            expect(json_body['teams'])
              .to contain_exactly(suggestion_team.name)
          end
        end
      end
    end
  end
end
