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

  // Translations
  const translations = {
    en: {
      title: "AI Shoe Assistant",
      uploadText: "Drag & drop your shoe image or click to browse",
      brandLabel: "Brand (optional)",
      brandPlaceholder: "e.g., Nike, Adidas, Puma",
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
    es: {
      title: "Asistente de Calzado IA",
      uploadText: "Arrastra y suelta tu imagen o haz clic para buscar",
      brandLabel: "Marca (opcional)",
      brandPlaceholder: "ej., Nike, Adidas, Puma",
      problemLabel: "Describe el problema",
      problemPlaceholder: "ej., Mancha de café en la tela, marcas de rozaduras",
      affectedPartLabel: "Parte afectada",
      affectedPartPlaceholder: "ej., Área del dedo del pie, Talón, Suela",
      analyzeButton: "Analizar Calzado",
      analyzing: "Analizando tu calzado...",
      processingImage: "Procesando imagen...",
      analyzingShoe: "Analizando detalles del calzado...",
      gettingRecommendations: "Obteniendo recomendaciones...",
      finalizing: "Finalizando resultados...",
      resultsTitle: "Resultados del Análisis",
      brandAndModel: "Marca y Modelo",
      materials: "Materiales",
      cleaningRecommendations: "Recomendaciones de Limpieza",
      generalCare: "Cuidado General",
      needHelp: "¿Necesitas Ayuda?",
      howToUse: "Cómo Usar Esta Herramienta",
      faq: "Preguntas Frecuentes",
      shareResults: "Compartir Resultados",
      recommendedProducts: "Productos Recomendados",
      imageQualityIssue: "Problema de Calidad de Imagen",
      retakePhoto: "Subir Nueva Foto",
    },
    // Add more languages as needed
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

  zoomInBtn.addEventListener("click", () => {
    currentScale += 0.1;
    updateImageTransform();
  });

  zoomOutBtn.addEventListener("click", () => {
    if (currentScale > 0.5) {
      currentScale -= 0.1;
      updateImageTransform();
    }
  });

  resetBtn.addEventListener("click", () => {
    currentRotation = 0;
    currentScale = 1;
    updateImageTransform();
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
    previewImage.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
  }

  // Check image quality
  function checkImageQuality(dataUrl) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Check image brightness
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let brightness = 0;

      // Calculate average brightness
      for (let i = 0; i < data.length; i += 4) {
        brightness += 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      }

      brightness = brightness / (data.length / 4) / 255;

      // Check image resolution
      const resolution = img.width * img.height;
      const minResolution = 100000; // 100k pixels (e.g., 316x316)

      // Check image blur
      const blurScore = detectBlur(imageData);

      // Show quality alert if issues detected
      if (brightness < 0.3) {
        showQualityAlert(
          "Your photo appears to be too dark. For best results, please take a photo in better lighting."
        );
      } else if (brightness > 0.9) {
        showQualityAlert(
          "Your photo appears to be overexposed. For best results, please take a photo with less bright lighting."
        );
      } else if (resolution < minResolution) {
        showQualityAlert(
          "Your photo resolution is too low. For best results, please use a higher quality image."
        );
      } else if (blurScore > 0.5) {
        showQualityAlert(
          "Your photo appears to be blurry. For best results, please take a clearer photo."
        );
      }
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
      // In a real implementation, you would fetch from your product database
      // For now, we'll simulate with sample data
      const response = await fetch("products.json");
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

    if (products.length > 0) {
      // Display products
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="product-image">
          <div class="product-info">
            <h4 class="product-title">${product.title}</h4>
            <p class="product-price">${product.price}</p>
            <button class="product-btn">View Product</button>
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

    // Create Blob and save as file
    const blob = new Blob([JSON.stringify(sampleProducts)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    // Create link to download file
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Initialize the app
  init();
});
