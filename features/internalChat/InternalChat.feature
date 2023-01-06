@internalChat
Feature: Internal chat tests

    @858
    Scenario: Agent - No access
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user selects 'no' chat access
        And user save the settings
        And I re-login using 'Agent_1' account
        And user select messaging option
        Then user should not have chat access

    @859
    Scenario: Agent - Simple access
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user selects 'simple' chat access
        And user save the settings
        Then verify admin is online for agent account

    @860
    Scenario: Agent - Super access
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user selects 'supervisor' chat access
        And user save the settings
        And I re-login using 'Agent_1' account
        Then verify agent is online for another agent account

    @861
    Scenario: Send broadcast message - All
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user enables broadcast messages
        And user save the settings
        And I re-login using 'Agent_1' account
        And user selects send broadcast message option
        And user selects send broadcast message to all agent option
        And user verifies broadcast message is send to agent

    @862
    Scenario: Send broadcast message - Particular Agent
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user enables broadcast messages
        And user save the settings
        And I re-login using 'Agent_1' account
        And user selects send broadcast message option
        And user selects send broadcast message to particular 'admin' agent option
            | subject |  |
            | message |  |
        And user verifies broadcast message is send to agent

    @863
    Scenario: Send private message
        Given User login to the platform as 'admin'
        Then clean active calls
        When user access profile manager menu
        And user selects 'agent' tab
        And user selects 'supervisor' chat access
        And user save the settings
        And user login to the platform with 'Agent_1' account in 'second' window
        And user select messaging option in 'second' window
        And user selects user from users tab in 'second' window
        And user send a message in 'second' window
        Then user should see the sent message

        