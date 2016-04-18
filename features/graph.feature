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
