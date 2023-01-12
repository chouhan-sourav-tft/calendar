const {
  BaseAction
} = require('../setup/baseAction');

exports.InternalChat = class InternalChat extends BaseAction {
  constructor() {
    super();
  }
  
  /**
   * Creating elements object for initializing required locators
   */
  elements = {
    sidePanelExpandMenu: '#left-panel .minifyme',
    adminToolsMenu: '#menu_13',
    profileManagerButton: '#menu_32',
    userTypeDropDowm: '#s2id_access-level-list',
    userTypeInput: '#select2-drop input[id*=\'search\']',
    chatAccessDropdown: '#chat-permission',
    saveSettingButton: '#save-access-level',
    broadcastMessageCheckbox: 'label[data-translate=\'broadcastMessage\'] i',
    messageCounter: '#userCounter',
    unreadMessage: '//ul[@id="notify-list"]//li[1]//span[@class="notification-container unreadMessage"]',
    markAsReadSelector: '.mark-as-read-container',
    markAsReadDisable: '#mark-as-read[disabled]',
    unreadNotificationText: '#unreadNotification-tooltip-text',
    notificationContainer: '//li[1] //span[@class="notification-container"]',
    maskNumberCheckbox: '#mask-phone-numbers-group label i'
  };

  /**
   * function to navigate to profile manager
   * @return {void} Nothing
   */
  async navigateToProfileManagerPage() {
    await this.click(this.elements.sidePanelExpandMenu);
    await this.click(this.elements.adminToolsMenu);
    await this.click(this.elements.profileManagerButton);
    await this.click(this.elements.adminToolsMenu);
    await this.click(this.elements.sidePanelExpandMenu);
  }

  /**
   * function to select agent tab
   * @param {string} userType - type of user
   * @return {void} Nothing
   */
  async selectAgentTab(userType) {
    await this.click(this.elements.userTypeDropDowm);
    await this.type(this.elements.userTypeInput, userType);
    await this.pressKey('Enter');
  }

  /**
   * function to verify and select mask phone number checkbox
   * @return {void} Nothing
   */
  async verifyAndSelectMaskNumber() {
    await this.waitForSelector(this.elements.maskNumberCheckbox);
    await this.isVisible(this.elements.maskNumberCheckbox);
    if(! await this.isChecked(this.elements.maskNumberCheckbox))
      await this.click(this.elements.maskNumberCheckbox);
  }


  /**
   * function to select chat access
   * @param {string} accessType - user access type
   * @return {void} Nothing
   */
  async selectChatAccess(accessType) {
    if (accessType === 'no') {
      await this.selectOption(this.elements.chatAccessDropdown, 0);
    }
    if (accessType === 'simple') {
      await this.selectOption(this.elements.chatAccessDropdown, 1);
    }
    if (accessType === 'supervisor') {
      await this.selectOption(this.elements.chatAccessDropdown, 2);
    }
  }

  /**
   * function to save settings
   * @return {void} Nothing
   */
  async saveSetting() {
    await this.click(this.elements.saveSettingButton);
  }

  /**
   * function to check box in boradcast message
   * @return {void} Nothing
   */
  async selectBroadcastMessageCheckbox() {
    if (
      !(await this.checkCheckbosIsChecked(
        this.elements.broadcastMessageCheckbox
      ))
    )
      await this.click(this.elements.broadcastMessageCheckbox);
  }

  /**
   * function to get count of notification
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async getCounter(type=''){
    let counter= await this.getText(this.elements.messageCounter,type);
    return counter;
  }

  /**
   * function to verify unread notification
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async verifyUnreadNotification(type=''){
    await this.isVisible(this.elements.unreadMessage,type);
  }

  /**
   * function to verify and mark all read button
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async markAllReadEnable(type=''){
    await this.isVisible(this.elements.markAsReadSelector,type);
    await this.click(this.elements.markAsReadSelector,type);
  }

  /**
   * function to verify mark all read button disabled
   * @param  {string} type -  page type
   *  @return {void} Nothing
   */
  async markAllReadDisabled(type=''){
    await this.isVisible(this.elements.markAsReadDisable,type);
  }
  
  /**
   * function to verify unread notification test
   * @param  {string} text - message
   * @param  {string} type - page type
   * @return {void} Nothing
   */
  async verifyUnreadNotificationText(text,type=''){
    await this.mouseOver(this.elements.markAsReadSelector,type);
    await this.shouldContainText(this.elements.unreadNotificationText,text,type);
  }
};
