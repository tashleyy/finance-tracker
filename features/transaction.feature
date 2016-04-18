Feature: Transactions
    In order to use the site
    As a user
    I need to be able to view and add my transactions
    Scenario: Transaction List
        Given I am on the dashboard page
        Then I should have 1 of #transactionsList selector
        Then I should have DateAmountAccountMerchantCategory text for #transactionsList thead tr th selector
    Scenario: Add Transaction
        Given I am on the dashboard page
        When I press the button Add Transaction
        When I upload a file called /home/team-c/finance-tracker/assets/transaction.csv to #addTransactionInputFile selector
        When I press the button Submit
        Then I should have at least 5 of #transactionsList tbody tr selector
        Then I should be on the dashboard page