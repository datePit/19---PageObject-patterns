import { test, expect } from '@playwright/test';
import { addCompPage }  from '../pages/addComputer';
import { addComp_URL } from '../tests/config';
import { BASE_URL } from '../tests/config';
import { exec } from 'child_process';
import { randomCompAndTime } from '../tests/controller.js'

test('Adding computer page opens', async ({ page }) => {
  const addcomppage = new addCompPage(page);
  await addcomppage.goto();
  await expect(addcomppage.addCompHeader).toHaveText(/Add a computer/);
});
  


test ('adding a comp with filled Computer name', async ({page}) => {
  const addcomppage = new addCompPage(page);
  await addcomppage.goto();

  await addcomppage.fillCompName(randomCompAndTime);
  //await expect(addcomppage.compNameField).toHaveText(randomCompAndTime)

  await addcomppage.pressedCreateButton();
  await expect(page).toHaveURL(BASE_URL)
});



test ('creating a comp without a name causes an error', async ({page}) => {
  const addcomppage = new addCompPage(page);
  await addcomppage.goto();

  await addcomppage.pressedCreateButton();
  const errorMessage = page.getByText('Failed to refine type : Predicate isEmpty() did not fail.')
  await expect(errorMessage).toBeVisible();
});


test ('creating a comp with not valid intro dates causes an error', async ({page}) => {
  const addcomppage = new addCompPage(page);
  await addcomppage.goto();
  await addcomppage.fillCompName(randomCompAndTime);
  await addcomppage.fillDate('blablabla');
  
  await addcomppage.pressedCreateButton();
  const errorMessage = page.getByText('Failed to decode date : java.time.format.DateTimeParseException: Text')
  await expect(errorMessage).toBeVisible();
});

test ('creating a comp with not valid discounted dates causes an error', async ({page}) => {
  const addcomppage = new addCompPage(page);
  await addcomppage.goto();
  await addcomppage.fillCompName(randomCompAndTime);
  await addcomppage.fillDate('!@#$%^&*()_+');
  
  await addcomppage.pressedCreateButton();
  const errorMessage = page.getByText('Failed to decode date : java.time.format.DateTimeParseException: Text')
  await expect(errorMessage).toBeVisible();
});
 