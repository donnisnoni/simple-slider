(function () {
  const sliders = document.querySelectorAll(".slider");

  sliders.length && sliders.forEach((sliderEl) => slider(sliderEl));

  /** @param {HTMLDivElement} slider */
  function slider(slider) {
    slider.tabIndex = 0;

    const sliderBar = document.createElement("div");
    sliderBar.classList.add("slider-bar");
    slider.appendChild(sliderBar);

    const sliderTrackButton = document.createElement("div");
    sliderTrackButton.classList.add("slider-track-button");
    sliderBar.appendChild(sliderTrackButton);

    let sliderTrackButtonX = 0;

    // Options
    const roundValue =
      slider.dataset.roundValue && slider.dataset.roundValue === "true";
    slider.dataset.value && setValue(slider.dataset.value);

    sliderTrackButton.addEventListener("mousedown", onMouseDown);

    /** @param {MouseEvent} event */
    function onMouseMove(event) {
      const sliderRect = slider.getBoundingClientRect();
      let intersect = event.clientX - sliderRect.left - event.movementX;

      if (intersect < 0) {
        intersect = 0;
      } else if (intersect > sliderRect.width) {
        intersect = sliderRect.width;
      }

      let percent = (intersect * 100) / sliderRect.width;
      if (roundValue) {
        percent = Math.round(percent);
      }
      setValue(percent);
    }

    function setValue(percent) {
      slider.dataset.value = percent;

      const sliderTrackButtonWidth = sliderTrackButton.getBoundingClientRect()
        .width;
      sliderTrackButton.style.left = `calc(100% - (${sliderTrackButtonWidth}px / 2)`;
      sliderBar.style.width = `calc(${percent}% - ${sliderTrackButtonX}px + (${sliderTrackButtonWidth}px / 2))`;
    }

    /** @param {MouseEvent} event */
    function onMouseDown({ clientX }) {
      sliderTrackButtonX =
        clientX - sliderTrackButton.getBoundingClientRect().left;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }
})();
