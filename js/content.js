// this gets the content and other data from the website 

//functions 

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


// listener for calls to functions and send to background 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "getText") {
        sendResponse({text: extractText()});
    }
})