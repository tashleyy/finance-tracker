Feature: Accounts List
    In order to use the site
    As a user
    I need to be able to view my accounts
    Scenario: Pressing Add Account Button
        Given I am on the dashboard page
        When I press the button Add Account
        And I upload a valid file
        Then I should be on the dashboard page
    Scenario: Delete Account
        Given I am on the dashboard page
        When I press the button Delete Account
        Then I should have 1 of #deleteAccountSelect selector
        Then I should have 1 of #deleteAccountButton selector
    Scenario: Account List
        Given I am on the dashboard page
        Then I should have 1 of #accountsList selector
        Then I should have Account NameVisibility text for #accountsList thead tr th selector