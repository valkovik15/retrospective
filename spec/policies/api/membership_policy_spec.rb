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
  let_it_be(:member_policy) { described_class.new(membership, user: member) }
  let_it_be(:failed_policy) { described_class.new(membership, user: not_a_member) }
  let_it_be(:creator_policy) { described_class.new(creatorship, user: creator) }

  context '#ready_status?' do
    context 'when user is a member' do
      it {  expect(member_policy.apply(:ready_status?)).to eq true }
    end
    context 'when user is not a member' do
      it {  expect(failed_policy.apply(:ready_status?)).to eq false }
    end
  end

  context '#ready_toggle?' do
    context 'when user is a member' do
      it {  expect(member_policy.apply(:ready_toggle?)).to eq true }
    end
    context 'when user is not a member' do
      it {  expect(failed_policy.apply(:ready_toggle?)).to eq false }
    end
  end

  context '#destroy?' do
    context 'when user is a creator' do
      it {  expect(creator_policy.apply(:destroy?)).to eq true }
    end
    context 'when user is not a creator' do
      it {  expect(failed_policy.apply(:destroy?)).to eq false }
    end
  end

  context '#user_is_member?' do
    context 'when user is a member' do
      it {  expect(member_policy.apply(:user_is_member?)).to eq true }
    end
    context 'when user is not a member' do
      it {  expect(failed_policy.apply(:user_is_member?)).to eq false }
    end
  end

  context '#user_is_creator?' do
    context 'when user is a creator' do
      it {  expect(creator_policy.apply(:user_is_creator?)).to eq true }
    end

    context 'when user is not a creator' do
      it {  expect(member_policy.apply(:user_is_creator?)).to eq false }
    end
  end
end
