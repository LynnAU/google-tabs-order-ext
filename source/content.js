// global variables

// we can use each of the tab's a.href to find out what it does
// without having to read the tab's innerHTML (text)
// so we can support every language!
// the search url has a query string variable called `tbm`
// we only care about images though so we'll only reorder that one
const tbmMapping = {
	images: 'isch',
	videos: 'vid',
	news: 'nws'
};

const anchorElementName = 'A';

// main
const tabsSelector = 'div.main#main div#top_nav div[role=navigation] > div > div > div > div';
const tabsElements = Array.from(document.querySelector(tabsSelector).children);

// get the a record in each tab so we can find where the images tab is
// and get its element so we can insert it after the first tab (all)

const imagesTabElement = tabsElements.find((tabElement) => {
	// get the a.href of this element (if possible)
	const childrenElements = Array.from(tabElement.children);
	const isAnchorElement = (childElement) => childElement.nodeName === anchorElementName;
	const anchorChildrenElements = childrenElements.filter(isAnchorElement);
	if (anchorChildrenElements.length === 0) {
		// no anchor child elements, exit...
		return false;
	}

	// parse each of the anchor's href
	// finding if they are our images tab or not...
	const isImageAnchorElement = (anchorElement) => anchorElement.getAttribute('href').includes(`&tbm=${tbmMapping.images}`);
	const foundImageAnchorElements = anchorChildrenElements.filter(isImageAnchorElement);
	if (foundImageAnchorElements.length === 0) {
		// no href or no images code in url
		return false;
	}

	// we found at least one images tab, lets just return the first so it's safe
	return foundImageAnchorElements[0];
});

// now let's reorder the initial tabs we have
// putting our images tab right after the first tab (all)
const allTabElement = tabsElements[0];
allTabElement.insertAdjacentElement('afterend', imagesTabElement);
