# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MembershipSerializer do
  let_it_be(:membership) { build_stubbed(:membership) }

  subject { described_class.new(membership).to_json }

  it 'makes json with readiness' do
    expect(subject).to include 'ready":false'
  end

  it 'makes json with user' do
    expect(subject).to include 'user'
  end
end
