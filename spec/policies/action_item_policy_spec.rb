# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActionItemPolicy do
  let_it_be(:member) { create(:user) }
  let_it_be(:not_a_creator) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) do
    create(:membership, user_id: member.id, board_id: board.id, role: 'creator')
  end
  let_it_be(:action_item) { build_stubbed(:action_item, board: board) }
  let(:policy) { described_class.new(action_item, user: test_user, board: board) }

  describe '#create?' do
    subject { policy.apply(:create?) }

    context 'when user is a creator' do
      let(:test_user) { member }
      it { is_expected.to eq true }
    end

    context 'when user is not a creator' do
      let(:test_user) { not_a_creator }
      it { is_expected.to eq false }
    end
  end

  describe '#move?' do
    subject { policy.apply(:move?) }

    context 'when user is a creator' do
      let(:test_user) { member }
      it { is_expected.to eq true }
    end

    context 'when user is not a creator' do
      let(:test_user) { not_a_creator }
      it { is_expected.to eq false }
    end
  end

  describe '#user_is_creator?' do
    subject { policy.apply(:user_is_creator?) }

    context 'when user is a creator' do
      let(:test_user) { member }
      it { is_expected.to eq true }
    end

    context 'when user is not a creator' do
      let(:test_user) { not_a_creator }
      it { is_expected.to eq false }
    end
  end
end
