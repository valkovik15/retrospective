# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    content { Faker::ChuckNorris.fact }
    association :card
    association :author, factory: :user, email: Faker::Internet.email
  end
end
