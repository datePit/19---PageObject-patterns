import { expect, Locator, Page } from '@playwright/test';

import { randomCompAndTime } from '../tests/controller.js';
import { addComp_URL } from '../tests/config';


function createAddCompPage(page) {
    const addCompHeader = page.getByRole('heading', { name: 'Add a computer' });
    const compNameField = page.getByLabel('Computer name');
    const introducedDate = page.getByLabel('Introduced');
    const discounted = page.getByLabel('Discontinued');
    const company = page.getByRole('combobox', { name: 'Company' });
    const createButton = page.getByRole('button', { name: 'Create this computer' });
    const cancelButton = page.getByRole('link', { name: 'Cancel' });
  
    async function goto() {
      await page.goto(addComp_URL);
      await expect(addCompHeader).toBeVisible();
    }
  
    async function fillCompName() {
      await compNameField.fill(randomCompAndTime);
      //await expect(compNameField).toHaveText(randomCompAndTime);
    }
  
    async function fillWrongIntroDate() {
      await introducedDate.fill('1990-01-01!!!');
      //await expect(introducedDate).toHaveText(/1990-01-01/);
    }
  
    async function fillIntroDate() {
      await introducedDate.fill('1990-01-01');
      await expect(introducedDate).toHaveText(/1990-01-01/);
    }
  
    async function filldiscountedDated() {
      await discounted.fill('2020-12-12');
      await expect(discounted).toHaveText(/2020-12-12/);
    }
  
    async function fillWrongdiscountedDated() {
      await discounted.fill('2020-12-12asd');
      //await expect(discounted).toHaveText(/2020-12-12/);
    }
  
    async function selectedCompany() {
      await company.selectOption('15');
      await expect(company).toHaveText(/Canon/);
    }
  
    async function pressedCreateButton() {
      await createButton.click();
      //await expect(company).not.toHaveURL(addComp_URL)
    }
  
    return {
      goto,
      fillCompName,
      fillWrongIntroDate,
      fillIntroDate,
      filldiscountedDated,
      fillWrongdiscountedDated,
      selectedCompany,
      pressedCreateButton
    };
  }