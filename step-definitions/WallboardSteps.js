
const { When, Then } = require('@cucumber/cucumber');
const { Wallboard } = require('../page-objects/Wallboard.po');
const wallboard = new Wallboard();
let templateName = '';

When('user access the wallboard menu', async () => {
  await wallboard.navigateToWallboardMenu();
});

Then('user select {string} from list', async (template) => {
  await wallboard.selectWallboardTemplate(template);
});

Then('verify {string} section data with following configurations:', async (campaignType, dataTable) => {
  let campaignDetails = [];
  dataTable.hashes().forEach((element) => {
    campaignDetails.push({
      'callsMade': element.callsMade,
      'answered': element.answered,
      'answeredPercent': element.answeredPercent,
      'TMA': element.TMA,
      'ready': element.ready,
      'talking': element.talking,
      'outcome': element.outcome,
      'break': element.break,
      'abandoned': element.abandoned,
      'abandonedPercent': element.abandonedPercent,
      'TME': element.TME,
      'waitQueue': element.waitQueue
    });
  });

  for (let i = 0; i < campaignDetails.length; i++) {
    await wallboard.verifyCampaignData(campaignDetails[i], campaignType);
  }
});

When('user click on option open in new tab {string}', async (clickTimes) => {
  for (let i = 0; i < clickTimes; i++) {
    await wallboard.clickOnNewTabOption();
  }
});

Then('select the option {string}', async (newTemplate) => {
  await wallboard.clickOnNewTemplateTab(newTemplate);
});

When('user fill the modal with the following information:', async (datatable) => {
  let modalDetails = '';
  datatable.hashes().forEach((element) => {
    templateName = element.templateName + new Date().getTime();
    modalDetails = {
      'templateName': templateName,
      'templateType': element.templateType
    };
  });
  await wallboard.fillModalDetails(modalDetails);
});

Then('user access the wallboard menu in {string} window', async (session) => {
  await wallboard.navigateWallboardMenu(session);
})

Then('user check that Supervisor#2 can access previously created template in {string} window',
  async (session) => {
    await wallboard.verifyTemplate(templateName, session)
  })

Then('user click to edit the first section and fill title of form {string} in {string} window', async (title, session) => {
  await wallboard.clickFirstSettingIcon(session);
  await wallboard.fillSectionDetails(title, session);
})

When('user click on Save in {string} window', async (session) => {
  await wallboard.saveSectionDetails(session);
})

Then('user verify the error: {string} in {string} window',
  async (errorMessage, session) => {
    await wallboard.verifyErrorPopup(errorMessage, session);
  })

When('user click to Delete in {string} window', async (session) => {
  await wallboard.deleteSectionDetails(session);
})