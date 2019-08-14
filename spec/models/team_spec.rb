# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Team, type: :model do
  let_it_be(:team) { build_stubbed(:team) }

  context 'validations' do
    it 'is valid with valid attributes' do
      expect(team).to be_valid
    end

    it 'is not valid without name' do
      expect(build_stubbed(:team, name: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'has_many_users' do
      expect(team).to respond_to(:users)
    end
  end
end
