# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::CardPolicy do
  let_it_be(:member) { create(:user) }
  let_it_be(:not_a_member) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) { create(:membership, user_id: member.id, board_id: board.id) }
  let_it_be(:card) { build_stubbed(:card, board: board, author: member) }

  let_it_be(:successful_policy) { described_class.new(card, user: member) }
  let_it_be(:failed_policy) { described_class.new(card, user: not_a_member) }

  context '#destroy?' do
    it 'returns true if user is the card author' do
      expect(successful_policy.apply(:destroy?)).to eq true
    end

    it 'returns false if user is not the card author' do
      expect(failed_policy.apply(:destroy?)).to eq false
    end
  end
end
