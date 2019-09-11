# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActionItemPolicy do
  let_it_be(:member) { create(:user) }
  let_it_be(:not_a_member) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) do
    create(:membership, user_id: member.id, board_id: board.id, role: 'creator')
  end
  let_it_be(:action_item) { build_stubbed(:action_item, board: board) }
  let_it_be(:successful_policy) { described_class.new(action_item, user: member) }
  let_it_be(:failed_policy) { described_class.new(action_item, user: not_a_member) }

  context '#create?' do
    it 'returns true if user is a member of board' do
      expect(successful_policy.apply(:create?)).to eq true
    end

    it 'returns false if user is not a member of board' do
      expect(failed_policy.apply(:create?)).to eq false
    end
  end

  context '#move?' do
    it 'returns true if user is a member of board' do
      expect(successful_policy.apply(:move?)).to eq true
    end

    it 'returns false if user is not a member of board' do
      expect(failed_policy.apply(:move?)).to eq false
    end
  end
end
