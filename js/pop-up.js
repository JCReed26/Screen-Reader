// handles user interactions

// Listeners on the pop-up html
document.addEventListener('DOMContentLoaded', () => {
    // WPM Variables 
    const minus = document.getElementById('minus');
    const number = document.getElementById('number');
    const plus = document.getElementById('plus');
    
    // Toggle Variables 
    const readToggle = document.getElementById('readToggle');
    const followToggle = document.getElementById('followToggle');
    const startToggle = document.getElementById('start');

    // Grab Initial States 
    chrome.runtime.sendMessage({action: 'getCounter'}, response => {
        number.textContent = response.counter;
    });

    chrome.runtime.sendMessage({action: 'getRead'}, response => {
        readToggle.checked = response.ReadAloud;
    });

    chrome.runtime.sendMessage({action: 'getFollow'}, response => {
        followToggle.checked = response.FollowText;
    });

    chrome.runtime.sendMessage({action: 'getStart/Stop'}, response => {
        console.log('player button clicked');
        if(response.reader) {
            startToggle.classList.add('playing');
        } else {
            startToggle.classList.remove('playing');
        }
    });


    // WPM Functions 
    
    
    minus.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'decrement'}, response => {
            number.textContent = response.counter;
        });
    });

    plus.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'increment'}, response => {
            number.textContent = response.counter;
        });
    });


    // Toggle Functions 
    readToggle.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'read'}, response => {
            readToggle.checked = response.ReadAloud;
        });
    });

    followToggle.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'follow'}, response => {
            followToggle.checked = response.FollowText;
        });
    });

    startToggle.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'start/stop'}, response => {
            if(response.reader) {
                startToggle.classList.add('playing');
            } else {
                startToggle.classList.remove('playing');
            }
        });
    });


});



document.getElementById("extractText").addEventListener('click', () => {
    console.log("call extract Text");
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {

        console.log(tabs, " | ", tabs[0].id, " | ", tabs[0]);

        try {
            
            if (!tabs || !tabs[0] || !tabs[0].id) {
                console.log("pop-up no tabs");
                document.getElementById("output").innerText = "No active tab found";
                return;
            }

            // Inject background script 
            await chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['/js/content.js']
            });


            chrome.tabs.sendMessage(tabs[0].id, {action: "getText"}, (response) => {

                if (chrome.runtime.lastError) {
                    document.getElementById("output").innerText = chrome.runtime.lastError.message
                    return;
                }

                if (response && response.text) {
                    document.getElementById("output").innerText = response.text.substring(0, 500);
                } else {
                    document.getElementById("output").innerText = "Failed to extract text."
                }
            });
        } catch (error) {
            document.getElementById("output").innerText = "Error: " + error.message;
        }
        
    });
});

