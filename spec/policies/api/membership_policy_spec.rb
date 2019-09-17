# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::MembershipPolicy do
  let_it_be(:member) { create(:user) }
  let_it_be(:not_a_member) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) { create(:membership, user_id: member.id, board_id: board.id) }
  let_it_be(:successful_policy) { described_class.new(membership, user: member) }
  let_it_be(:failed_policy) { described_class.new(membership, user: not_a_member) }

  context '#ready_status?' do
    it 'returns true if user is a member' do
      expect(successful_policy.apply(:ready_status?)).to eq true
    end

    it 'returns false if user is not a member' do
      expect(failed_policy.apply(:ready_status?)).to eq false
    end
  end

  context '#ready_toggle?' do
    it 'returns true if user is a member' do
      expect(successful_policy.apply(:ready_toggle?)).to eq true
    end

    it 'returns false if user is not a member' do
      expect(failed_policy.apply(:ready_toggle?)).to eq false
    end
  end
end
