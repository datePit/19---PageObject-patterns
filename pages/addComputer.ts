// node ./pages/addComputer.ts

import { expect, Locator, Page } from '@playwright/test';

import { randomCompAndTime } from '../tests/controller.js'
import { addComp_URL } from '../tests/config';
import { LowerAlphaChar } from '@faker-js/faker/modules/string/index.js';
import { exec } from 'child_process';

//console.log(randomCompandTime);
//console.log(addComp_URL);

export class addCompPage {
  readonly page: Page;
  readonly addCompHeader: Locator;
  readonly compNameField: Locator;
  readonly introducedDate: Locator;
  readonly discounted: Locator;
  readonly company: Locator;
  readonly createButton: Locator;
  readonly cancelButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.addCompHeader = page.getByRole('heading', { name: 'Add a computer' });
    this.compNameField = page.getByLabel('Computer name');
    this.introducedDate = page.getByLabel('Introduced');
    this.discounted = page.getByLabel('Discontinued');
    this.company = page.getByRole('combobox', { name: 'Company' });
    this.createButton = page.getByRole('button', { name: 'Create this computer' });
    this.cancelButton = page.getByRole('link', { name: 'Cancel' });
  }

  async goto() {
    await this.page.goto(addComp_URL);
    await expect(this.addCompHeader).toBeVisible();
  }
  
  async fillCompName() {
    await this.compNameField.fill(randomCompAndTime);;
    //await expect(this.compNameField).toHaveText(randomCompAndTime);
  }

  async fillWrongIntroDate() {
    await this.introducedDate.fill('1990-01-01!!!');
    //await expect(this.introducedDate).toHaveText(/1990-01-01/);
  }

  async fillIntroDate() {
    await this.introducedDate.fill('1990-01-01');
    await expect(this.introducedDate).toHaveText(/1990-01-01/);
  }

  async filldiscountedDated() {
    await this.discounted.fill('2020-12-12');
    await expect(this.discounted).toHaveText(/2020-12-12/);
  }

  async fillWrongdiscountedDated() {
    await this.discounted.fill('2020-12-12asd');
    //await expect(this.discounted).toHaveText(/2020-12-12/);
  }

  async selectedCompany() {
    await this.company.selectOption('15');
    await expect(this.company).toHaveText(/Canon/);
  }
  
  async pressedCreateButton() {
    await this.createButton.click();
    //await expect(this.company).not.toHaveURL(addComp_URL)
  }
}
