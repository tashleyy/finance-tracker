Feature: Graph Widget
    In order to use the site
    As a user
    I need to be able to see a graph of account information
    Scenario: Graph
        Given I am on the dashboard page
        Then I should have 1 of #graph selector
        Then I should have 1 of svg selector
        Then I should have 2 of .axis selector
        Then I should have 1 of .xAxis selector
        Then I should have 1 of .yAxis selector
        Then I should have 3 of .line selector
        Then I should have 1 of #totalNetWorthLine selector
        Then I should have 1 of #totalAssetsLine selector
        Then I should have 1 of #totalLiabilitiesLine selector
    Scenario: Graph Account
        Given I am on the dashboard page
        Given I have imported the accounts in file /home/team-c/finance-tracker/assets/account.csv
        Given I have imported the transactions in file /home/team-c/finance-tracker/assets/transaction.csv
        When I check the checkbox testcsv2
        Then I should have 1 of #testcsv2Line selector
        Then I should have at least 1 of .line selector
    Scenario: Ungraph Account
        Given I am on the dashboard page
        Given I have imported the accounts in file /home/team-c/finance-tracker/assets/account.csv
        Given I have imported the transactions in file /home/team-c/finance-tracker/assets/transaction.csv
        When I uncheck the checkbox testcsv2
        Then I should have 0 of #testcsv2Line selector