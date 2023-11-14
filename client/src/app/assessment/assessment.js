function updateSliderValue(value) {
    // Get the span element where the slider value is displayed
    const sliderValueElement = document.getElementById("slider-value");
  
    // Update the displayed value with the current slider value
    sliderValueElement.textContent = value + " hours";
  }