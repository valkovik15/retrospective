# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Membership, type: :model do
  let_it_be(:membership) { build_stubbed(:membership) }

  context 'associations' do
    it 'belongs to user' do
      expect(membership).to respond_to(:user)
    end

    it 'belongs to board' do
      expect(membership).to respond_to(:board)
    end
  end

  context 'defaults' do
    it 'creates record with default status' do
      expect(membership.ready).to be(false)
    end
  end
end
