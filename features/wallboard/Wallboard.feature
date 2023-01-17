@wallboard
Feature: Wallboard

    Background: Login To the application
        Given User login to the platform as 'Supervisor_1'
        Then clean active calls
        When user navigate to callbacks manager
        And user delete all scheduled callback

    @7095
    Scenario: Wallboard - Outbound Call(s)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the campaign 'OutboundCampaign_4'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        When user dial the number '8094217411' in ready state in 'second' window
        When user make a call in 'second' window
        Then user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' windowc
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        When user access the wallboard menu
        And user select 'Template_1' from list
        Then verify 'Outbound' section data with following configurations:
            | callsMade | answered | answeredPercent | TMA      |
            | 36        | 36       | 100%            | 00:00:10 |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        When user dial the number '8094217412' in ready state in 'third' window
        When user make a call in 'third' window
        Then user state should be 'talking' in 'third' window
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '300' seconds
        And refresh the page
        When user access the wallboard menu
        And user select 'Template_1' from list
        Then verify 'Outbound' section data with following configurations:
            | callsMade | answered | answeredPercent | TMA      |
            | 37        | 37       | 100%            | 00:00:10 |
        Then close the 'second' window session
        Then close the 'third' window session
    
    @7106
    Scenario: Wallboard - Inbound Call(s)
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'InboundQueue_3' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501604         | 8094217411   | 1        |
        And let user wait for '5' seconds
        Then user state should be 'talking' in 'second' window
        And client Hangup the '0' call via API
        And user state should be 'outcomes' in 'second' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'second' window
        When user access the wallboard menu
        And user select 'Template_1' from list
        Then verify 'Inbound' section data with following configurations:
            | callsMade | answered | answeredPercent | TMA      |
            | 12        | 12       | 100%            | 00:00:10 |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'InboundQueue_4' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_Data |
            | 300501605         | 8094217411   | 1        |
        And let user wait for '5' seconds
        Then user state should be 'talking' in 'third' window
        And client Hangup the '0' call via API
        And user state should be 'outcomes' in 'third' window
        And user submits 'Customer Hangup' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '10' seconds
        And refresh the page
        When user access the wallboard menu
        And user select 'Template_1' from list
        Then verify 'Inbound' section data with following configurations:
            | callsMade | answered | answeredPercent | TMA      |
            | 2         | 2        | 100%            | 00:00:10 |
        Then close the 'second' window session
        Then close the 'third' window session

    @7121
    Scenario: Wallboard - New tab - Force Logout
        When login to Voice Channel with '100' extension
        When user selects 'No' campaign with 'InboundQueue_1' queue in 'same' window
        When user access the wallboard menu
        When user select 'Template_1' from list
        When user click on option open in new tab '2'
        When user login to the platform with 'Supervisor_2' account in 'second' window
        When User navigate to dashboard page in 'second' window
        When user selects the 'Voice Inbound' tab in 'second' window
        When user selects the agent tab in 'second' window
        # When verify 'Supervisor One' is in the list in voice inbound tab in 'ready' state in 'second' window
        When User select the action tab in 'second' window
        When User click on Force Logout
        When verify that agent is succesfully Force logout

    @7098
    Scenario: Wallboard - Outbound - Agents (Talking)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the campaign 'OutboundCampaign_4'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        When user dial the number '6801111111' in ready state in 'second' window
        When user make a call in 'second' window
        Then user state should be 'talking' in 'second' window
        When user access the wallboard menu
        And user select 'Template_1' from list
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 0     | 1       | 0       | 0     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        When user dial the number '6801111112' in ready state in 'third' window
        When user make a call in 'third' window
        Then user state should be 'talking' in 'third' window
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 0     | 2       | 0       | 0     |
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '2' seconds
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 1     | 1       | 0       | 0     |
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 2     | 0       | 0       | 0     |
        Then close the 'third' window session

    @7099
    Scenario: Wallboard - Outbound - Agents (Outcomes)
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        Then user edits the campaign 'OutboundCampaign_4'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        When user dial the number '6801111111' in ready state in 'second' window
        When user make a call in 'second' window
        Then user state should be 'talking' in 'second' window
        When user disconnects the call in 'second' window
        And user state should be 'outcomes' in 'second' window
        When user access the wallboard menu
        And user select 'Template_1' from list
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 0     | 0       | 1       | 0     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        When user dial the number '6801111112' in ready state in 'third' window
        When user make a call in 'third' window
        Then user state should be 'talking' in 'third' window
        When user disconnects the call in 'third' window
        And user state should be 'outcomes' in 'third' window
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 0     | 0       | 2       | 0     |
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'second' window
        And let user wait for '2' seconds
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 1     | 0       | 1       | 0     |
        Then user submits 'Call Again Later' outcome and select 'Ok' outcome name in 'third' window
        And let user wait for '5' seconds
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 2     | 0       | 0       | 0     |
        Then close the 'third' window session

    @7100
    Scenario: Wallboard - Outbound - Agents (Breaks)
        When Access the 'Users & Groups' menu
        And Select 'Group_1' group
        And user deletes all previous breaks
        When Create a new break with following configurations:
            | breakName | auth  | startTime | endTime | maxTime |
            | Break_AT  | false | 00:00     | 23:00   | 60      |
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_3'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_3' campaign with '' queue in 'second' window
        And request the break with auth 'false' in 'second' window
        When user access the wallboard menu
        And user select 'Template_1' from list
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 0     | 0       | 0       | 1     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_4' campaign with '' queue in 'third' window
        And request the break with auth 'false' in 'third' window
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 0     | 0       | 0       | 2     |
        And request the break with auth 'false' in 'second' window
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 1     | 0       | 0       | 1     |
        And request the break with auth 'false' in 'third' window
        Then verify 'Outbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 2     | 0       | 0       | 0     |
        Then close the 'third' window session

    @7111
    Scenario: Wallboard - Inbound - Agents (Ready)
        When user login to the platform with 'Agent_1' account in 'second' window
        Then login to Voice Channel with '100' extension in 'second' window
        And user selects '' campaign with 'InboundQueue_3' queue in 'second' window
        Then user state should be 'ready' in 'second' window
        When user access the wallboard menu
        And user select 'Template_1' from list
        Then verify 'Inbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 1     | 0       | 0       | 0     |
        When user login to the platform with 'Agent_2' account in 'third' window
        Then login to Voice Channel with '100' extension in 'third' window
        And user selects '' campaign with 'InboundQueue_4' queue in 'third' window
        Then user state should be 'ready' in 'third' window
        Then verify 'Inbound' section data with following configurations:
            | ready | talking | outcome | break |
            | 2     | 0       | 0       | 0     |
        Then close the 'third' window session

    @7119
    Scenario: Wallboard
        When user access the wallboard menu
        Then select the option 'New Template'
        And user fill the modal with the following information:
            | templateName       | templateType      |
            | Template_Protected | Global Protected  |
        When user login to the platform with 'Supervisor_2' account in 'second' window
        When user access the wallboard menu in 'second' window
        And user check that Supervisor#2 can access previously created template in 'second' window
        Then user click to edit the first section and fill title of form 'Test#1' in 'second' window
        When user click on Save in 'second' window
        Then user verify the error: 'Cannot change Global Protected Template' in 'second' window
        And user click to Delete in 'second' window
        Then user verify the error: 'Cannot delete Global Protected Template' in 'second' window

    @7109
    Scenario: Wallboard
        When user login to the platform with 'Agent_1' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign with 'InboundQueue_1' queue in 'second' window
        When user dial the number '999888771' in ready state in 'second' window
        And user state should be 'manual-preview' in 'second' window
        And client makes a call via API with following configurations:
            | callerDestination | callerCaller | did_data |
            | 300501602         | 999888777    | 1        |
        And let user wait for '5' seconds in 'second' window
        And client Hangup the '0' call via API
        And let user wait for '300' seconds
        And refresh the page
        When user access the wallboard menu in 'first' window
        And user select 'Template_1' from list
        Then verify 'Inbound' section data with following configurations:
            | abandoned | abandonedPercent |
            | 11        | 47.83            |