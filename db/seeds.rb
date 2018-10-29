# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
sports_seeds = [
  {name: "Tennis"},
  {name: "Basketball"},
  {name: "Football"},
  {name: "American Football"},
  {name: "Hockey"},
  {name: "Baseball"},
  {name: "Lacrosse"},
  {name: "Rugby"},
  {name: "Weight Lifting"},
  {name: "Skiing"}
  ]

sports_seeds.each do |seed|
  Sport.create!(seed)
end
