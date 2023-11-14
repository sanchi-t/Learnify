document.addEventListener("DOMContentLoaded", function () {
    const paidRadio = document.getElementById("paid");
    const budgetInfo = document.getElementById("budget-info");
    const budgetInput = document.getElementById("budget-input");
  
    // Listen for changes to the radio button selection
    paidRadio.addEventListener("change", function () {
      if (paidRadio.checked) {
        budgetInfo.style.display = "block"; // Display budget input as a dropdown
      } else {
        budgetInfo.style.display = "none"; // Hide budget input
      }
    });
  });
  