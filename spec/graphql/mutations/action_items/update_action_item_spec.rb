# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateActionItemMutation, type: :request do
  describe '.resolve' do
    let(:author) { create(:user) }
    let!(:board) { create(:board) }
    let!(:action_item) { create(:action_item, board: board) }
    let(:request) { post '/graphql', params: { query: query(id: action_item.id, body: 'New body') } }
    let!(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end
    before { sign_in author }

    it 'updates an action item' do
      request

      expect(action_item.reload).to have_attributes(
        'body' => 'New body'
      )
    end

    it 'returns a card' do
      request

      json = JSON.parse(response.body)
      data = json.dig('data', 'updateActionItem', 'actionItem')

      expect(data).to include(
        'id' => action_item.id,
        'body' => 'New body',
      )
    end
  end

  def query(id:, body:)
    <<~GQL
      mutation {
        updateActionItem(
          input: {
            id: #{id}
            attributes: {
              body: "#{body}"
            }
          }
        ) {
          actionItem {
            id
            body
          }
        }
      }
    GQL
  end
end
