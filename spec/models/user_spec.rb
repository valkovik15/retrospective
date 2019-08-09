# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    it 'is valid with valid attributes' do
      expect(build(:user)).to be_valid
    end

    it 'is not valid without an email' do
      expect(build(:user, email: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'has many boards' do
      expect(build(:user)).to respond_to(:boards)
    end

    it 'has many cards' do
      expect(build(:user)).to respond_to(:cards)
    end
  end

  context '#from_omniauth' do
    let(:auth_hash) { build(:omniauth) }
    subject { described_class.from_omniauth(auth_hash) }

    it 'retrieves an existing user' do
      user = create(:user, :github)
      expect(subject).to eq(user)
    end

    it "creates a new user if one doesn't already exist" do
      expect { subject }.to change { User.count }.by(1)
    end
  end
end
