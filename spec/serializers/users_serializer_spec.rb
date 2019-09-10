# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserSerializer do
  let_it_be(:user) { create(:user) }

  subject { described_class.new(user).to_json }

  it 'makes json with email' do
    expect(subject).to include '"email":"user@example.com"'
  end
end
