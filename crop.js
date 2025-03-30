// Crop functionality for the shoe image editor
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const previewImage = document.getElementById("previewImage");
  const cropBtn = document.getElementById("cropBtn");
  const cropModal = document.getElementById("cropModal");
  const cropContainer = document.getElementById("cropContainer");
  const applyCropBtn = document.getElementById("applyCropBtn");
  const cancelCropBtn = document.getElementById("cancelCropBtn");
  const closeBtn = cropModal.querySelector(".close-btn");

  // Crop state variables
  let isCropping = false;
  let cropStartX, cropStartY, cropWidth, cropHeight;
  let originalImageWidth, originalImageHeight;
  let cropOverlay, cropHandles, cropPreviewImage;
  let originalImageSrc;

  // Add event listener for crop button
  cropBtn.addEventListener("click", startCropping);
  applyCropBtn.addEventListener("click", applyCrop);
  cancelCropBtn.addEventListener("click", cancelCrop);
  closeBtn.addEventListener("click", cancelCrop);

  // Function to start cropping
  function startCropping() {
    // Store original image source
    originalImageSrc = previewImage.src;

    // Show crop modal
    cropModal.style.display = "flex";

    // Clear previous crop container content
    cropContainer.innerHTML = "";

    // Create crop preview image
    cropPreviewImage = document.createElement("img");
    cropPreviewImage.src = previewImage.src;
    cropPreviewImage.id = "cropPreviewImage";
    cropPreviewImage.style.maxWidth = "100%";
    cropPreviewImage.style.maxHeight = "60vh";
    cropPreviewImage.style.display = "block";
    cropPreviewImage.style.margin = "0 auto";

    // Add crop preview image to container
    cropContainer.appendChild(cropPreviewImage);

    // Wait for image to load to get dimensions
    cropPreviewImage.onload = () => {
      // Store original image dimensions
      originalImageWidth = cropPreviewImage.width;
      originalImageHeight = cropPreviewImage.height;

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
        handle.addEventListener("touchstart", startResizing, {
          passive: false,
        });
      });

      // Add crop overlay to container
      cropContainer.appendChild(cropOverlay);

      // Position crop overlay correctly
      const rect = cropPreviewImage.getBoundingClientRect();
      cropOverlay.style.position = "absolute";
      cropOverlay.style.top = `${cropPreviewImage.offsetTop}px`;
      cropOverlay.style.left = `${cropPreviewImage.offsetLeft}px`;

      // Add event listeners for moving the crop area
      cropOverlay.addEventListener("mousedown", startMoving);
      cropOverlay.addEventListener("touchstart", startMoving, {
        passive: false,
      });

      // Set cropping state
      isCropping = true;
    };
  }

  // Function to update crop overlay position and size
  function updateCropOverlay() {
    if (!cropOverlay) return;

    cropOverlay.style.left = `${cropPreviewImage.offsetLeft + cropStartX}px`;
    cropOverlay.style.top = `${cropPreviewImage.offsetTop + cropStartY}px`;
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
    if (!isCropping) return;

    // Create a temporary image to get the natural dimensions
    const tempImg = new Image();
    tempImg.src = originalImageSrc;

    tempImg.onload = () => {
      // Calculate the scaling factor between the displayed image and the natural image
      const scaleX = tempImg.naturalWidth / originalImageWidth;
      const scaleY = tempImg.naturalHeight / originalImageHeight;

      // Create a canvas to crop the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to crop size
      canvas.width = cropWidth * scaleX;
      canvas.height = cropHeight * scaleY;

      // Draw the cropped portion of the image to the canvas
      ctx.drawImage(
        tempImg,
        cropStartX * scaleX,
        cropStartY * scaleY,
        cropWidth * scaleX,
        cropHeight * scaleY,
        0,
        0,
        cropWidth * scaleX,
        cropHeight * scaleY
      );

      // Update the original preview image with the cropped image
      previewImage.src = canvas.toDataURL("image/jpeg", 0.9);

      // Hide crop modal
      cropModal.style.display = "none";

      // Reset cropping state
      isCropping = false;
    };
  }

  // Function to cancel cropping
  function cancelCrop() {
    // Hide crop modal
    cropModal.style.display = "none";

    // Reset cropping state
    isCropping = false;
  }
});
