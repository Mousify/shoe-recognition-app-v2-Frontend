document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const fileInput = document.getElementById("shoeImage");
  const dropZone = document.getElementById("dropZone");
  const browseBtn = document.getElementById("browseBtn");
  const uploadText = document.getElementById("uploadText");
  const previewImage = document.getElementById("previewImage");
  const imageEditorContainer = document.getElementById("imageEditorContainer");
  const submitButton = document.getElementById("submitButton");
  const progressSection = document.getElementById("progressSection");
  const progressBar = document.getElementById("progressBar");
  const statusMessage = document.getElementById("statusMessage");
  const resultSection = document.getElementById("resultSection");
  const resultContainer = document.getElementById("resultContainer");
  const helpToggleBtn = document.getElementById("helpToggleBtn");
  const helpContent = document.getElementById("helpContent");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const shareResultsBtn = document.getElementById("shareResultsBtn");
  const shareModal = document.getElementById("shareModal");
  const productsModal = document.getElementById("productsModal");
  const qualityAlertModal = document.getElementById("qualityAlertModal");
  const qualityIssueMessage = document.getElementById("qualityIssueMessage");
  const retakePhotoBtn = document.getElementById("retakePhotoBtn");
  const languageSelect = document.getElementById("languageSelect");

  // Image editor controls
  const rotateLeftBtn = document.getElementById("rotateLeftBtn");
  const rotateRightBtn = document.getElementById("rotateRightBtn");
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const resetBtn = document.getElementById("resetBtn");

  // Close buttons for modals
  const closeButtons = document.querySelectorAll(".close-btn");

  // State variables
  let currentRotation = 0;
  let currentScale = 1;
  let currentLanguage = "en";
  let products = [];
  let isCropping = false;
  let cropStartX, cropStartY, cropEndX, cropEndY;
  let originalImageSrc = null;

  // Translations
  const translations = {
    en: {
      title: "AI Shoe Assistant",
      uploadText: "Drag & drop your shoe image or click to browse",
      brandLabel: "Brand & Model (optional)",
      brandPlaceholder: "e.g., Nike Air Jordan 1, Adidas Ultraboost",
      problemLabel: "Describe the problem",
      problemPlaceholder: "e.g., Coffee stain on the fabric, scuff marks",
      affectedPartLabel: "Affected part",
      affectedPartPlaceholder: "e.g., Toe area, Heel, Sole",
      analyzeButton: "Analyze Shoe",
      analyzing: "Analyzing your shoe...",
      processingImage: "Processing image...",
      analyzingShoe: "Analyzing shoe details...",
      gettingRecommendations: "Getting recommendations...",
      finalizing: "Finalizing results...",
      resultsTitle: "Analysis Results",
      brandAndModel: "Brand and Model",
      materials: "Materials",
      cleaningRecommendations: "Cleaning Recommendations",
      generalCare: "General Care",
      needHelp: "Need Help?",
      howToUse: "How to Use This Tool",
      faq: "Frequently Asked Questions",
      shareResults: "Share Results",
      recommendedProducts: "Recommended Products",
      imageQualityIssue: "Image Quality Issue",
      retakePhoto: "Upload New Photo",
    },
    ru: {
      title: "ИИ Помощник по Обуви",
      uploadText: "Перетащите изображение обуви или нажмите для выбора",
      brandLabel: "Бренд и модель (необязательно)",
      brandPlaceholder: "например, Nike Air Jordan 1, Adidas Ultraboost",
      problemLabel: "Опишите проблему",
      problemPlaceholder: "например, Пятно кофе на ткани, царапины",
      affectedPartLabel: "Поврежденная часть",
      affectedPartPlaceholder: "например, Носок, Пятка, Подошва",
      analyzeButton: "Анализировать Обувь",
      analyzing: "Анализ вашей обуви...",
      processingImage: "Обработка изображения...",
      analyzingShoe: "Анализ деталей обуви...",
      gettingRecommendations: "Получение рекомендаций...",
      finalizing: "Завершение результатов...",
      resultsTitle: "Результаты Анализа",
      brandAndModel: "Бренд и Модель",
      materials: "Материалы",
      cleaningRecommendations: "Рекомендации по Чистке",
      generalCare: "Общий Уход",
      needHelp: "Нужна Помощь?",
      howToUse: "Как Использовать Этот Инструмент",
      faq: "Часто Задаваемые Вопросы",
      shareResults: "Поделиться Результатами",
      recommendedProducts: "Рекомендуемые Продукты",
      imageQualityIssue: "Проблема с Качеством Изображения",
      retakePhoto: "Загрузить Новое Фото",
    },
    lt: {
      title: "AI Batų Asistentas",
      uploadText: "Tempkite batų nuotrauką arba spustelėkite naršyti",
      brandLabel: "Prekės ženklas ir modelis (neprivaloma)",
      brandPlaceholder: "pvz., Nike Air Jordan 1, Adidas Ultraboost",
      problemLabel: "Aprašykite problemą",
      problemPlaceholder: "pvz., Kavos dėmė ant audinio, įbrėžimai",
      affectedPartLabel: "Paveikta dalis",
      affectedPartPlaceholder: "pvz., Pirštų sritis, Kulnas, Padas",
      analyzeButton: "Analizuoti Batus",
      analyzing: "Analizuojami jūsų batai...",
      processingImage: "Apdorojamas vaizdas...",
      analyzingShoe: "Analizuojamos batų detalės...",
      gettingRecommendations: "Gaunamos rekomendacijos...",
      finalizing: "Baigiami rezultatai...",
      resultsTitle: "Analizės Rezultatai",
      brandAndModel: "Prekės ženklas ir Modelis",
      materials: "Medžiagos",
      cleaningRecommendations: "Valymo Rekomendacijos",
      generalCare: "Bendra Priežiūra",
      needHelp: "Reikia Pagalbos?",
      howToUse: "Kaip Naudotis Šiuo Įrankiu",
      faq: "Dažnai Užduodami Klausimai",
      shareResults: "Dalintis Rezultatais",
      recommendedProducts: "Rekomenduojami Produktai",
      imageQualityIssue: "Vaizdo Kokybės Problema",
      retakePhoto: "Įkelti Naują Nuotrauką",
    },
  };

  // Initialize language
  function updateLanguage(lang) {
    currentLanguage = lang;
    const text = translations[lang] || translations.en;

    // Update UI text
    document.querySelector("h1").textContent = text.title;
    uploadText.textContent = text.uploadText;
    document.querySelector('label[for="shoeBrand"] span').textContent =
      text.brandLabel;
    document.getElementById("shoeBrand").placeholder = text.brandPlaceholder;
    document.querySelector('label[for="problemDescription"] span').textContent =
      text.problemLabel;
    document.getElementById("problemDescription").placeholder =
      text.problemPlaceholder;
    document.querySelector('label[for="affectedPart"] span').textContent =
      text.affectedPartLabel;
    document.getElementById("affectedPart").placeholder =
      text.affectedPartPlaceholder;
    submitButton.innerHTML = `<i class="fas fa-magic"></i> ${text.analyzeButton}`;
    helpToggleBtn.innerHTML = `<i class="fas fa-question-circle"></i> ${text.needHelp}`;
    document.querySelector(".result-header h2").textContent = text.resultsTitle;

    // Update other text elements as needed
  }

  // Event Listeners

  // Language selector
  languageSelect.addEventListener("change", (e) => {
    updateLanguage(e.target.value);
  });

  // File input change
  fileInput.addEventListener("change", handleFileSelect);

  // Drag and drop functionality
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");

    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      handleFileSelect();
    }
  });

  // Click on drop zone to trigger file input
  dropZone.addEventListener("click", () => {
    fileInput.click();
  });

  // Browse button click
  browseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Image editor controls
  rotateLeftBtn.addEventListener("click", () => {
    currentRotation -= 90;
    updateImageTransform();
  });

  rotateRightBtn.addEventListener("click", () => {
    currentRotation += 90;
    updateImageTransform();
  });

  // Replace zoom buttons with crop functionality
  const cropBtn = document.getElementById("cropBtn");
  cropBtn.addEventListener("click", () => {
    if (!isCropping) {
      startCropping();
    } else {
      finishCropping();
    }
  });

  resetBtn.addEventListener("click", () => {
    resetImageEditing();
  });

  // Submit button click
  submitButton.addEventListener("click", analyzeShoe);

  // Help toggle
  helpToggleBtn.addEventListener("click", () => {
    helpContent.style.display =
      helpContent.style.display === "none" ? "block" : "none";
  });

  // Download PDF button
  downloadPdfBtn.addEventListener("click", generatePDF);

  // Share results button
  shareResultsBtn.addEventListener("click", () => {
    shareModal.style.display = "flex";
  });

  // Retake photo button
  retakePhotoBtn.addEventListener("click", () => {
    qualityAlertModal.style.display = "none";
    resetUploadSection();
  });

  // Close modal buttons
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      shareModal.style.display = "none";
      productsModal.style.display = "none";
      qualityAlertModal.style.display = "none";
    });
  });

  // Share buttons
  document
    .querySelector(".share-btn.facebook")
    .addEventListener("click", () => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`,
        "_blank"
      );
    });

  document.querySelector(".share-btn.twitter").addEventListener("click", () => {
    window.open(
      `https://twitter.com/intent/tweet?text=Check out my shoe analysis!&url=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  });

  document.querySelector(".share-btn.email").addEventListener("click", () => {
    window.location.href = `mailto:?subject=Shoe Analysis Results&body=Check out my shoe analysis: ${encodeURIComponent(
      window.location.href
    )}`;
  });

  document.querySelector(".share-btn.copy").addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  });

  // Functions

  // Handle file selection
  function handleFileSelect() {
    const file = fileInput.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File is too large. Maximum size is 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        // Show image preview
        previewImage.src = e.target.result;
        dropZone.style.display = "none";
        imageEditorContainer.style.display = "block";

        // Enable submit button
        submitButton.disabled = false;

        // Check image quality
        checkImageQuality(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Update image transform for editing
  function updateImageTransform() {
    previewImage.style.transform = `rotate(${currentRotation}deg)`;
  }

  // Check image quality
  function checkImageQuality(dataUrl) {
    // We'll rely on the backend for image quality analysis
    // This function now just displays the image preview
    const img = new Image();
    img.onload = () => {
      // Just set up the preview, no quality checks here
      previewImage.src = dataUrl;
      dropZone.style.display = "none";
      imageEditorContainer.style.display = "block";

      // Enable submit button
      submitButton.disabled = false;
    };
    img.src = dataUrl;
  }

  // Detect blur in image
  function detectBlur(imageData) {
    // Simple Laplacian filter for edge detection
    // High edge values indicate sharp image, low values indicate blur
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    let edgeSum = 0;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const grayValue =
          0.3 * data[idx] + 0.59 * data[idx + 1] + 0.11 * data[idx + 2];

        // Get surrounding pixels
        const idxTop = ((y - 1) * width + x) * 4;
        const idxBottom = ((y + 1) * width + x) * 4;
        const idxLeft = (y * width + (x - 1)) * 4;
        const idxRight = (y * width + (x + 1)) * 4;

        const grayTop =
          0.3 * data[idxTop] +
          0.59 * data[idxTop + 1] +
          0.11 * data[idxTop + 2];
        const grayBottom =
          0.3 * data[idxBottom] +
          0.59 * data[idxBottom + 1] +
          0.11 * data[idxBottom + 2];
        const grayLeft =
          0.3 * data[idxLeft] +
          0.59 * data[idxLeft + 1] +
          0.11 * data[idxLeft + 2];
        const grayRight =
          0.3 * data[idxRight] +
          0.59 * data[idxRight + 1] +
          0.11 * data[idxRight + 2];

        // Laplacian filter
        const edge = Math.abs(
          4 * grayValue - grayTop - grayBottom - grayLeft - grayRight
        );
        edgeSum += edge;
      }
    }

    // Normalize edge sum
    const normalizedEdgeSum = edgeSum / (width * height);

    // Return blur score (inverse of edge detection)
    return 1 - Math.min(normalizedEdgeSum / 20, 1);
  }

  // Show quality alert
  function showQualityAlert(message) {
    qualityIssueMessage.textContent = message;
    qualityAlertModal.style.display = "flex";
  }

  // Reset upload section
  function resetUploadSection() {
    fileInput.value = "";
    previewImage.src = "";
    dropZone.style.display = "block";
    imageEditorContainer.style.display = "none";
    submitButton.disabled = true;
    currentRotation = 0;
    currentScale = 1;
  }

  // Analyze shoe
  async function analyzeShoe() {
    const problemDescription =
      document.getElementById("problemDescription").value;
    const affectedPart = document.getElementById("affectedPart").value;
    const shoeBrand = document.getElementById("shoeBrand").value;

    if (!fileInput.files[0]) {
      alert("Please select an image first!");
      return;
    }

    // Show progress section
    progressSection.style.display = "block";
    resultSection.style.display = "none";

    // Update progress bar and status message
    updateProgress(0, translations[currentLanguage].processingImage);

    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(fileInput.files[0]);

      // Update progress
      updateProgress(25, translations[currentLanguage].analyzingShoe);

      // Backend URL
      const backendURL =
        "https://shoe-recognition-app-v2-backend.onrender.com/analyze-shoe";

      // Send request to backend
      const response = await fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64Image: base64Image,
          problemDescription: problemDescription,
          affectedPart: affectedPart,
          brand: shoeBrand,
          language: currentLanguage,
        }),
      });

      // Update progress
      updateProgress(75, translations[currentLanguage].gettingRecommendations);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the response indicates an image quality issue
      if (data.error === "image_quality") {
        // Show quality alert
        showQualityAlert(data.message);
        progressSection.style.display = "none";
        return;
      }

      // Update progress
      updateProgress(90, translations[currentLanguage].finalizing);

      // Fetch product recommendations
      await fetchProductRecommendations(data);

      // Display results
      displayResults(data);

      // Complete progress
      updateProgress(100, "Complete!");

      // Hide progress section and show results
      setTimeout(() => {
        progressSection.style.display = "none";
        resultSection.style.display = "block";
      }, 500);
    } catch (error) {
      console.error("Error:", error);
      progressSection.style.display = "none";
      alert(`Error: ${error.message}`);
    }
  }

  // Update progress bar and status message
  function updateProgress(percent, message) {
    progressBar.style.width = `${percent}%`;
    statusMessage.textContent = message;

    // Update progress stages
    const stages = document.querySelectorAll(".progress-stage");
    stages.forEach((stage) => {
      stage.classList.remove("active");
      const stageValue = Number.parseInt(stage.getAttribute("data-stage"));
      if (percent >= stageValue * 25) {
        stage.classList.add("active");
      }
    });
  }

  // Convert image to base64
  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Apply rotation and scaling
        let width = img.width;
        let height = img.height;

        // Swap dimensions if rotated by 90 or 270 degrees
        if (
          Math.abs(currentRotation % 360) === 90 ||
          Math.abs(currentRotation % 360) === 270
        ) {
          [width, height] = [height, width];
        }

        canvas.width = width;
        canvas.height = height;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move to center, rotate, scale, and draw
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((currentRotation * Math.PI) / 180);
        ctx.scale(currentScale, currentScale);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        // Get base64 data
        const base64Data = canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
        resolve(base64Data);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  // Fetch product recommendations
  async function fetchProductRecommendations(data) {
    try {
      // Use the in-memory products instead of fetching from a file
      if (window.sampleProducts) {
        products = window.sampleProducts;
        return;
      }

      // Fallback to fetch if needed
      const response = await fetch(window.productsJsonUrl || "products.json");
      if (response.ok) {
        products = await response.json();
      } else {
        console.error("Failed to load product recommendations");
        products = [];
      }
    } catch (error) {
      console.error("Error fetching product recommendations:", error);
      products = [];
    }
  }

  // Display results
  function displayResults(data) {
    // Check if data is a string and parse it if necessary
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    const text = translations[currentLanguage];

    // Create HTML for results
    let resultsHTML = `
      <div class="result-item">
        <h3>${text.brandAndModel}</h3>
        <p class="highlight">${data.brandAndModel || "Not Available"}</p>
      </div>
      
      <div class="result-item">
        <h3>${text.materials}</h3>
        <div class="materials-grid">
    `;

    // Add materials
    if (data.materials && Object.keys(data.materials).length > 0) {
      Object.entries(data.materials).forEach(([part, material]) => {
        if (material) {
          resultsHTML += `
            <div class="material-item">
              <span class="material-part">${
                part.charAt(0).toUpperCase() + part.slice(1)
              }</span>
              <span>${material}</span>
            </div>
          `;
        }
      });
    } else {
      resultsHTML += `<p>No material information available.</p>`;
    }

    resultsHTML += `
        </div>
      </div>
      
      <div class="result-item">
        <h3>${text.cleaningRecommendations}</h3>
    `;

    // Add cleaning recommendations
    if (
      data.cleaningRecommendations &&
      data.cleaningRecommendations.length > 0
    ) {
      data.cleaningRecommendations.forEach((rec) => {
        resultsHTML += `
          <div class="recommendation-item">
            <h4>${rec.affectedPart}</h4>
            <ul>
        `;

        rec.recommendations.forEach((r) => {
          resultsHTML += `<li>${r}</li>`;
        });

        resultsHTML += `
            </ul>
          </div>
        `;
      });
    } else {
      resultsHTML += `<p>No cleaning recommendations available.</p>`;
    }

    resultsHTML += `
      </div>
      
      <div class="result-item">
        <h3>${text.generalCare}</h3>
    `;

    // Add general care tips
    if (data.generalCare && data.generalCare.length > 0) {
      resultsHTML += `<ul>`;
      data.generalCare.forEach((care) => {
        resultsHTML += `<li>${care}</li>`;
      });
      resultsHTML += `</ul>`;
    } else {
      resultsHTML += `<p>No general care information available.</p>`;
    }

    resultsHTML += `
      </div>
      
      <div class="result-item">
        <button id="viewProductsBtn" class="button primary-btn">
          <i class="fas fa-shopping-cart"></i> View Recommended Products
        </button>
      </div>
    `;

    // Set HTML content
    resultContainer.innerHTML = resultsHTML;

    // Add event listener for product recommendations button
    document
      .getElementById("viewProductsBtn")
      .addEventListener("click", showProductRecommendations);
  }

  // Show product recommendations
  function showProductRecommendations() {
    const productsList = document.getElementById("productsList");

    // Clear previous products
    productsList.innerHTML = "";

    if (products && products.length > 0) {
      // Display products
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
        <img src="${product.image}" alt="${
          product.title
        }" class="product-image" onerror="this.src='https://via.placeholder.com/200x150?text=No+Image'">
        <div class="product-info">
          <h4 class="product-title">${product.title}</h4>
          ${
            product.vendor
              ? `<p class="product-vendor">${product.vendor}</p>`
              : ""
          }
          <p class="product-price">${product.price}</p>
          <button class="product-btn" onclick="window.open('${
            product.url
          }', '_blank')">View Product</button>
        </div>
      `;

        productsList.appendChild(productCard);
      });
    } else {
      // No products available
      productsList.innerHTML = "<p>No product recommendations available.</p>";
    }

    // Show modal
    productsModal.style.display = "flex";
  }

  // Generate PDF
  function generatePDF() {
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;

    // Create new PDF document
    const doc = new jsPDF();

    // Get result container
    const element = resultContainer;

    // Use html2canvas to capture the element
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 190;
      const pageHeight = 290;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      // Add image to PDF
      doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      doc.save("shoe-analysis.pdf");
    });
  }

  // Initialize

  // Add these new functions for cropping
  function startCropping() {
    isCropping = true;
    cropBtn.innerHTML = '<i class="fas fa-check"></i>';
    cropBtn.title = "Apply Crop";

    // Save original image for reset
    if (!originalImageSrc) {
      originalImageSrc = previewImage.src;
    }

    // Create crop overlay
    const overlay = document.createElement("div");
    overlay.id = "cropOverlay";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.cursor = "crosshair";

    // Add crop selection box
    const selection = document.createElement("div");
    selection.id = "cropSelection";
    selection.style.position = "absolute";
    selection.style.border = "2px dashed white";
    selection.style.display = "none";

    overlay.appendChild(selection);
    document.querySelector(".image-preview-wrapper").style.position =
      "relative";
    document.querySelector(".image-preview-wrapper").appendChild(overlay);

    // Add event listeners for crop selection
    overlay.addEventListener("mousedown", startCropSelection);
    overlay.addEventListener("mousemove", updateCropSelection);
    overlay.addEventListener("mouseup", endCropSelection);

    // Touch events for mobile
    overlay.addEventListener("touchstart", handleTouchStart);
    overlay.addEventListener("touchmove", handleTouchMove);
    overlay.addEventListener("touchend", handleTouchEnd);
  }

  function startCropSelection(e) {
    if (!isCropping) return;

    const rect = e.target.getBoundingClientRect();
    cropStartX = e.clientX - rect.left;
    cropStartY = e.clientY - rect.top;

    const selection = document.getElementById("cropSelection");
    selection.style.left = cropStartX + "px";
    selection.style.top = cropStartY + "px";
    selection.style.width = "0";
    selection.style.height = "0";
    selection.style.display = "block";
  }

  function updateCropSelection(e) {
    if (!isCropping || cropStartX === undefined) return;

    const rect = e.target.getBoundingClientRect();
    cropEndX = e.clientX - rect.left;
    cropEndY = e.clientY - rect.top;

    const selection = document.getElementById("cropSelection");
    const left = Math.min(cropStartX, cropEndX);
    const top = Math.min(cropStartY, cropEndY);
    const width = Math.abs(cropEndX - cropStartX);
    const height = Math.abs(cropEndY - cropStartY);

    selection.style.left = left + "px";
    selection.style.top = top + "px";
    selection.style.width = width + "px";
    selection.style.height = height + "px";
  }

  function endCropSelection() {
    if (!isCropping || cropStartX === undefined) return;

    // Selection is complete, but we don't apply it until the user clicks "Apply Crop"
  }

  function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    startCropSelection(mouseEvent);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    updateCropSelection(mouseEvent);
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    endCropSelection();
  }

  function finishCropping() {
    if (!cropStartX || !cropEndX) {
      // No selection made
      cancelCropping();
      return;
    }

    // Apply the crop
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate crop dimensions
      const imgWidth = img.width;
      const imgHeight = img.height;
      const previewWidth = previewImage.width;
      const previewHeight = previewImage.height;

      // Scale factors
      const scaleX = imgWidth / previewWidth;
      const scaleY = imgHeight / previewHeight;

      // Calculate crop area in original image coordinates
      const left = Math.min(cropStartX, cropEndX) * scaleX;
      const top = Math.min(cropStartY, cropEndY) * scaleY;
      const width = Math.abs(cropEndX - cropStartX) * scaleX;
      const height = Math.abs(cropEndY - cropStartY) * scaleY;

      // Set canvas size to crop size
      canvas.width = width;
      canvas.height = height;

      // Draw cropped image
      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);

      // Update preview with cropped image
      previewImage.src = canvas.toDataURL("image/jpeg");

      // Clean up
      cancelCropping();
    };

    img.src = previewImage.src;
  }

  function cancelCropping() {
    isCropping = false;
    cropBtn.innerHTML = '<i class="fas fa-crop-alt"></i>';
    cropBtn.title = "Crop Image";

    // Remove crop overlay
    const overlay = document.getElementById("cropOverlay");
    if (overlay) {
      overlay.remove();
    }

    // Reset crop coordinates
    cropStartX = cropStartY = cropEndX = cropEndY = undefined;
  }

  function resetImageEditing() {
    // Reset rotation
    currentRotation = 0;

    // Reset image to original
    if (originalImageSrc) {
      previewImage.src = originalImageSrc;
    }

    // Cancel cropping if active
    if (isCropping) {
      cancelCropping();
    }

    // Reset transform
    updateImageTransform();
  }

  function init() {
    // Load initial language
    updateLanguage(languageSelect.value);

    // Disable submit button initially
    submitButton.disabled = true;

    // Create products.json file with sample data
    createSampleProductsFile();
  }

  // Create sample products file
  function createSampleProductsFile() {
    // Sample product data
    const sampleProducts = [
      {
        id: 1,
        title: "Shoe Cleaner Kit",
        price: "$19.99",
        image: "https://via.placeholder.com/200x150?text=Shoe+Cleaner+Kit",
      },
      {
        id: 2,
        title: "Leather Conditioner",
        price: "$12.99",
        image: "https://via.placeholder.com/200x150?text=Leather+Conditioner",
      },
      {
        id: 3,
        title: "Suede Brush",
        price: "$8.99",
        image: "https://via.placeholder.com/200x150?text=Suede+Brush",
      },
      {
        id: 4,
        title: "Water Repellent Spray",
        price: "$14.99",
        image: "https://via.placeholder.com/200x150?text=Water+Repellent",
      },
    ];

    // Store in window object instead of downloading
    window.sampleProducts = sampleProducts;

    // Create a hidden products.json file in memory
    const blob = new Blob([JSON.stringify(sampleProducts)], {
      type: "application/json",
    });
    window.productsJsonUrl = URL.createObjectURL(blob);

    console.log("Sample products loaded in memory");
  }

  // Initialize the app
  init();
});
