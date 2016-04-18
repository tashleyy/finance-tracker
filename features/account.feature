Feature: Accounts List
    In order to use the site
    As a user
    I need to be able to view my accounts
    Scenario: Add Account
        Given I am on the dashboard page
        When I press the button Add Account
        When I upload a file called ../assets/account.csv to #addAccountInputFile selector
        When I press the button Submit
        Then I should have at least 4 of #accountsList tbody tr selector
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