# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::DestroyActionItemMutation, type: :request do
  describe '#resolve' do
    let!(:board) { create(:board) }
    let!(:action_item) { create(:action_item, board: board) }
    let(:author) { create(:user) }
    let(:request) { post '/graphql', params: { query: query(id: action_item.id) } }

    let!(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end

    before { sign_in author }

    it 'removes action item' do
      expect { request }.to change { ActionItem.count }.by(-1)
    end

    it 'returns a action item' do
      request

      json = JSON.parse(response.body)
      data = json.dig('data', 'destroyActionItem')

      expect(data).to include(
        'id' => action_item.id
      )
    end
  end

  def query(id:)
    <<~GQL
      mutation {
        destroyActionItem(
          input: {
            id: #{id}
          }
        ) {
          id
          errors {
            fullMessages
          }
        }
      }
    GQL
  end
end
