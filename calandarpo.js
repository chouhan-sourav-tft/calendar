const { BaseAction } = require('../setup/baseAction');
const { assert } = require('chai');
const dayjs = require('dayjs');

exports.CalendarManager = class CalendarManager extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    calendarMainMenu: '//a[@id="menu_9"]',
    calendarManagerMenu: '//a[@id="menu_40"]',
    calendarTab: '#calendar_btn_tab1',
    addEvent: '.add-event-btn',
    eventName: 'input[data-translate="calendarManager.eventForm.name"]',
    eventStartTime: 'input[data-translate="calendarManager.eventForm.allowedTime.startTime"]',
    eventEndTime: 'input[data-translate="calendarManager.eventForm.allowedTime.endTime"]',
    eventDuration: 'input[name="eventDuration"]',
    eventPreTime: 'input[name="preEventTime"]',
    eventPostTime: 'input[name="postEventTime"]',
    eventSave: '#eventSaveBtn',
    validationError: '//div[@id="newContentdiv"]//p[contains(text(),"Check the fields marked with error.")]',
    eventSaveConfirmation: '#modal-event-save-confirmation',
    saveConfirmButton: '.save-event-confirm-btn',
    successMessage: '.bigBox.animated.fadeIn.fast',
    deleteEventButton: '.event-table-container table tbody tr:first-child .calendar-event-remove-btn',
    totalEventList: '.calendar-event-remove-btn',
    confirmDeleteButton: '.remove-event-confirm-btn',
    inputSearch: '.event-table-container input[data-translate="tbl-search"]',
    editEventButton: '.event-table-container table tbody tr:first-child .calendar-event-edit-btn',
    addCalendarButton: '.add-calendar-btn',
    calendarNameTextBox: 'input[name="calendar_form_name"]',
    calendarRefTextBox: 'input[name="calendar_form_ref"]',
    calendarStartTimeTextBox: 'input[name="calendar_form_start_time"]',
    calendarEndTimeTextBox: 'input[name="calendar_form_end_time"]',
    calendarSaveButton: '#calendar_form_save',
    calendarSaveModal: '#add-calendar-modal > div',
    calendarSaveConfirmButton: '#add-calendar-confirm',
    calendarEventsTextBox: '[data-translate="calendarManager.calendarForm.calendarEvents"] ~div input',
    addCalendarValidationMessage: '.calendar_form_ctn [data-translate*="calendarManager.calendarForm.validationError"]',
    deleteCalendar: '.calendar-btn-remove',
    calendarConfirmDeleteButton: '#remove-calendar-confirm',
    calendarSearchTextBox: '#DataTables_Table_1_filter input[data-translate="tbl-search"]',
    editCalendarButton: 'button.calendar-btn-edit',
    temporalExclusionCheckBox: 'input[name="temporal_exclusions"]',
    mondayExclusionButton: '[name="exclusion_day_monday"]',
    tuesdayExclusionButton: '[name="exclusion_day_tuesday"]',
    exclusionStartTime: '[name="exclusion_start_time"]',
    exclusionEndTime: '[name="exclusion_end_time"]',
    editCalendarConfirmButton: '#edit-calendar-confirm',
    addButton: '.temporal_exclusions_weekly .add-exclusion',
    calendarMonitorMenu: '//a[@id="menu_41"]',
    ticketQueue: '#s2id_tickets_select input',
    searchButton: 'button[type="submit"] span[data-translate="search"]',
    startDate: '[id="start_date"]',
    endDate: '[id="end_date"]',
    calendarSearch: '#calendar-monitor-table_filter input',
    calendarName: '#calendar-monitor-table tbody td:nth-child(1)',
    calendarRef: '#calendar-monitor-table tbody td:nth-child(2)',
    totalBooking: '#calendar-monitor-table tbody td:nth-child(3)',
    bookedHours: '#calendar-monitor-table tbody td:nth-child(4)',
    availableHours: '#calendar-monitor-table tbody td:nth-child(5)',
    percentageOccupied: '#calendar-monitor-table tbody td:nth-child(6)',
    scriptTagCalendarButton: '(//form//button[contains(@class,"calendar-btn-link")])[last()]',
    selectDay: '[class="fc-resourceTimeGridDay-button fc-button fc-button-primary"]',
    clickNext: '[aria-label="next"]',
    visualizationTab: '#calendar_btn_tab3',
    visualizationSearchBar: 'input[name="calendars_filter"]',
    verifyReservation: '[class="fc-time-grid-event fc-event fc-start fc-end preparation-times fc-draggable fc-resizable"]',
    ownerTypeOutbound: '[class="radio fscontact-outbound-channel"]',
    selectCampaign: '[id="s2id_campaigns_select"]',
    selectInput: '//*[@id="s2id_autogen1_search"]',
    timeInterval: '[id="custom_days"]',




  };

  /**
   * Function to goto calendar manager menu
   * @return {void} Nothing
   */
  async navigateToCalendarManagerMenu() {
    await this.mouseOver(this.elements.calendarMainMenu);
    await this.waitForSelector(this.elements.calendarManagerMenu);
    await this.click(this.elements.calendarManagerMenu);
    await this.waitForSelector(this.elements.calendarTab);
  }

  /**
   * function to select tabs in calendar manager
   * @param {string} tabName - tab name to select
   * @return {void} Nothing
   */
  async selectTab(tabName) {
    let tabLocator = `span[data-translate='calendarManager.tab.${tabName}']`;
    console.log('tabLocator=', tabLocator);
    await this.waitForSelector(tabLocator);
    await this.click(tabLocator);
  }

  /**
   * function to click add event
   * @return {void} Nothing
   */
  async clickToAddEvent() {
    await this.waitForSelector(this.elements.addEvent);
    await this.click(this.elements.addEvent);
    await this.waitForSelector(this.elements.eventName);
  }

  /**
   * function to validate form without filling required field
   * @return {void} Nothing
   */
  async validateForm() {
    await this.waitForSelector(this.elements.eventSave);
    await this.click(this.elements.eventSave);
    await this.waitForSelector(this.elements.validationError);
  }

  /**
   * function to create event
   * @param {object} eventData - data of event
   * @param {string} eventData.eventName - Event name
   * @param {string} eventData.startTime - Event start time
   * @param {string} eventData.endTime - Event end time
   * @param {string} eventData.duration - Event duration
   * @return {void} Nothing
   */
  async createEvent(eventData) {
    await this.waitForSelector(this.elements.eventName);
    await this.type(this.elements.eventName, eventData.eventName);
    await this.pressKey('Enter');
    await this.type(this.elements.eventStartTime, eventData.startTime);
    await this.pressKey('Enter');
    await this.type(this.elements.eventEndTime, eventData.endTime);
    await this.pressKey('Enter');
    await this.type(this.elements.eventDuration, eventData.duration);
    await this.pressKey('Enter');
    await this.click(this.elements.eventSave);
    await this.waitForSelector(this.elements.eventSaveConfirmation);
    await this.click(this.elements.saveConfirmButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * Function to delete all existing events
   * @return {void} Nothing
   */
  async deleteAllPreviousEvents() {
    await this.wait(2); //Wait to load all previous events
    if (await this.isVisible(this.elements.deleteEventButton)) {
      const totalEvents = await this.countElement(this.elements.totalEventList);
      for (var i = 0; i < totalEvents; i++) {
        await this.waitForSelector(this.elements.deleteEventButton);
        await this.click(this.elements.deleteEventButton);
        await this.waitForSelector(this.elements.confirmDeleteButton);
        await this.click(this.elements.confirmDeleteButton);
        await this.waitForSelector(this.elements.successMessage);
      }
    }
  }

  /**
   * function to search event
   * @param {string} eventName - Event name
   * @return {void} Nothing
   */
  async searchEvent(eventName) {
    await this.waitForSelector(this.elements.inputSearch);
    await this.type(this.elements.inputSearch, eventName);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.deleteEventButton);
  }

  /**
   * function to edit event
   * @param {object} eventData - data of event
   * @param {string} eventData.eventName - Event name
   * @param {string} eventData.preEvent - Event pre time
   * @param {string} eventData.postEvent - Event post time
   * @return {void} Nothing
   */
  async editEvent(eventData) {
    let editLocator = `button.calendar-event-edit-btn[data-event-name='${eventData.eventName}']`;
    await this.waitForSelector(editLocator);
    await this.click(editLocator);
    await this.waitForSelector(this.elements.eventPreTime);
    await this.type(this.elements.eventPreTime, eventData.preEvent);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.eventPostTime);
    await this.type(this.elements.eventPostTime, eventData.postEvent);
    await this.pressKey('Enter');
    await this.click(this.elements.eventSave);
    await this.waitForSelector(this.elements.eventSaveConfirmation);
    await this.click(this.elements.saveConfirmButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to create calendar
   * @param {object} calendarData - data of Calendar
   * @param {string} calendarData.calendarName - Calendar name
   * @param {string} calendarData.calendarRef - Calendar ref
   * @param {string} calendarData.startTime - Calendar start time
   * @param {string} calendarData.endTime - Calendar end time
   * @param {string} calendarData.eventName - Calendar event name
   * @return {void} Nothing
   */
  async addCalendar(calendarData) {
    await this.waitForSelector(this.elements.calendarNameTextBox);
    await this.type(this.elements.calendarNameTextBox, calendarData.calendarName);
    await this.click(this.elements.calendarRefTextBox);
    await this.type(this.elements.calendarRefTextBox, calendarData.calendarRef);
    await this.click(this.elements.calendarStartTimeTextBox);
    await this.type(this.elements.calendarStartTimeTextBox, calendarData.startTime);
    await this.click(this.elements.calendarEndTimeTextBox);
    await this.type(this.elements.calendarEndTimeTextBox, calendarData.endTime);
    await this.click(this.elements.calendarEventsTextBox);
    await this.type(this.elements.calendarEventsTextBox, calendarData.eventName);
    await this.pressKey('Enter');
    await this.click(this.elements.calendarSaveButton);
    await this.waitForSelector(this.elements.calendarSaveModal);
    await this.click(this.elements.calendarSaveConfirmButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to click add calendar
   * @return {void} Nothing
   */
  async clickToAddCalendar() {
    await this.waitForSelector(this.elements.addCalendarButton);
    await this.click(this.elements.addCalendarButton);
    await this.waitForSelector(this.elements.calendarNameTextBox);
  }

  /**
   * function to edit calendar
   * @param {object} eventData - data of calendar
   * @param {string} eventData.temporalExclusion - calendar name
   * @param {string} eventData.exclusionStartTime - calendar pre time
   * @param {string} eventData.exclusionEndTime - calendar post time
   * @return {void} Nothing
   */
  async editCalendar(eventData) {
    await this.waitForSelector(this.elements.editCalendarButton);
    await this.click(this.elements.editCalendarButton);
    await this.waitForSelector(this.elements.temporalExclusionCheckBox);
    if (eventData.temporalExclusion && !await this.isChecked(this.elements.temporalExclusionCheckBox)) {
      await this.click(this.elements.temporalExclusionCheckBox);
      await this.click(this.elements.mondayExclusionButton);
      await this.click(this.elements.tuesdayExclusionButton);
      await this.type(this.elements.exclusionStartTime, eventData.exclusionStartTime);
      await this.type(this.elements.exclusionEndTime, eventData.exclusionEndTime);
      await this.click(this.elements.addButton);
      await this.click(this.elements.calendarSaveButton);
      await this.click(this.elements.editCalendarConfirmButton);
    }
  }

  /**
   * function to validate form without filling required field
   * @return {void} Nothing
   */
  async validateCalendar() {
    await this.waitForSelector(this.elements.calendarSaveButton);
    await this.click(this.elements.calendarSaveButton);
    await this.countTotalElementsCompare(this.elements.addCalendarValidationMessage, 0);
  }

  /**
   * Function to delete all existing calendar
   * @return {void} Nothing
   */
  async deleteAllPreviouscalendar() {
    await this.wait(2); //Wait to load all previous events
    if (await this.isVisible(this.elements.deleteCalendar)) {
      const totalCalendar = await this.countElement(this.elements.deleteCalendar);
      for (var i = 0; i < totalCalendar; i++) {
        await this.waitForSelector(this.elements.deleteCalendar);
        await this.click(this.elements.deleteCalendar);
        await this.waitForSelector(this.elements.calendarConfirmDeleteButton);
        await this.click(this.elements.calendarConfirmDeleteButton);
        await this.waitForSelector(this.elements.successMessage);
      }
    }
  }

  /**
   * function to remove event
   * @return {void} Nothing
   */
  async removeEvent() {
    await this.waitForSelector(this.elements.deleteEventButton);
    await this.click(this.elements.deleteEventButton);
    await this.waitForSelector(this.elements.confirmDeleteButton);
    await this.click(this.elements.confirmDeleteButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to search calendar
   * @param {string} calendarName - calendar name
   * @return {void} Nothing
   */
  async searchCalendar(calendarName) {
    await this.waitForSelector(this.elements.calendarSearchTextBox);
    await this.type(this.elements.calendarSearchTextBox, calendarName);
    await this.pressKey('Enter');
    await this.waitForSelector(this.elements.deleteCalendar);
  }

  /**
   * function to remove calendar
   * @return {void} Nothing
   */
  async removeCalendar() {
    await this.waitForSelector(this.elements.deleteCalendar);
    await this.click(this.elements.deleteCalendar);
    await this.waitForSelector(this.elements.calendarConfirmDeleteButton);
    await this.click(this.elements.calendarConfirmDeleteButton);
    await this.waitForSelector(this.elements.successMessage);
  }

  /**
   * function to verify event list
   * @return {void} Nothing
   */
  async verifyEventList() {
    await this.waitForSelector(this.elements.totalEventList);
    await assert.isTrue(await this.countTotalElementsCompare(this.elements.totalEventList, 0));
  }

  /**
   * Function to goto calendar monitor menu
   * @return {void} Nothing
   */
  async navigateToCalendarMonitorMenu() {
    await this.mouseOver(this.elements.calendarMainMenu);
    await this.waitForSelector(this.elements.calendarMonitorMenu);
    await this.click(this.elements.calendarMonitorMenu);
  }

  /**
   * function to search calendar bookings
   * @param {object} calendarDetails - search data of bookings
   * @param {string} calendarDetails.endDate - search end data
   * @param {string} calendarDetails.ownerType - owner type
   * @param {string} calendarDetails.ticketQueue - ticket queue name
   * @param {string} calendarDetails.timeInterval - time interval
   * @param {string} calendarDetails.startDate - search end data
   * @return {void} Nothing
   */
  async searchCalendarDetails(calendarDetails) {
    // if (calendarDetails.outboundCampaigns) {
    //   await this.forceClick(this.elements.selectCampaign);
    //   await this.type(this.elements.selectInput, calendarDetails.outboundCampaigns);
    //   await this.pressKey('Enter');
    // }
    if (calendarDetails.startDate === 'Today') {
      calendarDetails.endDate = await dayjs().add(0, 'day').format('YYYY-MM-DD');
    } 
    if (calendarDetails.endDate === 'Tomorrow') {
      calendarDetails.endDate = await dayjs().add(1, 'day').format('YYYY-MM-DD');
    } else if (calendarDetails.endDate === 'This Week') {
      calendarDetails.endDate = await dayjs().add(6, 'day').format('YYYY-MM-DD');
    } else if (calendarDetails.endDate === 'Day After') {
      calendarDetails.endDate = await dayjs().add(2, 'day').format('YYYY-MM-DD');
    }

    if (calendarDetails.ownerType) {
      let locator = `//div[@id='owner_radio_div']//span[text()='${calendarDetails.ownerType}']`;
      await this.waitForSelector(locator);
      await this.click(locator);
    }
    if (calendarDetails.ticketQueue) {
      await this.waitForSelector(this.elements.ticketQueue);
      await this.type(
        this.elements.ticketQueue,
        calendarDetails.ticketQueue
      );
      await this.pressKey('Enter');
    }
    if (calendarDetails.timeInterval) {
      let locator = `//div[@id='time_interval_div']//span[text()='${calendarDetails.timeInterval}']`;
      await this.waitForSelector(locator);
      await this.click(locator);
    }

    if (calendarDetails.startDate) {
      await this.type(this.elements.startDate, calendarDetails.startDate);
      await this.pressKey('Enter');
    }
    if (calendarDetails.endDate) {
      await this.type(this.elements.endDate, calendarDetails.endDate);
      await this.pressKey('Enter');
    }
    await this.waitForSelector(this.elements.searchButton);
    await this.forceClick(this.elements.searchButton);
  }

  /**
   * function to search calendar name in search result list
   * @param {string} calendarName - calendar name
   * @return {void} Nothing
   */
  async searchBooking(calendarName) {
    await this.waitForSelector(this.elements.calendarSearch);
    await this.type(this.elements.calendarSearch, calendarName);
    await this.pressKey('Enter');
  }

  /**
   * function to validate calendar bookings
   * @param {object} calendarDetails - booking data
   * @param {string} calendarDetails.calendarName - calendar Name
   * @param {string} calendarDetails.calendarRef - calendar Ref 
   * @param {string} calendarDetails.bookings - total bookings
   * @param {string} calendarDetails.bookedHours - number of booked hours
   * @param {string} calendarDetails.availableHours - number of available hours
   * @param {string} calendarDetails.percentOccupied -percentage occupied
   * @return {void} Nothing
   */
  async validateBookings(calendarDetails) {
    //wait for latest call to load
    await this.wait(2);
    await this.waitForSelector(this.elements.calendarName);
    if (calendarDetails.calendarName) {
      await this.shouldContainText(
        this.elements.calendarName,
        calendarDetails.calendarName
      );
    }
    if (calendarDetails.calendarRef) {
      await this.shouldContainText(
        this.elements.calendarRef,
        calendarDetails.calendarRef
      );
    }
    if (calendarDetails.bookings) {
      await this.shouldContainText(
        this.elements.totalBooking,
        calendarDetails.bookings
      );
    }
    if (calendarDetails.bookedHours) {
      await this.shouldContainText(
        this.elements.bookedHours,
        calendarDetails.bookedHours
      );
    }
    if (calendarDetails.availableHours) {
      await this.shouldContainText(
        this.elements.availableHours,
        calendarDetails.availableHours
      );
    }
    if (calendarDetails.percentOccupied) {
      await this.shouldContainText(
        this.elements.percentageOccupied,
        calendarDetails.percentOccupied
      );
    }
  }

  async clickScriptTagCalendar() {
    await this.waitForSelector(this.elements.scriptTagCalendarButton);
    await this.click(this.elements.scriptTagCalendarButton);
  };

  async saveReservation(saveButton) {
    await this.click(`text=${saveButton}`);
  };

  async clickVisualizationTab() {
    await this.click(this.elements.visualizationTab);
  };

  async searchCalendar(calendar) {
    await this.waitForSelector(this.elements.visualizationSearchBar);
    await this.type(this.elements.visualizationSearchBar, calendar);
    await this.pressKey('Enter');
  };

  async validateReservation() {
    await this.shouldContainText(this.elements.verifyReservation, '11:00-11:30');
  };

  // async fillCalendarFilters(filter) {
  //   if(filter.ownerType === 'outboundCampaigns'){
  //     await this.click(this.elements.ownerTypeOutbound);
  //   }
  //   await this.waitForSelector(this.elements.outboundCampaignType);
  //   await this.type(this.elements.outboundCampaignType, filter.outboundCampaigns)
  //   await this.pressKey('Enter');
  //   if(filter.timeInterval === 'customInterval'){
  //     await this.click(this.elements.timeInterval);
  //   }
  // }




};
