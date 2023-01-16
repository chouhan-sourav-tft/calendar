
const { When, Then } = require('@cucumber/cucumber');
const { Wallboard } = require('../page-objects/Wallboard.po');
const wallboard = new Wallboard();

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
      'break': element.break
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

When('user fill the modal with the following information:', async (dataTable) => {
  const modalDetails = dataTable.rowsHash();
  await wallboard.fillModalDetails(modalDetails);
})

Then('user access the wallboard menu in {string} window', async (session) => {
  await wallboard.navigateWallboardMenu(session);
})

Then('user check that Supervisor#2 can access to the template {string} created by Supervisor#1 in {string} window',
  async (template, session) => {
    await wallboard.selectWallboardTemplateinSecondTab(template, session);
    await wallboard.clickFirstSettingIcon(session);

  })

Then('user click to edit the first section and fill title of form {string} in {string} window', async (title, session) => {
  // let sectionDetails = '';
  // datatable.hashes().forEach((element) => {
  //   sectionDetails = {
  //     'titleOfForm': element.titleOfForm
  //   };
  // });
  await wallboard.fillSectionDetails(title, session);
})

When('user click on Save in {string} window', async (session) => {
  await wallboard.saveSectionDetails(session);
})

Then('Supervisor#2 cannot edit the template created by Supervisor#1. Is displayed a notification error: {string} in {string} window',
  async (errorMessage, session) => {
    await wallboard.verifyErrorPopup(errorMessage, session);
  })

When('user click to Delete in {string} window', async (session) => {
  await wallboard.deleteSectionDetails(session);
})

Then('Supervisor#2 cannott delete the template created by Supervisor#1. Is displayed a notification error: {string} in {string} window', async (errorMessage, session) => {
  await wallboard.verifyErrorPopup(errorMessage, session);
})