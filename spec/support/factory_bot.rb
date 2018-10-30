require 'factory_bot'

FactoryBot.define do
  factory :athlete do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    first_name {'Junaid'}
    last_name {'Siddiqui'}
  end

end
