@dialerControl
Feature: Dialer Control

    Background: Login
        Given User login to the platform as 'admin'
        Then clean active calls
        And let user reset the database
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'

    @6251
    Scenario: Database with associated Agent/Group - Exclusive Mode - Agent Available
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_1' campaign in 'third' window
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then manage assignments in database manager
            | type   | name      |
            | Agents | Agent One |
        And activate the assignment as 'exclusive'
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 3                | 0          | 1            |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And user state should be 'talking' in 'second' window
        And let user wait for '5' seconds
        When user disconnects the call in 'second' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'second' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound           |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One          |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @6250
    Scenario: Database with associated Agent/Group - Preferred Mode - Agent Unavailable
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user dial the number '9287429383' in ready state in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        And Navigate to Database Manager
        Then Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then manage assignments in database manager
            | type   | name      |
            | Agents | Agent One |
        And activate the assignment as 'preferred'
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 3                | 0          | 1            |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_1' campaign in 'third' window
        And user state should be 'talking' in 'third' window
        And let user wait for '5' seconds
        When user disconnects the call in 'third' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'third' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound         |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent Two        |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | Agent_2            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @6249
    Scenario: Database with associated Agent/Group - Preferred Mode - Agent Available
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_1' campaign in 'third' window
        When Navigate to Database Manager
        And Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then manage assignments in database manager
            | type   | name      |
            | Agents | Agent One |
        And activate the assignment as 'preferred'
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 3                | 0          | 1            |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And let user wait for '5' seconds
        And user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'second' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound         |
            | campaigns | OutboundCampaign_1 |
            | agents    | Agent One        |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | Agent_1            |
            | callOutcome | Ok                 |
            | owner       | OutboundCampaign_1 |
            | termReason  | AGENT              |
        Then Navigate to Database Manager
        And Deactivate the '0' database

    @6252
    Scenario: Database with associated Agent/Group - Exclusive Mode - Agent Unavailable
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        And user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user dial the number '9287429383' in ready state in 'second' window
        When user login to the platform with 'Agent_2' account in 'third' window
        And user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'power'
        And save the changes in edit campaign
        And Navigate to Database Manager
        Then Create Database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 1                | 0          | 1            |
        Then manage assignments in database manager
            | type   | name      |
            | Agents | Agent One |
        And activate the assignment as 'exclusive'
        Then load the database
            | queue          | browseFile            | numOfColumnsToUpload | databaseCampaign | optionName | optionPhone1 |
            | InboundQueue_1 | fixtures/database.csv | 1                    | 3                | 0          | 1            |
        When user navigates to dialer control menu
        And user selects 'OutboundCampaign_1' campaign in dialer control
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_1' campaign in 'third' window
        And let user wait for '5' seconds
        And user state should be 'ready' in 'third' window
        When user navigate to crm
        And user search the call by using following configurations:
            | channel   | Outbound         |
            | campaigns | OutboundCampaign_1 |
            | agents    | no               |
        And validate that the call is registered as per following configurations:
            | phoneNumber | 910261828          |
            | agentName   | Dialer             |
            | callOutcome | Drop               |
            | owner       | OutboundCampaign_1 |
            | termReason  | DIALER             |
        Then Navigate to Database Manager
        And Deactivate the '0' database
