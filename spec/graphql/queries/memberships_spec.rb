# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::Memberships, type: :request do
  describe '.resolve' do
    let!(:author) { create(:user) }
    let!(:board) { create(:board) }
    let!(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end
    let!(:non_author) { create(:user) }
    let!(:non_creatorship) do
      create(:membership, board: board, user: non_author, role: 'member')
    end

    before { sign_in author }

    it 'returns membership for provided board slug' do
      post '/graphql', params: { query: query(board_slug: board.slug) }

      json = JSON.parse(response.body)
      data = json['data']['memberships']

      expect(data).to match_array(
        [
          {
            'id' => creatorship.id,
            'board' => { 'id' => board.id.to_s },
            'user' => { 'id' => author.id.to_s },
            'ready' => creatorship.ready
          },
          {
            'id' => non_creatorship.id,
            'board' => { 'id' => board.id.to_s },
            'user' => { 'id' => non_author.id.to_s },
            'ready' => creatorship.ready
          }
        ]
      )
    end
  end

  def query(board_slug:)
    <<~GQL
      query {
        memberships(boardSlug: "#{board_slug}") {
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
