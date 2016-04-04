Feature: Login Page
    In order to use the site
    As a user
    I need to be able to log in
    Scenario: Visiting the site
        Given I am on the login page
        Then I should have 1 of #inputEmail selector
        Then I should have 1 of #inputPassword selector
        Then I should have 1 of button selector
    Scenario: Logging in with valid credentials
        Given I am on the login page
        When I fill #inputEmail selector with ttjahjad@usc.edu
        When I fill #inputPassword selector with password
        When I press the button Login
        Then I should be on the dashboard page
    Scenario: Logging in with invalid credentials
        Given I am on the login page
        When I fill #inputEmail selector with ttjahjad@usc.edu
        When I fill #inputPassword selector with wrongpassword
        When I press the button Login
        Then I should be on the login page
    Scenario: Logging out
        Given I am on the dashboard page
        When I press the button Sign Out
        Then I should be on the login page