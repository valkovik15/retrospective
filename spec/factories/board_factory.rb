# frozen_string_literal: true

FactoryBot.define do
  factory :board do
    slug { Faker::Internet.slug }
    title { Date.today.strftime('%d-%m-%Y') }
  end
end
