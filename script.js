const typingSpeed = 100; // Speed in milliseconds
const delayAfterTyping = 10000; // 10 seconds delay after the text is fully typed

function typeText(element) {
    const text = element.innerText;
    element.innerHTML = ""; 
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(() => {
                element.innerHTML = ""; 
                index = 0;
                type();
            }, delayAfterTyping);
        }
    }

    type(); 
}

// Select and start typing effect
const element = document.querySelector('.Typedtext');
if (element) {
    typeText(element);
}
