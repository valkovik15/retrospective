# frozen_string_literal: true

FactoryBot.define do
  factory :omniauth, class: OmniAuth::AuthHash do
    info do
      { email: 'user@example.com',
        image: 'https://avatars2.githubusercontent.com/u/1234?s=460&v=4' }
    end
    provider { 'github' }
    uid { 1234 }
  end
end
