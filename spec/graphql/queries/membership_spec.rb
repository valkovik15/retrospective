# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::Membership, type: :request do
  describe '.resolve' do
    let!(:author) { create(:user) }
    let!(:board) { create(:board) }
    let!(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end

    before { sign_in author }

    it 'returns membership for provided id' do
      post '/graphql', params: { query: query(board_slug: board.slug) }

      json = JSON.parse(response.body)
      data = json['data']['membership']

      expect(data).to include(
        'id' => be_present,
        'board' => { 'id' => board.id.to_s },
        'user' => { 'id' => author.id.to_s },
        'ready' => creatorship.ready
      )
    end
  end

  def query(board_slug:)
    <<~GQL
      query {
        membership(boardSlug: "#{board_slug}") {
          id
          board{
            id
          }
          user{
            id
          }
          ready
        }
      }
    GQL
  end
end
