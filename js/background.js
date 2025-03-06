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
            highlightReading();
            console.log(reader);
            break; 
        case 'getStart/Stop': 
            sendResponse({reader: reader});
            break; 
    }
    return true;
});
// Listeners

// Features

//Highlighted Text Following 
function getTextNodes(node, textNodes = []) {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
        textNodes.push(node);
    } else {
        for (let child of node.childNodes) {
            getTextNodes(child)
        }
    }
    return textNodes;
}

function moveHighlight(index, allWords = []) {
    if (!reader || index >= allWords.length) {
        return;
    }

    if (index > 0) {
        allWords[index - 1].style.backgroundColor = "transparent";
    }

    // Highlight current word
    if (index < allWords.length) {
        allWords[index].style.backgroundColor = "yellow"; 
        index++; 
        // Pass both parameters in the setTimeout call
        setTimeout(() => moveHighlight(index, allWords), counter);
    }
}

function highlightReading() {
    const text = extractText(); 

    console.log(text);

    const textNodes = []; 
    textNodes = getTextNodes(text);


    let allWords = []; 
    textNodes.forEach(node => {
        const words = node.nodeValue;
        words.split(/\s+/).filter(word => word.length > 0); 
        if (words.length == 0) return; 

        const fragment = document.createDocumentFragment(); 

        words.forEach(word => {
            const span = document.createElement('span'); 
            span.textContent = word + " "; 
            span.style.transition = "background-color 0.3s ease";
            fragment.appendChild(span); 
            allWords.push(span);
        });

        node.replaceWith(fragment)
    });

    let index = 0;

    moveHighlight(index, allWords); 
}