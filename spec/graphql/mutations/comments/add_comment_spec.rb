# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::AddCommentMutation, type: :request do
  describe '.resolve' do
    let_it_be(:author) { create(:user) }
    let_it_be(:board) { create(:board) }
    let_it_be(:card) { create(:card, author: author, board: board) }
    let_it_be(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end
    let(:request) do
      post '/graphql', params: { query: query(card_id: card.id,
                                              content: 'Updated') }
    end

    before { sign_in author }
    it 'adds a comment' do
      expect { request }.to change { Comment.count }.by 1
    end

    it 'returns a comment' do
      request

      json = JSON.parse(response.body)
      data = json.dig('data', 'addComment', 'comment')

      expect(data).to include(
        'id' => be_present,
        'content' => 'Updated',
        'author' => { 'id' => author.id.to_s }
      )
    end
  end

  def query(card_id:, content:)
    <<~GQL
      mutation {
        addComment(
          input: {
            attributes: {
              cardId: "#{card_id}"
              content: "#{content}"
            }
          }
        ) {
          comment {
            id
            content
            author {
              id
            }
          }
          errors
          {
            fullMessages
          }
        }
      }
    GQL
  end
end
