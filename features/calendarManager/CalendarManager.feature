@calendarManager
Feature: Calendar Manager

    # Background: Login To the application
    #     Given User login to the platform as 'admin'
    #     Then clean active calls

    @1339
    Scenario: Calendar Manager - Events - Create Event
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |

    @1340
    Scenario: Calendar Manager - Events - Edit Event
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        And search the created event
        Then user edit an event with following configurations:
            | preEvent | postEvent |
            | 15       | 15        |

    @1342
    Scenario: Calendar Manager - Calendars - Create Calendar
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref  |
            | GOCalendar   | 09:00     | 09:30   | test |

    @1341
    Scenario: Calendar Manager - Events - Delete Event
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        And search the created event
        Then user removes an event

    @1344
    Scenario: Calendar Manager - Calendars - Edit Event
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref  |
            | GOCalendar   | 09:00     | 09:30   | test |
        And search the created calendar
        Then user edit a calendar with following configurations:
            | temporalExclusion | exclusionStartTime | exclusionEndTime |
            | true              | 08:00              | 10:00            |

    @1345
    Scenario: Calendar Manager - Calendars - Delete Calendar
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | GOEvent   | 09:00     | 09:30   | 15       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | startTime | endTime | ref  |
            | GOCalendar   | 09:00     | 09:30   | test |
        And search the created calendar
        And user removes a calendar
        When user selects the calendar 'events' tab
        And search the created event
        Then user removes an event

    @7045
    Scenario: Calendar Manager - Make reservation for Tomorrow
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | Event#1   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | ref           | startTime | endTime |
            | Calendar#1   | CalendarRef_1 | 09:00     | 20:00   |
        When user selects script builder from menu
        And user create a new script for 'dayCalendar'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | databaseName     | New Leads Outbound 1 |
            | defaultPageName  | 1                    |
        When user add '1' element 'calendar' to the script
        Then user selects calendar
        And configure the items in calendar with following configurations:
            | title           | Calendar |
            | requiredBooking | 1        |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        Then In the Scripts tab, select the script created previously
        When user select Calendar element
        Then user book a event in a calendar at '11' with desc as 'description' after '1' day
        Then user select the Back option
        And user validate the script
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        Then user select the Visualization tab
        And user search for calendar 'Calendar#1'
        Then user validates scheduled reservation with following information:
            | days | hour  |
            | 1    | 11:00 |
        When user access the Calendar monitor menu
        Then user search the calendar by using following configurations:
            | ownerType    | OutBound Campaigns |
            | campaign     | OutboundCampaign_1 |
            | timeInterval | Custom Interval    |
            | endDate      | Tomorrow           |
        And user validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_1 |
            | bookings        | 1             |
            | bookedHours     | 00:30:00      |
            | availableHours  | 21:30:00      |
            | percentOccupied | 2.27%         |

    @7049
    Scenario: Calendar Manager - Make reservation for Tomorrow, Day after Tomorrow and Next Month
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | Event#2   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | ref           | startTime | endTime |
            | Calendar#2   | CalendarRef_2 | 09:00     | 20:00   |
        When user selects script builder from menu
        And user create a new script for 'monthCalendar'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | databaseName     | New Leads Outbound 1 |
            | defaultPageName  | 1                    |
        When user add '1' element 'calendar' to the script
        Then user selects calendar
        And configure the items in calendar with following configurations:
            | title           | Calendar2 |
            | requiredBooking | 1         |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899547643' in ready state
        And user make a call
        Then In the Scripts tab, select the script created previously
        When user select Calendar element
        Then user book a event in a calendar at '10' with desc as 'Description for tomorrow' after '1' day
        Then user book a event in a calendar at '11' with desc as 'Description for day after tomorrow' after '2' day
        And user book a event in a calendar at '12' with desc as 'Description for next month' after 'month' day
        Then user select the Back option
        And user validate the script
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        Then user select the Visualization tab
        And user search for calendar 'Calendar#2'
        Then user validates scheduled reservation with following information:
            | days | hour  |
            | 1    | 10:00 |
        Then user validates scheduled reservation with following information:
            | days | hour  |
            | 2    | 11:00 |
        Then user validates scheduled reservation with following information:
            | days  | hour  |
            | month | 12:00 |
        When user access the Calendar monitor menu
        Then user search the calendar by using following configurations:
            | ownerType    | OutBound Campaigns |
            | campaign     | OutboundCampaign_1 |
            | timeInterval | Next Month         |
        And user validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_2 |
            | bookings        | 1             |
            | bookedHours     | 00:30:00      |
            | availableHours  | 340:30:00     |
            | percentOccupied | 0.15%         |

    @7046
    Scenario: Calendar Manager - Make reservation for Tomorrow, Day after Tomorrow and Next Week
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | Event#3   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | ref           | startTime | endTime |
            | Calendar#3   | CalendarRef_3 | 09:00     | 20:00   |
        When user selects script builder from menu
        And user create a new script for 'weekCalendar'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | databaseName     | New Leads Outbound 1 |
            | defaultPageName  | 1                    |
        When user add '1' element 'calendar' to the script
        Then user selects calendar
        And configure the items in calendar with following configurations:
            | title           | Calendar3 |
            | requiredBooking | 1         |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '9899577643' in ready state
        And user make a call
        Then In the Scripts tab, select the script created previously
        When user select Calendar element
        Then user book a event in a calendar at '10' with desc as 'Description for tomorrow' after '1' day
        Then user book a event in a calendar at '11' with desc as 'Description for day after tomorrow' after '2' day
        And user book a event in a calendar at '12' with desc as 'Description for next week' after 'week' day
        Then user select the Back option
        And user validate the script
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        Then user select the Visualization tab
        And user search for calendar 'Calendar#3'
        Then user validates scheduled reservation with following information:
            | days | hour  |
            | 1    | 10:00 |
        Then user validates scheduled reservation with following information:
            | days | hour  |
            | 2    | 11:00 |
        Then user validates scheduled reservation with following information:
            | days | hour  |
            | week | 12:00 |
        When user access the Calendar monitor menu
        Then user search the calendar by using following configurations:
            | ownerType    | OutBound Campaigns |
            | campaign     | OutboundCampaign_1 |
            | timeInterval | This Week          |
        And user validate that the calendar and the corresponding bookings are displayed correctly:
            | calendarRef     | CalendarRef_3 |
            | bookings        | 2             |
            | bookedHours     | 01:00:00      |
            | availableHours  | 76:00:00      |
            | percentOccupied | 1.3%          |

    @7058
    Scenario: Full Access - Delete Reservation - True then False
        Given User login to the platform as 'Supervisor_1'
        Then clean active calls
        When user access profile manager menu
        When select the 'Full Access' profile
        When on the section Calendar Permissions, configure the following data
            | deleteReservation       | true  |
            | editReservation         | false |
            | editAndCloseReservation | false |
        When user save the changes
        When user access the Calendar manager menu
        Then user selects the calendar 'events' tab
        And user deletes all previous events
        Then user selects add event option
        When user validates form without filling in the required fields
        When user creates an event with following configurations:
            | eventName | startTime | endTime | duration |
            | Event#3   | 09:00     | 18:00   | 30       |
        Then user selects the calendar 'calendars' tab
        When user deletes all previous calendars
        Then user selects add calendar option
        And user validates calendar form without filling in the required fields
        When user creates a calendar with following configurations:
            | calendarName | ref           | startTime | endTime |
            | Calendar#3   | CalendarRef_3 | 09:00     | 20:00   |
        When user selects script builder from menu
        And user create a new script for 'weekCalendar'
            | campaignName     | OutboundCampaign_1   |
            | inboundQueueName | InboundQueue_1       |
            | databaseName     | New Leads Outbound 1 |
            | defaultPageName  | 1                    |
        When user add '1' element 'calendar' to the script
        Then user selects calendar
        And configure the items in calendar with following configurations:
            | title           | Calendar3 |
            | requiredBooking | 0         |
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8517654530' in ready state
        And user make a call
        Then In the Scripts tab, select the script created previously
        When user select Calendar element
        Then user book a event in a calendar at '10' with desc as 'Description for tomorrow' after '1' day
        And user select the reservation previously made
        Then validate that the Supervisor is able to delete the reservation
        And user select the delete option
        Then user select the Back option
        And user validate the script
        When user disconnects the call
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        Then user select the Visualization tab
        And user search for calendar 'Calendar#1'
        Then user validate that the scheduled reservation previously made is not displayed on the calendar
        When user access profile manager menu
        When select the 'Full Access' profile
        When on the section Calendar Permissions, configure the following data
            | DeleteReservations       | false |
            | EditReservations         | false |
            | EditAndCloseReservations | false |
        When user save the changes
        When user logout from the platform
        When User login to the platform as 'Supervisor_1'
        When login to Voice Channel with '100' extension
        And user selects 'OutboundCampaign_1' campaign
        When user dial the number '8517654530' in ready state
        And user make a call
        Then In the Scripts tab, select the script created previously
        When user select Calendar element
        When user book a event in a calendar at '10' with desc as 'description' after '1' day
        And user select the reservation previously made
        # Then validate that the Supervisor is not able to delete the reservation
        Then user select the Back option
        And user validate the script
        When user disconnects the call
        And user state should be 'outcomes'
        And user submits 'Call Again Later' outcome and select 'Ok' outcome name
        When user access the Calendar manager menu
        Then user select the Visualization tab
        When user search for calendar 'Calendar#1'
        Then user validate that the scheduled reservation is correctly displayed on the calendar


    @7097
    Scenario: Wallboard - verifying ready Agents
        Given User login to the gocontact as 'Supervisor_2'
        Then clean active calls
        When user navigates to voice manager
        Then user edits the campaign 'OutboundCampaign_1'
        When user navigates to dialer
        Then select the dialer type 'manual'
        And save the changes in edit campaign
        When user login to the platform with 'Agent_2' account in 'second' window
        And login to Voice Channel with '100' extension in 'second' window
        And user selects 'OutboundCampaign_1' campaign in 'second' window
        When user navigate to wallborad
        And user selects the template 'Template_1'
        Then In Outbound section, verify the following data:
            | agentsReady  | agentsTalking  | agentsOutcomes  | agentsBreaks  |
            | 1            | 0              | 0               | 0             |
        When user login to the platform with 'Agent_3' account in 'third' window
        And login to Voice Channel with '100' extension in 'third' window
        And user selects 'OutboundCampaign_2' campaign in 'third' window
        When user navigate to wallborad
        And user selects the template 'Template_1'
        Then In Outbound section, verify the following data:
            | agentsReady  | agentsTalking  | agentsOutcomes  | agentsBreaks  |
            | 2            | 0              | 0               | 0             |
        