# frozen_string_literal: true

FactoryBot.define do
  factory :omniauth, class: OmniAuth::AuthHash do
    info { { email: 'user@example.com' } }
    provider { 'github' }
    uid { 1234 }
  end
end
