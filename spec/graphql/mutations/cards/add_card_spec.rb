require 'rails_helper'

RSpec.describe Mutations::AddCardMutation, type: :request do
  describe '.resolve' do
    it 'creates a card' do
      author = create(:user)
      board = create(:board)

      expect do
        post '/graphql', params: { query: query(author_id: author.id, board_id: board.id) }
      end.to change { Card.count }.by(1)
    end

    it 'returns a card' do
      author = create(:user)
      board = create(:board)

      post '/graphql', params: { query: query(author_id: author.id, board_id: board.id) }
      json = JSON.parse(response.body)
      data = json['data']['addCard']['card']

      expect(data).to include(
        'id'      => be_present,
        'kind'    => 'mad',
        'body'    => 'Some text',
        'author'  => { 'id' => author.id.to_s },
        'boardId' => board.id.to_s
      )
    end
  end

  def query(author_id:, board_id:)
    <<~GQL
      mutation {
        addCard(
          input: {
            attributes: {
              authorId: #{author_id}
              boardId: #{board_id}
              kind: "mad"
              body: "Some text"
            }
          }
        ) {
          card {
            id
            kind
            body
            author {
              id
            }
            boardId
          }
        }
      }
    GQL
  end
end
