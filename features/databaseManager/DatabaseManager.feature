@databaseManager
Feature: Database Manager

    Background: Login
        Given User login to the platform as 'admin'
        Then clean active calls
        And let user reset the database

    @1012
    Scenario: Database Create
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then Database contacts are loaded in interface
            | numOfColumnsToUpload |
            | 1                    |
        Then user state should be 'dialer-preview'
        And user make a call
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        Then user state should be 'ready'
        And verify No calls are triggered when campaign 'dialer-preview'
        Then User logout with current session
        When User login to the platform as 'admin'
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @1014
    Scenario: Database Download
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then Download the Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And Deactivate the '0' database

    @1015
    Scenario: Database Delete
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        And user navigates to dialer
        Then select the dialer type 'power-preview'
        And save the changes in edit campaign
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        And Delete the Database
            | queue          | databaseCampaign | optionName | optionPhone1 | databaseIndex |
            | InboundQueue_1 | 1                | 0          | 1            | 0             |
        And User logout with current session
        When User login to the platform as 'Agent_1'
        And login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        Then user state should be 'ready'
        And verify No calls are triggered when campaign 'dialer-preview'

    @1018
    Scenario: Table Manager Create
        When Navigate to Database Manager
        Then Switch Tab to Table Manager
        And Create New Table
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |

    @1019
    Scenario: Table Manager Edit
        When Navigate to Database Manager
        When Switch Tab to Table Manager
        Then Select 'test_table' Table and edit
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |

    @1020
    Scenario: Table Manager Download
        When Navigate to Database Manager
        Then Switch Tab to Table Manager
        And search the table with name as 'test_table'
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |
        Then Download the Table

    @1021
    Scenario: Table Manager Flush Table
        When Navigate to Database Manager
        When Switch Tab to Table Manager
        Then Flush the 'test_table' Table
            | browseFile          | noOfRecord |
            | fixtures/search.csv | 3          |

    # @1013
    # Scenario: Database Edit
    #     When Navigate to Database Manager
    #     And Edit the 'random' Database
    #         | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
    #         | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
    #     And Deactivate the '0' database