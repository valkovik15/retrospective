# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::ActionItemPolicy do
  let_it_be(:creator) { create(:user) }
  let_it_be(:member) { create(:user) }
  let(:not_member) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:creatorship) do
    create(:membership, user_id: creator.id, board_id: board.id, role: 'creator')
  end
  let_it_be(:membership) { create(:membership, user_id: member.id, board_id: board.id) }
  let(:action_item) { build_stubbed(:action_item, board: board) }

  let(:policy) { described_class.new(action_item, user: test_user, board: board) }

  describe '#destroy?' do
    subject { policy.apply(:destroy?) }

    context 'when user is the board creator' do
      let(:test_user) { creator }
      it { is_expected.to eq true }
    end

    context 'when user is a board member' do
      let(:test_user) { member }
      it { is_expected.to eq false }
    end

    context 'when user is not a board member' do
      let(:test_user) { not_member }
      it { is_expected.to eq false }
    end
  end

  describe '#update?' do
    subject { policy.apply(:update?) }

    context 'when user is the board creator' do
      let(:test_user) { creator }
      it { is_expected.to eq true }
    end

    context 'when user is a board member' do
      let(:test_user) { member }
      it { is_expected.to eq false }
    end

    context 'when user is not a board member' do
      let(:test_user) { not_member }
      it { is_expected.to eq false }
    end
  end

  describe '#user_is_creator?' do
    subject { policy.apply(:user_is_creator?) }

    context 'when user is the board creator' do
      let(:test_user) { creator }
      it { is_expected.to eq true }
    end

    context 'when user is a board member' do
      let(:test_user) { member }
      it { is_expected.to eq false }
    end

    context 'when user is not a board member' do
      let(:test_user) { not_member }
      it { is_expected.to eq false }
    end
  end
end
