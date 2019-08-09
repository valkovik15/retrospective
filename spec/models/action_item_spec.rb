# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActionItem, type: :model do
  context 'validations' do
    it 'is valid with valid attributes' do
      expect(build(:action_item)).to be_valid
    end

    it 'is not valid without a body' do
      expect(build(:action_item, body: nil)).to_not be_valid
    end

    it 'is not valid without a kind' do
      expect(build(:action_item, status: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'belongs to board' do
      expect(build(:action_item)).to respond_to(:board)
    end
  end
end
