# frozen_string_literal: true

FactoryBot.define do
  factory :board do
    title { Date.today.strftime('%d-%m-%Y') }
    association :creator, factory: :user, email: Faker::Internet.email
    association :team
  end
end
