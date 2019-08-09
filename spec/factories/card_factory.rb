# frozen_string_literal: true

FactoryBot.define do
  factory :card do
    kind { 'mad' }
    body { Faker::ChuckNorris.fact }
    association :board
    association :author, factory: :user, email: Faker::Internet.email
  end
end
