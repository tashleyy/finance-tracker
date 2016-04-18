Feature: Transactions
    In order to use the site
    As a user
    I need to be able to add transactions
    Scenario: Pressing Add Transaction button
        Given I am on the dashboard page
        When I press the button Add Transaction
        Then I should be on the dashboard page

    Scenario: Uploading a valid file
        Given I am on the dashboard page
        When I press the button Add Transaction	
        When I upload a file with valid data
        Then I should be on the dashboard page
