# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::DestroyCommentMutation, type: :request do
  describe '.resolve' do
    let(:author) { create(:user) }
    let(:card) { create(:card, author: author) }
    let(:comment) { create(:comment, author: author, card: card) }
    let(:request) { post '/graphql', params: { query: query(id: comment.id) } }

    before { sign_in author }

    it 'deletes a comment' do
      expect { request.to change { Comment.count }.by(-1) }
    end

    it 'returns a comment' do
      request

      json = JSON.parse(response.body)
      data = json.dig('data', 'destroyComment')

      expect(data).to include(
        'id' => comment.id
      )
    end
  end

  def query(id:)
    <<~GQL
      mutation {
        destroyComment(
          input: {
            id: #{id}
          }
        ) {
            id
        }
      }
    GQL
  end
end
