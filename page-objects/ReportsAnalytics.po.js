const { BaseAction } = require('../setup/baseAction');

exports.ReportsAnalytics = class ReportsAnalytics extends BaseAction {
  constructor() {
    super();
  }
  /**
   * Creating elements object for initializing required locators
   */
  elements = {

    reportSource: '//select[@id="dataSource"]',
    templateDropDown: '#s2id_selectTemplate .select2-arrow',
    startDateField: '#startDate',
    sameDate:
      '//div[contains(@class,"xdsoft_datetimepicker") and contains(@style,"display: block;")]//td[contains(@class,"xdsoft_today")]',
    endDateField: '#endDate',
    downloadReportBtn: '#downloadreportloader',
    dataType: '//select[@id="dataTypeCalls"]',
    scriptTab: '#myTab1 a[data-translate="script"]',
    addBtn: '.addItems',
    saveTemplateBtn: '#editDesign',
    deleteScript: '//label[contains(text(),"Callback schedule")]/following-sibling::div//a'

  };

  /**
   * function to enter csv data 
   * @param {object} reportDetails - report details object
   * @param {string} reportDetails.source - report source
   * @param {string} reportDetails.template - report template
   * @param {string} reportDetails.dataType - type of data
   * @return {void} Nothing
   */
  async enterCSVDetails(reportDetails){
    await this.waitForSelector(this.elements.reportSource);
    await this.dropdownOptionSelect(this.elements.reportSource, reportDetails.source);
    if(reportDetails.template){
      await this.wait(2); //wait for page to load
      await this.forceClick(this.elements.templateDropDown);
      await this.waitForSelector(`//div[@class="select2-result-label" and text()="${reportDetails.template}"]`);
      await this.click(`//div[@class="select2-result-label" and text()="${reportDetails.template}"]`);
    }
    await this.click(this.elements.startDateField);
    await this.waitForSelector(this.elements.sameDate);
    await this.scrollIntoElement(this.elements.sameDate);
    await this.click(this.elements.sameDate);
    await this.click(this.elements.endDateField);
    await this.click(this.elements.sameDate);
    await this.dropdownOptionSelect(this.elements.dataType, reportDetails.dataType);
  }

  /**
   * function to download report
   * @return {fileName} downloaded file name
   */
  async downloadReport(){
    await this.scrollIntoElement(this.elements.downloadReportBtn);
    let fileName = await this.verifyDownload(this.elements.downloadReportBtn);
    return fileName;
  }

  /**
   * function to open script tab on report page
   * @return {void} nothing
   */
  async openScriptTab(){
    await this.waitForSelector(this.elements.scriptTab);
    await this.click(this.elements.scriptTab);
  }

  /**
   * function to select script
   * @param {string} scriptName - name of the script
   * @return {void} nothing
   */
  async selectScript(scriptName){
    await this.scrollIntoElement(`//h5[text()="${scriptName}"]/../../following-sibling::div[1]//span`);
    await this.click(`//h5[text()="${scriptName}"]/../../following-sibling::div[1]//span`);
    await this.click(this.elements.addBtn);
  }

  /**
   * function to save report template
   * @return {void} nothing
   */
  async saveTemplate(){
    await this.click(this.elements.saveTemplateBtn);
  }

  /**
   * function to remove script from report template
   * @return {void} nothing
   */
  async removeScriptFromTemplate(){
    await this.click(this.elements.deleteScript);
  }
};