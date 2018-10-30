# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_30_005721) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "athletes", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.float "latitude"
    t.float "longitude"
    t.float "location"
    t.index ["email"], name: "index_athletes_on_email", unique: true
    t.index ["reset_password_token"], name: "index_athletes_on_reset_password_token", unique: true
  end

  create_table "equipments", force: :cascade do |t|
    t.bigint "athlete_id", null: false
    t.string "name", null: false
    t.index ["athlete_id"], name: "index_equipments_on_athlete_id"
  end

  create_table "practices", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.string "location", null: false
    t.string "date"
    t.string "time"
    t.string "date_time"
    t.bigint "athlete_id", null: false
    t.bigint "sport_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["athlete_id"], name: "index_practices_on_athlete_id"
    t.index ["sport_id"], name: "index_practices_on_sport_id"
  end

  create_table "sports", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_sports_on_name", unique: true
  end

end
