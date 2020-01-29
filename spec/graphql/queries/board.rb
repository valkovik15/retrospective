require 'rails_helper'

module Queries
  RSpec.describe Board, type: :request do
    describe '.resolve' do
      it 'returns board for provided id' do
        board = create(:board)
        card = create(:card, board: board)

        post '/graphql', params: { query: query(id: board.id) }

        json = JSON.parse(response.body)
        data = json['data']['board']

        expect(data).to include(
          'id'    => be_present,
          'title' => board.title,
          'cards' => [{ 'id' => card.id.to_s }]
        )
      end
    end

    def query(id:)
      <<~GQL
        query {
          board(id: #{id}) {
            id
            title
            cards {
              id
            }
          }
        }
      GQL
    end
  end
end