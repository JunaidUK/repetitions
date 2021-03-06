require 'rails_helper'

feature 'Athlete signs out', %Q{
  As an authenticated user
  I want to sign out
  So that my identity is forgotten about on the machine I'm using
} do
  # Acceptance Criteria
  # * If I'm signed in, I have an option to sign out
  # * When I opt to sign out, I get a confirmation that my identity has been
  #   forgotten on the machine I'm using

  scenario 'authenticated athlete signs out' do
    athlete = FactoryBot.create(:athlete)

    visit new_athlete_session_path

    fill_in 'Email', with: athlete.email
    fill_in 'Password', with: athlete.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')

    click_link 'SIGN OUT'
    expect(page).to have_content('Signed out successfully')
  end

  scenario 'unauthenticated athlete attempts to sign out' do
    visit '/'
    expect(page).to_not have_content('SIGN OUT')
  end
end
