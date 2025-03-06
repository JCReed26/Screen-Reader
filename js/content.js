chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "getText") {
        console.log("extractText");
        sendResponse({text: extractText()});
    }
    if (request.message === "start/stop") {
        if (request.isReading) {
            highlightReading();
        } else {
            stopHighlighting();
        }
        sendResponse({ status: "completed" });
    }
    return true;
});

function extractText() {
    
    // we need this to focus on the main content of the page 
    const mainSelectors = [
        'main',
        'article'
    ];

    for (let selector of mainSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            return element.innerText;
        }
    }

    return "no text found";
    
}


function highlightReading() {
    console.log("start highlight");
}

function stopHighlighting() {
    console.log("stop highlight");
}