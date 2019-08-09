# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Card, type: :model do
  context 'validations' do
    it 'is valid with valid attributes' do
      expect(build(:card)).to be_valid
    end

    it 'is not valid without a body' do
      expect(build(:card, body: nil)).to_not be_valid
    end

    it 'is not valid without a kind' do
      expect(build(:card, kind: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'belongs to author' do
      expect(build(:card)).to respond_to(:author)
    end

    it 'belongs to board' do
      expect(build(:card)).to respond_to(:board)
    end
  end
end
