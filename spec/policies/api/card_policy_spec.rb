# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::CardPolicy do
  let_it_be(:author) { create(:user) }
  let_it_be(:not_an_author) { build_stubbed(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:card) { build_stubbed(:card, board: board, author: author) }
  let(:policy) { described_class.new(card, user: test_user) }

  describe '#destroy?' do
    subject { policy.apply(:destroy?) }

    context 'when user is the card author' do
      let(:test_user) { author }
      it { is_expected.to eq true }
    end

    context 'when user is not the card author' do
      let(:test_user) { not_an_author }
      it { is_expected.to eq false }
    end
  end

  describe '#update?' do
    subject { policy.apply(:update?) }

    context 'when user is the card author' do
      let(:test_user) { author }
      it { is_expected.to eq true }
    end

    context 'when user is not the card author' do
      let(:test_user) { not_an_author }
      it { is_expected.to eq false }
    end
  end

  describe '#user_is_author?' do
    subject { policy.apply(:user_is_author?) }

    context 'when user is the card author' do
      let(:test_user) { author }
      it { is_expected.to eq true }
    end

    context 'when user is not the card author' do
      let(:test_user) { not_an_author }
      it { is_expected.to eq false }
    end
  end
end
