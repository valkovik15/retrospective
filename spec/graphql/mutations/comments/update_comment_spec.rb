# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateCommentMutation, type: :request do
  describe '.resolve' do
    let(:author) { create(:user) }
    let(:card) { create(:card, author: author) }
    let(:comment) { create(:comment, author: author, card: card) }
    let(:request) { post '/graphql', params: { query: query(id: comment.id, content: 'Updated') } }

    before { sign_in author }

    it 'updates a comment' do
      request

      expect(comment.reload).to have_attributes(
        'author_id' => author.id,
        'content' => 'Updated'
      )
    end

    it 'returns a comment' do
      request

      json = JSON.parse(response.body)
      data = json.dig('data', 'updateComment', 'comment')

      expect(data).to include(
        'id' => comment.id,
        'content' => 'Updated',
        'author' => { 'id' => author.id.to_s }
      )
    end
  end

  def query(id:, content:)
    <<~GQL
      mutation {
        updateComment(
          input: {
            id: #{id}
            attributes: {
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
        }
      }
    GQL
  end
end
