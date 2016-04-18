Feature: Transactions
    In order to use the site
    As a user
    I need to be able to add transactions
    Scenario: Pressing Add Transaction button
        Given I am on the dashboard page
        When I press the button Add Transaction
        And I select a valid file
        Then I should be on the dashboard page

    Scenario: Uploading a valid file
        Given I am on the dashboard page
        When I press the button Add Transaction	
        When I upload a file with valid data
        When I upload a file with invalid data
        Then I should be on the dashboard page
