// handles background interactions from views 

// Variables 

let counter = 200; 

//var 

// Listens for Message sends - can be sent from: pop-up, 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch(message.action) {
        case 'increment':
            counter += 5; 
            sendResponse({counter: counter});
            break; 
        case 'decrement': 
            counter -= 5; 
            sendResponse({counter: counter});
            break;
        case 'getCounter':
            sendResponse({counter: counter});
            break;
    }
    return true;
});
// Listeners


// Features

// Highlighted moving window would be done with scripting API


