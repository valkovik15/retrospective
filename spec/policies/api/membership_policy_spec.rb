# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::MembershipPolicy do
  let_it_be(:member) { create(:user) }
  let_it_be(:creator) { create(:user) }
  let_it_be(:not_a_member) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) { build(:membership, user_id: member.id, board_id: board.id) }
  let_it_be(:creatorship) do
    create(:membership, user_id: creator.id, board_id: board.id, role: 'creator')
  end

  let(:policy) { described_class.new(membership, user: test_user) }

  describe '#ready_status?' do
    subject { policy.apply(:ready_status?) }

    context 'when user is a member' do
      let(:test_user) { member }
      it { is_expected.to eq true }
    end

    context 'when user is not a member' do
      let(:test_user) { not_a_member }
      it { is_expected.to eq false }
    end
  end

  describe '#ready_toggle?' do
    subject { policy.apply(:ready_toggle?) }

    context 'when user is a member' do
      let(:test_user) { member }
      it { is_expected.to eq true }
    end

    context 'when user is not a member' do
      let(:test_user) { not_a_member }
      it { is_expected.to eq false }
    end
  end

  describe '#destroy?' do
    subject { policy.apply(:destroy?) }

    context 'when user is a creator' do
      let(:test_user) { creator }
      it { is_expected.to eq true }
    end

    context 'when user is not a creator' do
      let(:test_user) { member }
      it { is_expected.to eq false }
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

  describe '#user_is_creator?' do
    subject { policy.apply(:user_is_creator?) }

    context 'when user is a creator' do
      let(:test_user) { creator }
      it { is_expected.to eq true }
    end

    context 'when user is not a creator' do
      let(:test_user) { member }
      it { is_expected.to eq false }
    end

    context 'when user is not a member' do
      let(:test_user) { not_a_member }
      it { is_expected.to eq false }
    end
  end
end
