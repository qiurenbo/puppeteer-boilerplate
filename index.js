'use strict';
const sleep = require('sleep-while');
const puppeteer = require('puppeteer');

let pageTarget;
let clickAndWaitForTarget = async (clickSelector, page, browser) => {
	pageTarget = page.target(); //save this to know that this was the opener
	await page.click(clickSelector); //click on a link
	const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); //check that you opened this page, rather than just checking the url
	const newPage = await newTarget.page(); //get the page object
	// await newPage.once("load",()=>{}); //this doesn't work; wait till page is loaded
	await newPage.waitForSelector('body'); //wait for page to be loaded

	await newPage.setViewport({
		width: 1920,
		height: 1080,
	});

	return newPage;
};

(async () => {
	// lauch
	let launchOptions = {};
	launchOptions.headless = false;
	launchOptions.slowMo = 100;
	launchOptions.args = ['--window-size=1920,1080'];
	launchOptions.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

	let browser = await puppeteer.launch(launchOptions);
	let page = await browser.newPage();

	await page.setViewport({
		width: 1920,
		height: 1080,
	});

	// go to index
	await page.goto('https://www.google.com');

	await sleep(1000);
	browser.close();
})();
