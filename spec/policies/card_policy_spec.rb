# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CardPolicy do
  let_it_be(:member) { create(:user) }
  let_it_be(:not_a_member) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) { create(:membership, user_id: member.id, board_id: board.id) }
  let_it_be(:card) { build_stubbed(:card, board: board, author: member) }
  let(:policy) { described_class.new(card, user: test_user) }

  describe '#create?' do
    subject { policy.apply(:create?) }

    context 'when user is a member' do
      let(:test_user) { member }
      it { is_expected.to eq true }
    end

    context 'when user is not a member' do
      let(:test_user) { not_a_member }
      it { is_expected.to eq false }
    end
  end

  describe '#user_is_member?' do
    subject { policy.apply(:user_is_member?) }

    context 'when user is a member' do
      let(:test_user) { member }
      it { is_expected.to eq true }
    end

    context 'when user is not a member' do
      let(:test_user) { not_a_member }
      it { is_expected.to eq false }
    end
  end
end
