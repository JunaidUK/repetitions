require 'rails_helper'

describe Sport do

  it  { should have_valid(:name).when("Tennis") }
  it  { should_not have_valid(:name).when(nil, "") }

  it  { should have_valid(:name).when("Basketball") }
  it  { should_not have_valid(:name).when(nil, "") }

end
