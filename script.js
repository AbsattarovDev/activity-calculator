let templateMonth = document.querySelector(".templateMonth"),
  calendar = document.querySelector(".calendar"),
  activeDays = document.querySelector(".daysCount"),
  maxNumbers = document.querySelector(".maxNumbers"),
  averageNumbers = document.querySelector(".averageNumbers"),
  minNumbers = document.querySelector(".minNumbers");

// Create 31 input fields for days.
for (let i = 0; i < 31; i++) {
  let clone = document.importNode(templateMonth.content, true);
  let input = clone.querySelector(".day");
  // Indices start from 0, that's why I set the index to "i+1".
  input.placeholder = (i + 1).toString(); // Now it starts from 1.
  calendar.appendChild(clone);
}

// "Only numbers" mode for inputs
const numericInputs = document.querySelectorAll(".day");
numericInputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
  });
});

let inputFields = document.querySelectorAll("input");

// Function to calculate maximum, minimum and average
function calculateResults() {
  // Check if at least one input field has a non-empty and non-zero value
  let hasValidInput = Array.from(inputFields).some((input) => {
    let value = input.value.trim();
    return value !== "" && value !== "0";
  });

  // If no valid input is found, return early and don't perform the calculation
  if (!hasValidInput) {
    let errorMessage = document.querySelector(".errorMessage");
    if (errorMessage) {
      return;
    }

    let errorDiv = document.querySelector(".errorDiv");
    errorMessage = document.createElement("p");
    errorMessage.className = "errorMessage";
    errorMessage.textContent =
      "Please enter at least one valid value before calculating!";
    errorDiv.appendChild(errorMessage);

    // Remove the error message after 3 seconds
    setTimeout(() => {
      errorMessage.remove();
    }, 3000);
    return;
  }

  let totalResults = [];
  let validDays = 0;

  // Loop through each input field to calculate maximum, minimum, and accumulate total results
  inputFields.forEach((input) => {
    let value = input.value.trim();
    if (value !== "" && value !== "0") {
      let results = parseInt(value);
      if (!isNaN(results)) {
        totalResults.push(results);
        validDays++;
      }
    }
  });

  // Calculate maximum, minimum, and average results
  let maxResults = Math.max(...totalResults);
  let minResults = Math.min(...totalResults);
  let totalSum = totalResults.reduce((acc, curr) => acc + curr, 0);
  let averageResults = Math.round(totalSum / validDays); // Rounds to the nearest integer

  // Display the results
  activeDays.textContent = validDays;
  maxNumbers.textContent = maxResults;
  averageNumbers.textContent = averageResults;
  minNumbers.textContent = minResults;
}

// Add event listener to the "calculate" button
document.querySelector(".calcBtn").addEventListener("click", calculateResults);
