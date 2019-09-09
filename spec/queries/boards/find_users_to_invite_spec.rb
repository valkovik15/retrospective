# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::FindUsersToInvite do
  let(:user) { create(:user) }
  let(:board_user) { create(:user, email: 'test@mail.com') }
  let(:team) { create(:team, :with_users) }
  let(:board) { create(:board) }
  before('find users') { board.memberships.create(user_id: board_user.id) }

  context 'find users' do
    it 'finds user by email' do
      result = described_class.new(user.email, board).call
      expect(result.to_a).to eq [user]
    end

    it 'not finds user which already on board' do
      result = described_class.new("#{user.email}, #{board_user.email}", board).call
      expect(result.to_a).to eq [user]
    end
  end
  context 'find teams' do
    it 'finds team users by team name' do
      result = described_class.new(team.name, board).call
      expect(result).to eq team.users
    end
  end
end
