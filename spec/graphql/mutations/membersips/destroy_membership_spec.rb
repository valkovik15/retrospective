# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::DestroyMembershipMutation, type: :request do
  describe '#resolve' do
    let!(:board) { create(:board) }
    let(:author) { create(:user) }
    let(:non_author) { create(:user) }
    let!(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end
    let!(:non_creatorship) do
      create(:membership, board: board, user: non_author, role: 'member')
    end
    let(:request) { post '/graphql', params: { query: query(id: non_creatorship.id) } }

    before { sign_in author }

    it 'removes membership' do
      expect { request }.to change { Membership.count }.by(-1)
    end

    it 'returns a membership' do
      request

      json = JSON.parse(response.body)
      data = json.dig('data', 'destroyMembership')

      expect(data).to include(
        'id' => non_creatorship.id
      )
    end
  end

  def query(id:)
    <<~GQL
      mutation {
        destroyMembership(
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
