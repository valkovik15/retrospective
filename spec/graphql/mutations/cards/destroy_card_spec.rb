# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::DestroyCardMutation, type: :request do
  describe '#resolve' do
    let!(:author) { create(:user) }
    let!(:card) { create(:card, author: author) }
    let(:request) { post '/graphql', params: { query: query(id: card.id) } }

    before { sign_in author }

    it 'removes card' do
      expect { request }.to change { Card.count }.by(-1)
    end

    it 'returns a card' do
      request

      json = JSON.parse(response.body)
      data = json.dig('data', 'destroyCard')

      expect(data).to include(
        'id' => card.id
      )
    end
  end

  def query(id:)
    <<~GQL
      mutation {
        destroyCard(
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
