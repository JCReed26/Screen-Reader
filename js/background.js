// handles background interactions from views 

// Variables 

let counter = 200; 

let ReadAloud = false;
let FollowText = false;

let reader = false;

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
        case 'read':
            ReadAloud = !ReadAloud;
            sendResponse({ReadAloud: ReadAloud});
            console.log(ReadAloud);
            break;
        case 'getRead':
            sendResponse({ReadAloud: ReadAloud});
            break;
        case 'follow': 
            FollowText = !FollowText;
            sendResponse({FollowText: FollowText});
            console.log(FollowText);
            break; 
        case 'getFollow':
            sendResponse({FollowText: FollowText});
            break;
        case 'start/stop': 
            reader = !reader; 
            sendResponse({reader: reader});
            console.log(reader);
            break; 
        case 'getStart/Stop': 
            sendResponse({reader: reader});
            break; 
        case 'sendText': 
    }
    return true;
});
// Listeners


// Features

// Highlighted moving window would be done with scripting API
