# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::Suggestions, type: :request do
  describe '.resolve' do
    let!(:user_1) { create(:user, email: 'tu1@mail.com') }
    let!(:user_2) { create(:user, email: 'tu2@mail.com') }
    let!(:user_3) { create(:user, email: 'tu3@mail.com') }
    let!(:user_4) { create(:user, email: 'wu1@mail.com') }
    let!(:team_tigers) { create(:team, name: 'Tigers', user_ids: [user_1.id, user_2.id]) }
    let!(:team_wolves) { create(:team, name: 'Wolves', user_ids: [user_3.id, user_4.id]) }

    it 'returns teams for given autocomplete' do
      post '/graphql', params: { query: query(autocomplete: 't') }

      json = JSON.parse(response.body)
      data = json['data']['suggestions']

      expect(data).to include(
        'teams' => ['Tigers'],
        'users' => ['tu1@mail.com', 'tu2@mail.com', 'tu3@mail.com']
      )
    end
  end

  def query(autocomplete:)
    <<~GQL
      query {
        suggestions(autocomplete: "#{autocomplete}") {
          users
          teams
        }
      }
    GQL
  end
end
