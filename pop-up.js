// handles user interactions

// Listeners on the document
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