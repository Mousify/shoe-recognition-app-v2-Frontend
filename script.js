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
  const resetBtn = document.getElementById("resetBtn");

  // Close buttons for modals
  const closeButtons = document.querySelectorAll(".close-btn");

  // State variables
  let currentRotation = 0;
  let currentScale = 1;
  let currentLanguage = "en";
  let products = [];
  let originalImageSrc = null;

  // Update the translations object to include all UI elements
  const translations = {
    en: {
      title: "AI Shoe Assistant",
      uploadText: "Drag & drop your shoe image or click to browse",
      browseBtn: "Browse Files",
      brandLabel: "Brand & Model (optional)",
      brandPlaceholder: "e.g., Nike Air Jordan 1, Adidas Ultraboost",
      problemLabel: "Describe the problem",
      problemPlaceholder: "e.g., Coffee stain on the fabric, scuff marks",
      affectedPartLabel: "Affected part",
      affectedPartPlaceholder: "e.g., Toe area, Heel, Sole",
      analyzeButton: "Analyze Shoe",
      retakePhoto: "Retake Photo",
      editPhoto: "Edit Photo",
      doneEditing: "Done",
      analyzing: "Analyzing your shoe...",
      processingImage: "Processing image...",
      analyzingShoe: "Analyzing shoe details...",
      gettingRecommendations: "Getting recommendations...",
      finalizing: "Finalizing results...",
      analysisComplete: "Analysis Complete",
      resultsTitle: "Analysis Results",
      brandAndModel: "Brand and Model",
      materials: "Materials",
      cleaningRecommendations: "Cleaning Recommendations",
      generalCare: "General Care",
      needHelp: "Need Help?",
      howToUse: "How to Use This Tool",
      howToUseSteps: [
        "Upload a clear photo of your shoe by dragging and dropping or browsing files",
        "Optionally enter the brand and model for better recognition",
        "Describe the problem with your shoe",
        "Specify which part of the shoe is affected",
        'Click "Analyze Shoe" to get personalized care recommendations',
      ],
      faq: "Frequently Asked Questions",
      faqItems: [
        {
          question: "What types of shoes can I analyze?",
          answer:
            "Our AI can recognize and provide recommendations for most types of footwear including sneakers, dress shoes, boots, and sandals.",
        },
        {
          question: "How accurate is the recognition?",
          answer:
            "The accuracy depends on image quality and clarity. For best results, use a well-lit photo showing the entire shoe.",
        },
      ],
      shareResults: "Share Results",
      recommendedProducts: "Recommended Products",
      imageQualityIssue: "Image Quality Issue",
      uploadNewPhoto: "Upload New Photo",
      tryTextOnly: "Try with text only",
      tooltips: {
        brand: "Providing the brand and model can improve recognition accuracy",
        problem: "Describe what's wrong with your shoes",
        affectedPart: "Specify which part of the shoe is affected",
      },
      footer: "© 2024 AI Shoe Assistant. All rights reserved.",
      viewProduct: "View Product",
      noProducts: "No product recommendations available.",
      needImageOrBrand:
        "Please provide either an image or brand/model information",
    },
    ru: {
      title: "ИИ Помощник по Обуви",
      uploadText: "Перетащите изображение обуви или нажмите для выбора",
      browseBtn: "Выбрать Файлы",
      brandLabel: "Бренд и модель (необязательно)",
      brandPlaceholder: "например, Nike Air Jordan 1, Adidas Ultraboost",
      problemLabel: "Опишите проблему",
      problemPlaceholder: "например, Пятно кофе на ткани, царапины",
      affectedPartLabel: "Поврежденная часть",
      affectedPartPlaceholder: "например, Носок, Пятка, Подошва",
      analyzeButton: "Анализировать Обувь",
      retakePhoto: "Сделать Новое Фото",
      editPhoto: "Редактировать Фото",
      doneEditing: "Готово",
      analyzing: "Анализ вашей обуви...",
      processingImage: "Обработка изображения...",
      analyzingShoe: "Анализ деталей обуви...",
      gettingRecommendations: "Получение рекомендаций...",
      finalizing: "Завершение результатов...",
      analysisComplete: "Анализ Завершен",
      resultsTitle: "Результаты Анализа",
      brandAndModel: "Бренд и Модель",
      materials: "Материалы",
      cleaningRecommendations: "Рекомендации по Чистке",
      generalCare: "Общий Уход",
      needHelp: "Нужна Помощь?",
      howToUse: "Как Использовать Этот Инструмент",
      howToUseSteps: [
        "Загрузите четкую фотографию обуви, перетащив ее или выбрав файл",
        "При желании укажите бренд и модель для лучшего распознавания",
        "Опишите проблему с вашей обувью",
        "Укажите, какая часть обуви повреждена",
        'Нажмите "Анализировать Обувь", чтобы получить персонализированные рекомендации по уходу',
      ],
      faq: "Часто Задаваемые Вопросы",
      faqItems: [
        {
          question: "Какие типы обуви я могу анализировать?",
          answer:
            "Наш ИИ может распознавать и предоставлять рекомендации для большинства типов обуви, включая кроссовки, классическую обувь, ботинки и сандалии.",
        },
        {
          question: "Насколько точно распознавание?",
          answer:
            "Точность зависит от качества и четкости изображения. Для лучших результатов используйте хорошо освещенную фотографию, показывающую всю обувь.",
        },
      ],
      shareResults: "Поделиться Результатами",
      recommendedProducts: "Рекомендуемые Продукты",
      imageQualityIssue: "Проблема с Качеством Изображения",
      uploadNewPhoto: "Загрузить Новое Фото",
      tryTextOnly: "Попробовать только с текстом",
      tooltips: {
        brand: "Указание бренда и модели может улучшить точность распознавания",
        problem: "Опишите, что не так с вашей обувью",
        affectedPart: "Укажите, какая часть обуви повреждена",
      },
      footer: "© 2024 ИИ Помощник по Обуви. Все права защищены.",
      viewProduct: "Посмотреть Товар",
      noProducts: "Нет доступных рекомендаций по товарам.",
      needImageOrBrand:
        "Пожалуйста, предоставьте изображение или информацию о бренде/модели",
    },
    lt: {
      title: "AI Batų Asistentas",
      uploadText: "Tempkite batų nuotrauką arba spustelėkite naršyti",
      browseBtn: "Naršyti Failus",
      brandLabel: "Prekės ženklas ir modelis (neprivaloma)",
      brandPlaceholder: "pvz., Nike Air Jordan 1, Adidas Ultraboost",
      problemLabel: "Aprašykite problemą",
      problemPlaceholder: "pvz., Kavos dėmė ant audinio, įbrėžimai",
      affectedPartLabel: "Paveikta dalis",
      affectedPartPlaceholder: "pvz., Pirštų sritis, Kulnas, Padas",
      analyzeButton: "Analizuoti Batus",
      retakePhoto: "Perkrauti Nuotrauką",
      editPhoto: "Redaguoti Nuotrauką",
      doneEditing: "Baigta",
      analyzing: "Analizuojami jūsų batai...",
      processingImage: "Apdorojamas vaizdas...",
      analyzingShoe: "Analizuojamos batų detalės...",
      gettingRecommendations: "Gaunamos rekomendacijos...",
      finalizing: "Baigiami rezultatai...",
      analysisComplete: "Analizė Baigta",
      resultsTitle: "Analizės Rezultatai",
      brandAndModel: "Prekės ženklas ir Modelis",
      materials: "Medžiagos",
      cleaningRecommendations: "Valymo Rekomendacijos",
      generalCare: "Bendra Priežiūra",
      needHelp: "Reikia Pagalbos?",
      howToUse: "Kaip Naudotis Šiuo Įrankiu",
      howToUseSteps: [
        "Įkelkite aiškią batų nuotrauką tempiant arba naršant failus",
        "Pasirinktinai įveskite prekės ženklą ir modelį geresniam atpažinimui",
        "Aprašykite problemą su savo batais",
        "Nurodykite, kuri batų dalis yra paveikta",
        'Spustelėkite "Analizuoti Batus", kad gautumėte asmenines priežiūros rekomendacijas',
      ],
      faq: "Dažnai Užduodami Klausimai",
      faqItems: [
        {
          question: "Kokius batų tipus galiu analizuoti?",
          answer:
            "Mūsų AI gali atpažinti ir pateikti rekomendacijas daugumai avalynės tipų, įskaitant sportinius batelius, klasikinius batus, aulinius ir sandalus.",
        },
        {
          question: "Koks yra atpažinimo tikslumas?",
          answer:
            "Tikslumas priklauso nuo vaizdo kokybės ir aiškumo. Geriausiems rezultatams naudokite gerai apšviestą nuotrauką, rodančią visą batą.",
        },
      ],
      shareResults: "Dalintis Rezultatais",
      recommendedProducts: "Rekomenduojami Produktai",
      imageQualityIssue: "Vaizdo Kokybės Problema",
      uploadNewPhoto: "Įkelti Naują Nuotrauką",
      tryTextOnly: "Bandyti tik su tekstu",
      tooltips: {
        brand:
          "Prekės ženklo ir modelio nurodymas gali pagerinti atpažinimo tikslumą",
        problem: "Aprašykite, kas negerai su jūsų batais",
        affectedPart: "Nurodykite, kuri batų dalis yra paveikta",
      },
      footer: "© 2024 AI Batų Asistentas. Visos teisės saugomos.",
      viewProduct: "Peržiūrėti Produktą",
      noProducts: "Nėra rekomenduojamų produktų.",
      needImageOrBrand:
        "Pateikite nuotrauką arba prekės ženklo/modelio informaciją",
    },
  };

  // Initialize language
  // Update the updateLanguage function to handle all translated elements
  function updateLanguage(lang) {
    currentLanguage = lang;
    const text = translations[lang] || translations.en;

    // Update UI text
    document.querySelector("h1").textContent = text.title;
    uploadText.textContent = text.uploadText;
    browseBtn.textContent = text.browseBtn;

    // Update labels and placeholders
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

    // Update buttons
    submitButton.innerHTML = `<i class="fas fa-magic"></i> ${text.analyzeButton}`;
    helpToggleBtn.innerHTML = `<i class="fas fa-question-circle"></i> ${text.needHelp}`;
    document.querySelector(".result-header h2").textContent = text.resultsTitle;

    // Update tooltips
    document
      .querySelector('label[for="shoeBrand"] .tooltip-icon')
      .setAttribute("data-tooltip", text.tooltips.brand);
    document
      .querySelector('label[for="problemDescription"] .tooltip-icon')
      .setAttribute("data-tooltip", text.tooltips.problem);
    document
      .querySelector('label[for="affectedPart"] .tooltip-icon')
      .setAttribute("data-tooltip", text.tooltips.affectedPart);

    // Update footer
    document.querySelector("footer p").textContent = text.footer;

    // Update help content
    document.querySelector(".help-content h3:first-child").textContent =
      text.howToUse;
    const helpSteps = document.querySelector(".help-content ol");
    helpSteps.innerHTML = "";
    text.howToUseSteps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      helpSteps.appendChild(li);
    });

    document.querySelector(".help-content h3:nth-child(3)").textContent =
      text.faq;
    const faqContainer = document.querySelector(".help-content");
    const faqItems = faqContainer.querySelectorAll(".faq-item");

    // Remove existing FAQ items
    faqItems.forEach((item) => item.remove());

    // Add new translated FAQ items
    text.faqItems.forEach((faqItem) => {
      const faqDiv = document.createElement("div");
      faqDiv.className = "faq-item";

      const question = document.createElement("h4");
      question.textContent = faqItem.question;

      const answer = document.createElement("p");
      answer.textContent = faqItem.answer;

      faqDiv.appendChild(question);
      faqDiv.appendChild(answer);
      faqContainer.appendChild(faqDiv);
    });

    // Update modals
    document.querySelector("#qualityAlertModal h3").textContent =
      text.imageQualityIssue;
    retakePhotoBtn.textContent = text.uploadNewPhoto;

    // Update product recommendations
    document.querySelector("#productsModal h3").textContent =
      text.recommendedProducts;
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

  // Replace crop button with retake photo button
  retakePhotoBtn.addEventListener("click", () => {
    resetUploadSection();
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
        // Save original image for reset
        originalImageSrc = e.target.result;

        // Show image preview
        previewImage.src = e.target.result;
        dropZone.style.display = "none";
        imageEditorContainer.style.display = "block";

        // Enable submit button
        submitButton.disabled = false;

        // Reset rotation
        currentRotation = 0;
        updateImageTransform();
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
    const text = translations[currentLanguage];

    // Create a more user-friendly message with additional tips
    let enhancedMessage = message;

    // Add tips for common issues
    if (message.toLowerCase().includes("blurry")) {
      enhancedMessage = `${message} Try taking a photo with better lighting and make sure your camera lens is clean.`;
    } else if (message.toLowerCase().includes("dark")) {
      enhancedMessage = `${message} Try taking a photo in a well-lit area or use additional lighting.`;
    } else if (message.toLowerCase().includes("resolution")) {
      enhancedMessage = `${message} Try taking a photo closer to the shoe or use a camera with higher resolution.`;
    }

    // Add text-only option suggestion
    enhancedMessage += `\n\nIf you continue to experience issues, you can try analyzing your shoe using just the brand and model information.`;

    // Update the modal content
    qualityIssueMessage.textContent = enhancedMessage;

    // Add a "Try with text only" button if not already present
    const tryTextOnlyBtn = document.getElementById("tryTextOnlyBtn");
    if (!tryTextOnlyBtn) {
      const btn = document.createElement("button");
      btn.id = "tryTextOnlyBtn";
      btn.className = "button secondary-btn";
      btn.textContent = text.tryTextOnly;
      btn.addEventListener("click", () => {
        qualityAlertModal.style.display = "none";
        // Focus on the brand/model input field
        document.getElementById("shoeBrand").focus();
        // Clear the image
        resetUploadSection();
        // Add a visual indicator that we're in text-only mode
        document
          .querySelector(".input-section")
          .classList.add("text-only-mode");
      });

      // Insert the button before the retake photo button
      retakePhotoBtn.parentNode.insertBefore(btn, retakePhotoBtn);
    }

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

    // Check if we have either an image or brand information
    const hasImage = fileInput.files && fileInput.files[0];
    const hasBrandInfo = shoeBrand && shoeBrand.trim().length > 0;

    if (!hasImage && !hasBrandInfo) {
      alert(
        translations[currentLanguage].needImageOrBrand ||
          "Please provide either an image or brand/model information"
      );
      return;
    }

    // Show progress section
    progressSection.style.display = "block";
    resultSection.style.display = "none";

    const text = translations[currentLanguage];

    try {
      // Stage 1: Processing
      updateProgress(0, text.processingImage);

      // If we have an image, convert it to base64
      let base64Image = null;
      if (hasImage) {
        // Wait for 1.5 seconds to simulate processing
        await new Promise((resolve) => setTimeout(resolve, 1500));
        base64Image = await convertImageToBase64(fileInput.files[0]);
      } else {
        // Shorter wait for text-only mode
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Stage 2: Analyzing
      updateProgress(25, text.analyzingShoe);
      await new Promise((resolve) => setTimeout(resolve, 2000));

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

      // Stage 3: Getting recommendations
      updateProgress(50, text.gettingRecommendations);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Fetch product recommendations
      await fetchProductRecommendations(data);

      // Stage 4: Finalizing
      updateProgress(75, text.finalizing);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Display results
      displayResults(data);

      // Complete progress
      updateProgress(100, text.analysisComplete);

      // Keep the progress visible for a moment before showing results
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Hide progress section and show results
      progressSection.style.display = "none";
      resultSection.style.display = "block";
    } catch (error) {
      console.error("Error:", error);
      progressSection.style.display = "none";
      alert(`Error: ${error.message}`);
    }
  }

  // Update progress bar and status message
  function updateProgress(percent, message) {
    // Calculate which stage we're in
    const stageIndex = Math.floor(percent / 25);
    const stages = document.querySelectorAll(".progress-stage");

    // Update progress bar width with a smoother animation
    progressBar.style.width = `${percent}%`;

    // Update status message
    statusMessage.textContent = message;

    // Update active stages with a delay for each stage
    stages.forEach((stage, index) => {
      stage.classList.remove("active");

      if (index <= stageIndex) {
        // Add a delay for each stage to create a sequential effect
        setTimeout(() => {
          stage.classList.add("active");
        }, index * 500); // 500ms delay between each stage activation
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
      // Use the product data from products.js
      if (window.productData) {
        // Extract keywords from the shoe details
        const keywords = extractKeywords(data);

        // Score and filter products
        products = scoreAndFilterProducts(window.productData, keywords);

        console.log(`Found ${products.length} relevant products`);
        return;
      }

      // Fallback to sample products if product data is not available
      console.error("Product data not available");
      products = getSampleProducts();
    } catch (error) {
      console.error("Error fetching product recommendations:", error);
      products = getSampleProducts();
    }
  }

  // Function to extract keywords from shoe details
  function extractKeywords(shoeDetails) {
    const keywords = [];

    // Add brand and model if available
    if (shoeDetails.brandAndModel) {
      const brandModelWords = shoeDetails.brandAndModel
        .toLowerCase()
        .split(" ");
      keywords.push(...brandModelWords);
    }

    // Add materials if available
    if (shoeDetails.materials) {
      Object.values(shoeDetails.materials).forEach((material) => {
        if (
          material &&
          material.toLowerCase() !== "unknown" &&
          material.toLowerCase() !== "unspecified"
        ) {
          keywords.push(material.toLowerCase());
        }
      });
    }

    // Add affected parts and problems if available
    if (shoeDetails.cleaningRecommendations) {
      shoeDetails.cleaningRecommendations.forEach((rec) => {
        if (rec.affectedPart) {
          keywords.push(rec.affectedPart.toLowerCase());
        }

        // Add recommendations as keywords (they often contain material types)
        rec.recommendations.forEach((recommendation) => {
          const words = recommendation.toLowerCase().split(" ");
          // Filter out common words
          const filteredWords = words.filter(
            (word) =>
              word.length > 3 &&
              ![
                "with",
                "and",
                "the",
                "for",
                "your",
                "that",
                "this",
                "then",
                "use",
              ].includes(word)
          );
          keywords.push(...filteredWords);
        });
      });
    }

    // Add general care tips as keywords
    if (shoeDetails.generalCare) {
      shoeDetails.generalCare.forEach((tip) => {
        const words = tip.toLowerCase().split(" ");
        const filteredWords = words.filter(
          (word) =>
            word.length > 3 &&
            ![
              "with",
              "and",
              "the",
              "for",
              "your",
              "that",
              "this",
              "then",
              "use",
            ].includes(word)
        );
        keywords.push(...filteredWords);
      });
    }

    // Remove duplicates
    return [...new Set(keywords)];
  }

  // Function to score and filter products based on keywords
  function scoreAndFilterProducts(productData, keywords) {
    // Score each product based on keyword matches
    const scoredProducts = productData.map((product) => {
      // Combine relevant product fields for matching
      const productText =
        `${product.title} ${product.tags} ${product.vendor}`.toLowerCase();

      // Calculate match score
      let score = 0;
      keywords.forEach((keyword) => {
        if (productText.includes(keyword)) {
          // Increase score based on where the keyword is found
          if (product.title.toLowerCase().includes(keyword)) {
            score += 3; // Higher weight for title matches
          } else if (
            product.tags &&
            product.tags.toLowerCase().includes(keyword)
          ) {
            score += 2; // Medium weight for tag matches
          } else {
            score += 1; // Lower weight for other matches
          }
        }
      });

      return { product, score };
    });

    // Sort by score (highest first) and take top 6
    return scoredProducts
      .filter((item) => item.score > 0) // Only include products with matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        image: item.product.image,
        vendor: item.product.vendor,
        url: `https://example.com/products/${item.product.id}`,
      }));
  }

  // Function to get sample products as fallback
  function getSampleProducts() {
    return [
      {
        id: 1,
        title: "Shoe Cleaner Kit",
        price: "$19.99",
        vendor: "Shoe Care Co.",
        image: "https://via.placeholder.com/200x150?text=Shoe+Cleaner+Kit",
        url: "https://example.com/products/shoe-cleaner-kit",
      },
      {
        id: 2,
        title: "Leather Conditioner",
        price: "$12.99",
        vendor: "Leather Care",
        image: "https://via.placeholder.com/200x150?text=Leather+Conditioner",
        url: "https://example.com/products/leather-conditioner",
      },
      {
        id: 3,
        title: "Suede Brush",
        price: "$8.99",
        vendor: "Shoe Care Co.",
        image: "https://via.placeholder.com/200x150?text=Suede+Brush",
        url: "https://example.com/products/suede-brush",
      },
    ];
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
    const text = translations[currentLanguage];

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
            }', '_blank')">${text.viewProduct}</button>
          </div>
        `;

        productsList.appendChild(productCard);
      });
    } else {
      // No products available
      productsList.innerHTML = `<p>${text.noProducts}</p>`;
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

  // Reset image editing
  function resetImageEditing() {
    // Reset rotation
    currentRotation = 0;

    // Reset image to original
    if (originalImageSrc) {
      previewImage.src = originalImageSrc;
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
