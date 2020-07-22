# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MembershipPolicy do
  let_it_be(:member) { create(:user) }
  let_it_be(:creator) { create(:user) }
  let(:not_a_member) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) { build(:membership, user_id: member.id, board_id: board.id) }
  let_it_be(:creatorship) do
    create(:membership, user_id: creator.id, board_id: board.id, role: 'creator')
  end

  let(:policy) { described_class.new(membership: test_membership) }

  describe '#index?' do
    subject { policy.apply(:index?) }

    context 'when memberhip role is a member' do
      let(:test_membership) { membership }
      it { is_expected.to eq true }
    end

    context 'when membership does not exist' do
      let(:test_membership) { nil }
      it { is_expected.to eq false }
    end
  end

  describe '#ready_status?' do
    subject { policy.apply(:ready_status?) }

    context 'when memberhip role is a member' do
      let(:test_membership) { membership }
      it { is_expected.to eq true }
    end

    context 'when membership does not exist' do
      let(:test_membership) { nil }
      it { is_expected.to eq false }
    end
  end

  describe '#ready_toggle?' do
    subject { policy.apply(:ready_toggle?) }

    context 'when user is a member' do
      let(:test_membership) { membership }
      it { is_expected.to eq true }
    end

    context 'when membership does not exist' do
      let(:test_membership) { nil }
      it { is_expected.to eq false }
    end
  end

  describe '#destroy?' do
    let(:policy) { described_class.new(membership_to_destroy, membership: test_membership) }
    let(:membership_to_destroy) { nil }

    subject { policy.apply(:destroy?) }

    context 'when membership role is a creator' do
      context 'when membership_to_destroy role is a member' do
        let(:membership_to_destroy) { membership }
        let(:test_membership) { creatorship }
        it { is_expected.to eq true }
      end
      context 'when membership_to_destroy role is a creator' do
        let(:membership_to_destroy) { creatorship }
        let(:test_membership) { creatorship }
        it { is_expected.to eq false }
      end
    end

    context 'when membership role is not a creator' do
      let(:test_membership) { membership }
      it { is_expected.to eq false }
    end

    context 'when membership does not exist' do
      let(:test_membership) { nil }
      it { is_expected.to eq false }
    end
  end

  describe '#role_is_member?' do
    subject { policy.apply(:role_is_member?) }

    context 'when membership exists' do
      let(:test_membership) { membership }
      it { is_expected.to eq true }
    end

    context 'when membership does not exist' do
      let(:test_membership) { nil }
      it { is_expected.to eq false }
    end
  end

  describe '#role_is_creator?' do
    subject { policy.apply(:role_is_creator?) }

    context 'when membership role is a creator' do
      let(:test_membership) { creatorship }
      it { is_expected.to eq true }
    end

    context 'when membership role is not a creator' do
      let(:test_membership) { membership }
      it { is_expected.to eq false }
    end

    context 'when membership does not exist' do
      let(:test_membership) { nil }
      it { is_expected.to eq false }
    end
  end
end
