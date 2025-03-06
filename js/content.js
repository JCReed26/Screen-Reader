// this gets the content and other data from the website 

//functions 

function extractText() {
    let bodyText = document.body.innerText; // inner text grabs all visible text 
    return bodyText;
}


// listener for calls to functions and send to background 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "getText") {
        sendResponse({text: extractText()});
    }
})