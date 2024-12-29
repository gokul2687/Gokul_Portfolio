const textArray = ["Frontend Developer", "Support Engineer", "Freelancer"];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // Speed of typing (ms per character)
const erasingSpeed = 50; // Speed of erasing (ms per character)
const delayBetweenTexts = 1500; // Delay before switching to next text
const typewriterElement = document.getElementById("typewriter");

// Ensure the element exists
if (!typewriterElement) {
  console.error("Element with id 'typewriter' not found in the DOM.");
} else {
  function type() {
    if (charIndex < textArray[textIndex].length) {
      typewriterElement.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      // Text fully typed, wait before erasing
      setTimeout(erase, delayBetweenTexts);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typewriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      // Move to the next text
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, typingSpeed);
    }
  }

  // Start typing effect after DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Starting typewriter effect...");
    setTimeout(type, delayBetweenTexts);
  });
}


const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});