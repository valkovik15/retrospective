# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Board, type: :model do
  let_it_be(:board) { build_stubbed(:board) }

  context 'validations' do
    it 'is valid with valid attributes' do
      expect(board).to be_valid
    end

    it 'is not valid without a title' do
      expect(build_stubbed(:board, title: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'has many cards' do
      expect(board).to respond_to(:cards)
    end

    it 'has many action items' do
      expect(board).to respond_to(:action_items)
    end

    it 'has many memberships' do
      expect(board).to respond_to(:memberships)
    end

    it 'has many users' do
      expect(board).to respond_to(:users)
    end
  end
end
