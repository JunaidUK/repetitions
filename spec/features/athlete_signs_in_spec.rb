require 'rails_helper'

feature 'Athlete signs in', %Q{
  As a signed up user
  I want to sign in
  So that I can regain access to my account
} do
  scenario 'specify valid credentials' do
    athlete = FactoryBot.create(:athlete)

    visit new_athlete_session_path

    fill_in 'Email', with: athlete.email
    fill_in 'Password', with: athlete.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content('SIGN OUT')
  end

  scenario 'specify invalid credentials' do
    visit new_athlete_session_path

    click_button 'Log in'
    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('SIGN OUT')
  end
end
