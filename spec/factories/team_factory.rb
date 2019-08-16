# frozen_string_literal: true

FactoryBot.define do
  factory :team do
    name { Faker::Team.name }

    trait :with_users do
      users { [build(:user)] }
    end
  end
end
