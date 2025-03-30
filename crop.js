// Crop functionality for the shoe image editor
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const previewImage = document.getElementById("previewImage");
  const imageEditorContainer = document.getElementById("imageEditorContainer");

  // Add crop button to the edit controls
  const editControls = document.querySelector(".edit-controls");
  const cropBtn = document.createElement("button");
  cropBtn.id = "cropBtn";
  cropBtn.className = "edit-btn";
  cropBtn.title = "Crop Image";
  cropBtn.innerHTML = '<i class="fas fa-crop-alt"></i>';
  editControls.appendChild(cropBtn);

  // Crop state variables
  let isCropping = false;
  let cropStartX, cropStartY, cropWidth, cropHeight;
  let originalImageWidth, originalImageHeight;
  let cropContainer, cropOverlay, cropHandles;

  // Add event listener for crop button
  cropBtn.addEventListener("click", startCropping);

  // Function to start cropping
  function startCropping() {
    if (isCropping) return;

    isCropping = true;

    // Store original image dimensions
    originalImageWidth = previewImage.width;
    originalImageHeight = previewImage.height;

    // Create crop container
    cropContainer = document.createElement("div");
    cropContainer.className = "crop-container";
    cropContainer.style.width = `${originalImageWidth}px`;
    cropContainer.style.height = `${originalImageHeight}px`;

    // Create crop overlay
    cropOverlay = document.createElement("div");
    cropOverlay.className = "crop-overlay";

    // Set initial crop area (centered, 80% of image)
    cropWidth = Math.round(originalImageWidth * 0.8);
    cropHeight = Math.round(originalImageHeight * 0.8);
    cropStartX = Math.round((originalImageWidth - cropWidth) / 2);
    cropStartY = Math.round((originalImageHeight - cropHeight) / 2);

    updateCropOverlay();

    // Add crop handles
    cropHandles = [];
    const handlePositions = ["nw", "ne", "sw", "se"];

    handlePositions.forEach((position) => {
      const handle = document.createElement("div");
      handle.className = `crop-handle crop-handle-${position}`;
      handle.dataset.position = position;
      cropOverlay.appendChild(handle);
      cropHandles.push(handle);

      // Add event listeners for handles
      handle.addEventListener("mousedown", startResizing);
      handle.addEventListener("touchstart", startResizing, { passive: false });
    });

    // Add crop overlay to container
    cropContainer.appendChild(cropOverlay);

    // Hide the original image
    previewImage.style.display = "none";

    // Add crop container to editor
    imageEditorContainer
      .querySelector(".image-preview-wrapper")
      .appendChild(cropContainer);

    // Create a clone of the image for the crop preview
    const cropPreviewImage = document.createElement("img");
    cropPreviewImage.src = previewImage.src;
    cropPreviewImage.id = "cropPreviewImage";
    cropPreviewImage.style.width = "100%";
    cropPreviewImage.style.height = "100%";
    cropPreviewImage.style.objectFit = "cover";
    cropContainer.insertBefore(cropPreviewImage, cropOverlay);

    // Add crop controls
    const cropControls = document.createElement("div");
    cropControls.className = "crop-controls";

    const applyCropBtn = document.createElement("button");
    applyCropBtn.className = "crop-btn apply";
    applyCropBtn.textContent = "Apply Crop";
    applyCropBtn.addEventListener("click", applyCrop);

    const cancelCropBtn = document.createElement("button");
    cancelCropBtn.className = "crop-btn cancel";
    cancelCropBtn.textContent = "Cancel";
    cancelCropBtn.addEventListener("click", cancelCrop);

    cropControls.appendChild(applyCropBtn);
    cropControls.appendChild(cancelCropBtn);

    imageEditorContainer
      .querySelector(".image-preview-wrapper")
      .appendChild(cropControls);

    // Add event listeners for moving the crop area
    cropOverlay.addEventListener("mousedown", startMoving);
    cropOverlay.addEventListener("touchstart", startMoving, { passive: false });
  }

  // Function to update crop overlay position and size
  function updateCropOverlay() {
    cropOverlay.style.left = `${cropStartX}px`;
    cropOverlay.style.top = `${cropStartY}px`;
    cropOverlay.style.width = `${cropWidth}px`;
    cropOverlay.style.height = `${cropHeight}px`;
  }

  // Function to start moving the crop area
  function startMoving(e) {
    e.preventDefault();

    // Ignore if clicking on a handle
    if (e.target !== cropOverlay) return;

    const startX = e.clientX || (e.touches && e.touches[0].clientX);
    const startY = e.clientY || (e.touches && e.touches[0].clientY);

    const initialCropStartX = cropStartX;
    const initialCropStartY = cropStartY;

    function moveHandler(e) {
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      // Calculate new position with bounds checking
      cropStartX = Math.max(
        0,
        Math.min(originalImageWidth - cropWidth, initialCropStartX + deltaX)
      );
      cropStartY = Math.max(
        0,
        Math.min(originalImageHeight - cropHeight, initialCropStartY + deltaY)
      );

      updateCropOverlay();
    }

    function endHandler() {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", endHandler);
      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", endHandler);
    }

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", endHandler);
    document.addEventListener("touchmove", moveHandler, { passive: false });
    document.addEventListener("touchend", endHandler);
  }

  // Function to start resizing the crop area
  function startResizing(e) {
    e.preventDefault();
    e.stopPropagation();

    const handle = e.target;
    const position = handle.dataset.position;

    const startX = e.clientX || (e.touches && e.touches[0].clientX);
    const startY = e.clientY || (e.touches && e.touches[0].clientY);

    const initialCropStartX = cropStartX;
    const initialCropStartY = cropStartY;
    const initialCropWidth = cropWidth;
    const initialCropHeight = cropHeight;

    function resizeHandler(e) {
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      // Update crop dimensions based on handle position
      if (position.includes("n")) {
        cropStartY = Math.max(
          0,
          Math.min(
            initialCropStartY + initialCropHeight - 50,
            initialCropStartY + deltaY
          )
        );
        cropHeight = initialCropHeight - (cropStartY - initialCropStartY);
      }

      if (position.includes("s")) {
        cropHeight = Math.max(
          50,
          Math.min(originalImageHeight - cropStartY, initialCropHeight + deltaY)
        );
      }

      if (position.includes("w")) {
        cropStartX = Math.max(
          0,
          Math.min(
            initialCropStartX + initialCropWidth - 50,
            initialCropStartX + deltaX
          )
        );
        cropWidth = initialCropWidth - (cropStartX - initialCropStartX);
      }

      if (position.includes("e")) {
        cropWidth = Math.max(
          50,
          Math.min(originalImageWidth - cropStartX, initialCropWidth + deltaX)
        );
      }

      updateCropOverlay();
    }

    function endHandler() {
      document.removeEventListener("mousemove", resizeHandler);
      document.removeEventListener("mouseup", endHandler);
      document.removeEventListener("touchmove", resizeHandler);
      document.removeEventListener("touchend", endHandler);
    }

    document.addEventListener("mousemove", resizeHandler);
    document.addEventListener("mouseup", endHandler);
    document.addEventListener("touchmove", resizeHandler, { passive: false });
    document.addEventListener("touchend", endHandler);
  }

  // Function to apply the crop
  function applyCrop() {
    // Create a canvas to crop the image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to crop size
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    // Get the crop preview image
    const cropPreviewImage = document.getElementById("cropPreviewImage");

    // Draw the cropped portion of the image to the canvas
    ctx.drawImage(
      cropPreviewImage,
      cropStartX,
      cropStartY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Update the original preview image with the cropped image
    previewImage.src = canvas.toDataURL("image/jpeg", 0.9);

    // Clean up crop interface
    cleanupCropInterface();

    // Show the updated image
    previewImage.style.display = "block";
  }

  // Function to cancel cropping
  function cancelCrop() {
    cleanupCropInterface();
    previewImage.style.display = "block";
  }

  // Function to clean up crop interface
  function cleanupCropInterface() {
    isCropping = false;

    // Remove crop container and controls
    const cropContainer = document.querySelector(".crop-container");
    const cropControls = document.querySelector(".crop-controls");

    if (cropContainer) cropContainer.remove();
    if (cropControls) cropControls.remove();
  }
});
