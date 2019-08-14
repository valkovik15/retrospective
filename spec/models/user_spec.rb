# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  let_it_be(:user) { build_stubbed(:user) }

  context 'validations' do
    it 'is valid with valid attributes' do
      expect(user).to be_valid
    end

    it 'is not valid without an email' do
      expect(build_stubbed(:user, email: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'has many memberships' do
      expect(user).to respond_to(:memberships)
    end

    it 'has many boards' do
      expect(user).to respond_to(:boards)
    end

    it 'has many cards' do
      expect(user).to respond_to(:cards)
    end

    it 'has many teams' do
      expect(user).to respond_to(:teams)
    end
  end

  context '#from_omniauth', :vcr do
    after(:each) do
      FileUtils.rm_rf(Dir["#{Rails.root}/spec/support/uploads"])
    end

    let(:auth_hash) { build(:omniauth) }

    subject { described_class.from_omniauth(auth_hash) }

    it 'retrieves an existing user' do
      user = create(:user, :github)
      expect(subject).to eq(user)
    end

    it "creates a new user if one doesn't already exist" do
      expect { subject }.to change { User.count }.by(1)
    end

    it 'created user has avatar' do
      expect(subject.avatar_url).not_to be_nil
    end
  end
end
