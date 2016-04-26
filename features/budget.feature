Feature: Budgets
    In order to use the site
    As a user
    I need to be able to track my budgets
    Scenario: Budgets
        Given I am on the dashboard page
        Then I should have 5 of .progress selector
        Then I should have 1 of #groceriesProgress selector
        Then I should have 1 of #diningProgress selector
        Then I should have 1 of #entertainmentProgress selector
        Then I should have 1 of #utilitiesProgress selector
        Then I should have 1 of #otherProgress selector