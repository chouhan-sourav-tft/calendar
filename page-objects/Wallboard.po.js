const { BaseAction } = require('../setup/baseAction');

exports.Wallboard = class Wallboard extends BaseAction {
  constructor() {
    super();
  }

  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    sidePanelExpandMenu: '#left-panel .minifyme',
    realTimeToolsMenu: '//a[@id="menu_0"]',
    wallboardMenu: '//a[@id="menu_15"]',
    wallboardDashboard: '#wallboard-main',
    templateList: '#s2id_template-list',
    inputText: '#select2-drop input',
    totalCalls: '#boxTopRight #totalCalls strong',
    answeredCalls: '#boxTopRight #answeredCalls strong',
    answerPercent: '#boxTopRight #answerPercent strong',
    tma: '#boxTopRight #tma strong',
    clickOnNewTabOptionButton: '#new-tab-button-wallboards',
    templateName: '[id="wallboardNameInput"]',
    templateType: '[id="wallboardUserType"]',
    modalSaveButton: '[id="wallboardNameSave"]',
    firstSettingIcon: '//div[@class="col-sm-1 access-level-edit"]//a[@data-target="#boxSettingsModalboxTopLeft"]',
    titleInputBox: '//div[@class="frame-box margin-wb col-xs-6"]//div[@id="boxSettingsModalboxTopLeft"]//input[@id="boxTitleInput"]',
    saveButton: '//div[@id="boxSettingsModalboxTopLeft"]//button[@class="btn btn-success save-box-settings"]',
    errorPopup: '//div[@id="newContentdiv"]//p',
    deleteButton: '[id="delete-template"]',
    deleteConfirmButton: '[class="btn btn-primary btn-xs confirm-dialog-btn-confirm"]',
    boxOfType: '//div[@id="boxSettingsModalboxTopLeft"]//select[@id="mainBoxSelectType"]'


  };

  /**
   * Function to goto wallboard menu
   * @return {void} Nothing
   */
  async navigateToWallboardMenu() {
    await this.waitForSelector(this.elements.sidePanelExpandMenu);
    await this.click(this.elements.sidePanelExpandMenu);
    await this.waitForSelector(this.elements.realTimeToolsMenu);
    if (!(await this.isVisible(this.elements.wallboardMenu))) {
      await this.click(this.elements.realTimeToolsMenu);
    }
    await this.waitForSelector(this.elements.wallboardMenu);
    await this.click(this.elements.wallboardMenu);
    await this.waitForSelector(this.elements.wallboardDashboard);
    await this.click(this.elements.sidePanelExpandMenu);
  }

  /**
   * Function to select template in wallboard dashboard
   * @param {string} templateName - Template name
   * @return {void} Nothing
   */
  async selectWallboardTemplate(templateName) {
    await this.waitForSelector(this.elements.templateList);
    await this.click(this.elements.templateList);
    await this.type(this.elements.inputText, templateName);
    let selectTemplate = `//div[@id='select2-drop']//ul[@class='select2-results']//li//li[contains(.,'${templateName}')]`;
    await this.waitForSelector(selectTemplate);
    await this.click(selectTemplate);
    await this.wait(2); //wait to load dashboard
  }

  /**
   * function to validate campaign(outbound/inbound) data on wallboard dashboard
   * @param {Object} campaignData - outbound data object
   * @param {string} campaignData.callsMade - calls made count
   * @param {string} campaignData.answered - answered call count
   * @param {string} campaignData.answeredPercent - answered percent
   * @param {string} campaignData.TMA - TMA time
   * @param {string} campaignData.ready - ready users
   * @param {string} campaignData.talking - talking users
   * @param {string} campaignData.outcome - outcomes users
   * @param {string} campaignData.break - users on break
   * @param {string} campaignType -  outbound/inbound
   * @return {void} Nothing
   */
  async verifyCampaignData(campaignData, campaignType) {
    //wait for data to update
    await this.wait(5);
    let boxid = '';
    if (campaignType === 'Outbound') {
      boxid = '#boxTopRight';
    }
    if (campaignType === 'Inbound') {
      boxid = '#boxTopLeft';
    }

    if (campaignData.callsMade) {
      await this.shouldContainText(
        `${boxid} #totalCalls strong`,
        campaignData.callsMade
      );
    }
    if (campaignData.answered) {
      await this.shouldContainText(
        `${boxid} #answeredCalls strong`,
        campaignData.answered
      );
    }
    if (campaignData.answeredPercent) {
      await this.shouldContainText(
        `${boxid} #answerPercent strong`,
        campaignData.answeredPercent
      );
    }
    if (campaignData.TMA) {
      await this.shouldContainText(
        `${boxid} #tma strong`,
        campaignData.TMA
      );
    }
    if (campaignData.ready) {
      await this.shouldContainText(
        `${boxid} #agents-ready-bar .agent-bar-number`,
        campaignData.ready
      );
    }
    if (campaignData.talking) {
      await this.shouldContainText(
        `${boxid} #agents-working-bar .agent-bar-number`,
        campaignData.talking
      );
    }
    if (campaignData.outcome) {
      await this.shouldContainText(
        `${boxid} #agents-outcomes-bar .agent-bar-number`,
        campaignData.outcome
      );
    }
    if (campaignData.break) {
      await this.shouldContainText(
        `${boxid} #agents-paused-bar .agent-bar-number`,
        campaignData.break
      );
    }
    if (campaignData.abandoned) {
      await this.shouldContainText(
        `${boxid} #totalAbandon strong`,
        campaignData.abandoned
      );
    }
    if (campaignData.abandonedPercent) {
      await this.shouldContainText(
        `${boxid} #abandonPercent strong`,
        campaignData.abandonedPercent
      );
    }
    if (campaignData.TME) {
      await this.shouldContainText(
        `${boxid} #tme strong`,
        campaignData.TME
      );
    }
    if (campaignData.waitQueue) {
      await this.shouldContainText(
        `${boxid} #inQueue strong`,
        campaignData.waitQueue
      );
    }
  }

  /**
  * function to click open new tab option button
  * @return {void} Nothing
  */
  async clickOnNewTabOption() {
    await this.waitForSelector(this.elements.clickOnNewTabOptionButton);
    await this.click(this.elements.clickOnNewTabOptionButton);
  }

  /**
  * function to click new template tab
  * @param  {string} type -  page type
  * @returns {void} nothing
  */
  async clickOnNewTemplateTab(newTemplate) {
    let selector = `//button//span[contains(text(),"${newTemplate}")]`
    await this.waitForSelector(selector);
    await this.click(selector);
  }

  /**
   * function to fill modal details foe new template
   * @param {Object} modalDetails - modal data object
   * @param {string} modalDetails.templateName - name of the template
   * @param {string} modalDetails.templateType - type of template
   * @returns {void} nothing
   */
  async fillModalDetails(modalDetails) {
    await this.waitForSelector(this.elements.templateName);
    await this.type(this.elements.templateName, modalDetails.templateName);
    await this.waitForSelector(this.elements.templateType);
    await this.selectOptionByValue(this.elements.templateType, modalDetails.templateType);
    await this.waitForSelector(this.elements.modalSaveButton);
    await this.click(this.elements.modalSaveButton);
  }

  /**
  * Function to goto wallboard menu
  * @param {string} type - page type
  * @return {void} Nothing
  */
  async navigateWallboardMenu(type = '') {
    await this.waitForSelector(this.elements.sidePanelExpandMenu, type);
    await this.click(this.elements.sidePanelExpandMenu, type);
    await this.waitForSelector(this.elements.realTimeToolsMenu, type);
    if (!(await this.isVisible(this.elements.wallboardMenu, type))) {
      await this.click(this.elements.realTimeToolsMenu, type);
    }
    await this.waitForSelector(this.elements.wallboardMenu, type);
    await this.click(this.elements.wallboardMenu, type);
    await this.waitForSelector(this.elements.wallboardDashboard, type);
    await this.click(this.elements.sidePanelExpandMenu, type);
  }

 /**
 * Function to verify user access previously created template 
 * @param {string} templateName - Template name
 * @return {void} Nothing
 */
  async verifyTemplate(templateName, type = '') {
    await this.waitForSelector(this.elements.templateList, type);
    await this.click(this.elements.templateList, type);
    await this.type(this.elements.inputText, templateName, type);
    let locator = `//div[@id='select2-drop']//ul[@class='select2-results']//li//li[contains(.,'${templateName}')]`;
    let accessTemplate = await this.isVisible(locator, type);
    assert.isTrue(accessTemplate);
    await this.click(locator, type);
    await this.wait(2); //wait to load dashboard
  }

  /**
  * Function to fill the section
  * @param {Object} sectionDetails - section details
  * @param {string} sectionDetails.titleOfForm - Title of form
  * @return {void} Nothing
  */
  async clickFirstSettingIcon(type = '') {
    await this.click(this.elements.firstSettingIcon, type);
  }

  /**
  * Function to save the section
  * @return {void} Nothing
  */
  async fillSectionDetails(titleOfForm, type = '') {
    await this.type(this.elements.titleInputBox, titleOfForm, type);
  }

  /**
  * Function to save the section
  * @return {void} Nothing
  */
  async saveSectionDetails(type = '') {
    await this.waitForSelector(this.elements.saveButton, type);
    await this.click(this.elements.saveButton, type);
  }

  /**
  * Function to save the section
  * @param {string} error - error popup
  * @return {void} Nothing
  */
  async verifyErrorPopup(error, type) {
    await this.waitForSelector(this.elements.errorPopup, type);
    await this.shouldContainText(this.elements.errorPopup, error, type);
  }

  /**
  * Function to delete the section
  * @return {void} Nothing
  */
  async deleteSectionDetails(type = '') {
    await this.wait(5);
    await this.waitForSelector(this.elements.deleteButton, type);
    await this.click(this.elements.deleteButton, type);
    await this.waitForSelector(this.elements.deleteConfirmButton, type);
    await this.click(this.elements.deleteConfirmButton, type);
  }

};