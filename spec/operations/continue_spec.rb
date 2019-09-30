# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::Continue do
  let_it_be(:creator) { create(:user) }
  let_it_be(:prev_board) { create(:board) }
  let_it_be(:creatorship) { create(:membership, board: prev_board, user: creator, role: 'creator') }

  describe '#default_board_name' do
    subject { described_class.new(prev_board, creator).send(:default_board_name) }

    it { is_expected.to eq Date.today.strftime('%d-%m-%Y') }
  end

  describe '#prev_board_continued?' do
    subject { described_class.new(prev_board, creator).send(:prev_board_continued?) }

    context 'when board was not previously continued' do
      it { is_expected.to eq false }
    end

    context 'when board was previously continued' do
      let_it_be(:next_board) { create(:board, previous_board: prev_board) }
      it { is_expected.to eq true }
    end
  end
end
