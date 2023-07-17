import { expect, Locator, Page } from '@playwright/test';

import { randomCompAndTime } from '../tests/controller.js';
import { addComp_URL } from '../tests/config';

const addCompPage = {
  page: null,
  addCompHeader: null,
  compNameField: null,
  introducedDate: null,
  discounted: null,
  company: null,
  createButton: null,
  cancelButton: null,
  
  async init(page) {
    this.page = page;
    this.addCompHeader = page.getByRole('heading', { name: 'Add a computer' });
    this.compNameField = page.getByLabel('Computer name');
    this.introducedDate = page.getByLabel('Introduced');
    this.discounted = page.getByLabel('Discontinued');
    this.company = page.getByRole('combobox', { name: 'Company' });
    this.createButton = page.getByRole('button', { name: 'Create this computer' });
    this.cancelButton = page.getByRole('link', { name: 'Cancel' });
  },

  async goto() {
    await this.page.goto(addComp_URL);
    await expect(this.addCompHeader).toBeVisible();
  },
  
  async fillCompName() {
    await this.compNameField.fill(randomCompAndTime);
    //await expect(this.compNameField).toHaveText(randomCompAndTime);
  },

  async fillWrongIntroDate() {
    await this.introducedDate.fill('1990-01-01!!!');
    //await expect(this.introducedDate).toHaveText(/1990-01-01/);
  },

  async fillIntroDate() {
    await this.introducedDate.fill('1990-01-01');
    await expect(this.introducedDate).toHaveText(/1990-01-01/);
  },

  async filldiscountedDated() {
    await this.discounted.fill('2020-12-12');
    await expect(this.discounted).toHaveText(/2020-12-12/);
  },

  async fillWrongdiscountedDated() {
    await this.discounted.fill('2020-12-12asd');
    //await expect(this.discounted).toHaveText(/2020-12-12/);
  },

  async selectedCompany() {
    await this.company.selectOption('15');
    await expect(this.company).toHaveText(/Canon/);
  },
  
  async pressedCreateButton() {
    await this.createButton.click();
    //await expect(this.company).not.toHaveURL(addComp_URL)
  }
};

export default addCompPage;