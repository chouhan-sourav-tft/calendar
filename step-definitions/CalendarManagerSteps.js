const { When, Then } = require('@cucumber/cucumber');
const { CalendarManager } = require('../page-objects/CalendarManager.po');
const { ScriptBuilder } = require('../page-objects/ScriptBuilder.po');
const dayjs = require('dayjs');
const calendarManager = new CalendarManager();
const scriptBuilder = new ScriptBuilder();
let eventName = '';
let calendarName = '';
global.calendarName = '';

When('user access the Calendar manager menu', async () => {
  await calendarManager.navigateToCalendarManagerMenu();
});

Then('user selects the calendar {string} tab', async (tabName) => {
  await calendarManager.selectTab(tabName);
});

Then('user selects add event option', async () => {
  await calendarManager.clickToAddEvent();
});

When('user validates form without filling in the required fields', async () => {
  await calendarManager.validateForm();
});

When(
  'user creates an event with following configurations:',
  async (datatable) => {
    let eventData = '';
    datatable.hashes().forEach((element) => {
      global.eventName = eventName = element.eventName + new Date().getTime();
      eventData = {
        eventName: eventName,
        startTime: element.startTime,
        endTime: element.endTime,
        duration: element.duration,
      };
    });
    await calendarManager.createEvent(eventData);
  }
);

When('user deletes all previous events', async () => {
  await calendarManager.deleteAllPreviousEvents();
});

When('search the created event', async () => {
  await calendarManager.searchEvent(eventName);
});

When('user edit an event with following configurations:', async (datatable) => {
  let eventData = '';
  datatable.hashes().forEach((element) => {
    eventData = {
      eventName: eventName,
      preEvent: element.preEvent,
      postEvent: element.postEvent,
    };
  });
  await calendarManager.editEvent(eventData);
});

When('user creates a calendar with following configurations:', async (datatable) => {
  let calendarData = '';
  datatable.hashes().forEach((element) => {
    global.calendarName = calendarName = element.calendarName + new Date().getTime();
    if (!element.eventName) {
      element.eventName = eventName;
    }
    calendarData = {
      calendarName: calendarName,
      calendarRef: element.ref,
      startTime: element.startTime,
      endTime: element.endTime,
      eventName: element.eventName
    };
  });
  await calendarManager.addCalendar(calendarData);
});

Then('user selects add calendar option', async () => {
  await calendarManager.clickToAddCalendar();
});

Then('user validates calendar form without filling in the required fields', async () => {
  await calendarManager.validateCalendar();
});

When('user deletes all previous calendars', async () => {
  await calendarManager.deleteAllPreviouscalendar();
});

When('user removes an event', async () => {
  await calendarManager.removeEvent();
});

When('search the created calendar', async () => {
  await calendarManager.searchCalendar(calendarName);
});

When('user edit a calendar with following configurations:', async (datatable) => {
  let eventData = '';
  datatable.hashes().forEach((element) => {
    eventData = {
      temporalExclusion: element.temporalExclusion,
      exclusionStartTime: element.exclusionStartTime,
      exclusionEndTime: element.exclusionEndTime
    };
  });
  await calendarManager.editCalendar(eventData);
});

When('user removes a calendar', async () => {
  await calendarManager.removeCalendar();
});

Then('user should see events', async () => {
  await calendarManager.verifyEventList();
});

When('user access the Calendar monitor menu', async () => {
  await calendarManager.navigateToCalendarMonitorMenu();
});

Then('user search the calendar by using following configurations:', async (calendarDetails) => {
  let searchCalendarObject = calendarDetails.rowsHash();
  if (!searchCalendarObject.startDate)
    searchCalendarObject.startDate = dayjs().format('YYYY-MM-DD');
  if (!searchCalendarObject.endDate) {
    searchCalendarObject.endDate = dayjs().format('YYYY-MM-DD');
  }
  await calendarManager.searchCalendarDetails(searchCalendarObject);
});

When('user validate that the calendar and the corresponding bookings are displayed correctly:', async (dataTable) => {
  const result = dataTable.rowsHash();
  if (!result.calendarName) {
    result.calendarName = calendarName;
  }
  await calendarManager.searchBooking(result.calendarName);
  await calendarManager.validateBookings(result);
});

Then('User select time slot at {string} hours after {int} day and verify error displayed',async(hour,days)=>{
  await calendarManager.selectSlotAndVerifyError(hour,days);
});

When('user validates scheduled reservation with following information:', async(dataTable)=>{
  let bookingDetails = [];
  dataTable.hashes().forEach((element) => {
    bookingDetails.push({
      'hour': element.hour,
      'days': element.days
    });
  });
  for(let i=0; i<bookingDetails.length; i++){
    await calendarManager.searchReservationCalendar(calendarName);
    await calendarManager.validateScheduledReservation(bookingDetails[i]);
  }
});

Then('reset active variables', async () =>{
  eventName = '';
  calendarName = '';
  global.calendarName = '';
});

Then('user selects calendar', async()=>{
  await calendarManager.selectCalendarElement();
});

When ('user select Calendar element', async() => {
  await calendarManager.clickScriptTagCalendar();
  // await calendarManager.validSomeData();
  console.log('user clicks on calendar');
});

Then('user select the Back option', async() => {
  await scriptBuilder.backPage();
});

Then('user select the Visualization tab', async() => {
  await calendarManager.clickVisualizationTab();
});

When('user search for calendar {string}', async(calendar) => {
  await calendarManager.searchCalendarBox(calendar);
});

When('user validate that the scheduled reservation is correctly displayed on the calendar', async() => {
  await calendarManager.validateReservation();
});

When('select the {string} profile', async(profileAccess)=>{
  await calendarManager.clickProfileSelect();
  await calendarManager.inputProfileSelect(profileAccess);
});

When('on the section Calendar Permissions, configure the following data',async (table) => {
  const calenderPermissions = table.rowsHash();
  await calendarManager.setCalendarPermissions(calenderPermissions);
});

When('user save the changes', async()=>{
  await calendarManager.saveSetting();
});

Then('user select the reservation previously made', async() => {
  await calendarManager.selectPreviousReservation();
});

When('validate that the Supervisor is able to delete the reservation', async() => {
  await calendarManager.validateDeleteButton();
});

Then('user select the delete option', async() => {
  await calendarManager.deleteReservation();
})

When('validate that the scheduled reservation previously made is not displayed on the calendar', async() => {
  await calendarManager.validateDeletedReservation();
})

Then('user navigate to wallborad', async() => {
  await calendarManager.navigateWallboard();
})

Then('user selects the template {string}', async(template) => {
  await calendarManager.selectTemplate(template);
})

When('In Outbound section, verify the following data:', async(datatable) => {
  let wallboardData = '';
  datatable.hashes().forEach((element) => {
    
    wallboardData = {
      agentsReady: element.agentsReady,
      agentsTalking: element.agentsTalking,
      agentsOutcomes: element.agentsOutcomes,
      agentsBreaks: element.agentsBreaks
    };
  });
  await calendarManager.verifyOutboundSectionData(wallboardData);
})