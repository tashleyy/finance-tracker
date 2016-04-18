Feature: Transactions
    In order to use the site
    As a user
    I need to be able to add transactions
    Scenario: Add Transaction
        Given I am on the dashboard page
        When I press the button Add Transaction
        When I upload a file called "../assets/transaction.csv" to selector #addTransactionInputFile
        When I press the button Submit
        Then I should have at least 5 of #transactionsList tbody tr
        Then I should be on the dashboard page