'use strict';
const moment = require('moment');
const puppeteer = require('puppeteer');
const argv = require('yargs').argv;
(async () => {
	let launchOptions = {};
	launchOptions.headless = false;
	launchOptions.slowMo = 100;
	launchOptions.args = ['--window-size=1920,1080'];
	launchOptions.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
	launchOptions.userDataDir = argv.userDataDir;
	let browser = await puppeteer.launch(launchOptions);
	let page = await browser.newPage();

	await page.setViewport({
		width: 1920,
		height: 1080,
	});

	// go to index
	await page.goto('https://www.google.com');

	browser.close();

	const now = moment().format('MMMM Do YYYY, h:mm:ss a');
	console.log(`${now}`);
})();
