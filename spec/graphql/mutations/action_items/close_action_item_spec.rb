# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CloseActionItemMutation, type: :request do
  describe '.resolve' do
    let_it_be(:author) { create(:user) }
    let_it_be(:non_author) { create(:user) }
    let_it_be(:old_board) { create(:board) }
    let_it_be(:board) { create(:board) }
    let_it_be(:action_item) { create(:action_item, board: old_board) }

    let(:request) do
      post '/graphql', params: { query: query(id: action_item.id,
                                              board_slug: board.slug) }
    end
    let_it_be(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end

    let_it_be(:old_creatorship) do
      create(:membership, board: old_board, user: author, role: 'creator')
    end

    context 'when logged as author' do
      before { sign_in author }
      it 'updates an action_item' do
        expect { request }.to change { action_item.reload.status }.to 'closed'
      end

      it 'returns an action item' do
        request
        json = JSON.parse(response.body)
        data = json.dig('data', 'closeActionItem', 'actionItem')

        expect(data).to include(
          'id' => action_item.id
        )
      end
    end

    context 'when logged as non-author' do
      before { sign_in non_author }
      it 'updates an action item' do
        expect { request }.to_not change { action_item.reload.status }
      end
    end
  end

  def query(id:, board_slug:)
    <<~GQL
      mutation {
        closeActionItem(
          input: {
            id: #{id}
            boardSlug: "#{board_slug}"
          }
        ) {
          actionItem {
            id
          }
        }
      }
    GQL
  end
end
