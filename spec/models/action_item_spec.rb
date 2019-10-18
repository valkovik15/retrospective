# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActionItem, type: :model do
  let_it_be(:action_item) { build_stubbed(:action_item) }

  context 'validations' do
    it 'is valid with valid attributes' do
      expect(action_item).to be_valid
    end

    it 'is not valid without a body' do
      expect(build_stubbed(:action_item, body: nil)).to_not be_valid
    end

    it 'is not valid without a status' do
      expect(build_stubbed(:action_item, status: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'belongs to board' do
      expect(action_item).to respond_to(:board)
    end
  end

  describe 'aasm' do
    subject { action_item }

    context 'status: pending' do
      let(:action_item) { build_stubbed(:action_item, status: 'pending') }

      it { is_expected.to have_state(:pending) }

      context 'allowed transitions' do
        it { is_expected.to allow_transition_to(:closed) }
        it { is_expected.to allow_transition_to(:done) }
        it { is_expected.to_not allow_transition_to(:pending) }
      end

      it { is_expected.to transition_from(:pending).to(:closed).on_event(:close) }
      it { is_expected.to transition_from(:pending).to(:done).on_event(:complete) }
    end

    context 'status: closed' do
      let(:action_item) { build_stubbed(:action_item, status: 'closed') }

      it { is_expected.to have_state(:closed) }

      context 'allowed transitions' do
        it { is_expected.to_not allow_transition_to(:closed) }
        it { is_expected.to_not allow_transition_to(:done) }
        it { is_expected.to allow_transition_to(:pending) }
      end

      it { is_expected.to transition_from(:closed).to(:pending).on_event(:reopen) }
    end

    context 'status: done' do
      let(:action_item) { build_stubbed(:action_item, status: 'done') }

      it { is_expected.to have_state(:done) }

      context 'allowed transitions' do
        it { is_expected.to_not allow_transition_to(:closed) }
        it { is_expected.to_not allow_transition_to(:done) }
        it { is_expected.to allow_transition_to(:pending) }
      end

      it { is_expected.to transition_from(:done).to(:pending).on_event(:reopen) }
    end
  end
end
