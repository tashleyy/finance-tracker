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
    Scenario: Edit Budget
        Given I am on the dashboard page
        When I press the button Edit Budget
        When I select the Dining option of budgetEdit
        When I fill #budgetEditText selector with 30
        Then I should be on the dashboard page