// handles user interactions

// Listeners on the pop-up html
document.addEventListener('DOMContentLoaded', () => {
    const minus = document.getElementById('minus');
    const number = document.getElementById('number');
    const plus = document.getElementById('plus');

    // initial grab 
    chrome.runtime.sendMessage({action: 'getCounter'}, response => {
        number.textContent = response.counter;
    })
    
    minus.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'decrement'}, response => {
            number.textContent = response.counter;
        });
    });

    plus.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: 'increment'}, response => {
            number.textContent = response.counter;
        })
    })

});

document.getElementById("extractText").addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {

        try {
            
            if (!tabs || !tabs[0] || !tabs[0].id) {
                document.getElementById("output").innerText = "No active tab found";
                return;
            }

            // Inject content script 
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

