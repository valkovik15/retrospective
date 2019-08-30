# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::BoardPolicy do
  let_it_be(:member) { create(:user) }
  let_it_be(:not_a_member) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) { create(:membership, user_id: member.id, board_id: board.id) }
  let_it_be(:successful_policy) { described_class.new(board, user: member) }
  let_it_be(:failed_policy) { described_class.new(board, user: not_a_member) }

  context '#suggestions?' do
    it 'returns true if user is a member' do
      expect(successful_policy.apply(:suggestions?)).to eq true
    end

    it 'returns false if user is not a member' do
      expect(failed_policy.apply(:suggestions?)).to eq false
    end
  end

  context '#invite?' do
    it 'returns true if user is a member' do
      expect(successful_policy.apply(:invite?)).to eq true
    end

    it 'returns false if user is not a member' do
      expect(failed_policy.apply(:invite?)).to eq false
    end
  end
end
