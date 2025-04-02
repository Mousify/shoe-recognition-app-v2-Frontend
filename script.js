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
  const tryTextOnlyBtn = document.getElementById("tryTextOnlyBtn");
  const languageSelect = document.getElementById("languageSelect");
  const methodCards = document.querySelectorAll(".method-card");

  // Image editor controls
  const rotateLeftBtn = document.getElementById("rotateLeftBtn");
  const rotateRightBtn = document.getElementById("rotateRightBtn");
  const cropBtn = document.getElementById("cropBtn");
  const resetBtn = document.getElementById("resetBtn");

  // Close buttons for modals
  const closeButtons = document.querySelectorAll(".close-btn");

  // State variables
  let currentRotation = 0;
  let currentScale = 1;
  let currentLanguage = "en";
  let products = [];
  let originalImageSrc = null;
  let currentAnalysisMethod = "photo-details"; // Default method

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
      textOnlyMode: "Text-only mode active",
      chooseMethod: "Choose Analysis Method",
      photoOnly: "Photo Only",
      photoDetails: "Photo + Details",
      textOnly: "Text Only (No Photo)",
      cropImage: "Crop Image",
      applyCrop: "Apply Crop",
      cancelCrop: "Atšaukti",
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
      textOnlyMode: "Активен режим только текста",
      chooseMethod: "Выберите Метод Анализа",
      photoOnly: "Только Фото",
      photoDetails: "Фото + Детали",
      textOnly: "Только Текст (Без Фото)",
      cropImage: "Обрезать Изображение",
      applyCrop: "Применить Обрезку",
      cancelCrop: "Отмена",
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
      textOnlyMode: "Aktyvus tik teksto režimas",
      chooseMethod: "Pasirinkite Analizės Metodą",
      photoOnly: "Tik Nuotrauka",
      photoDetails: "Nuotrauka + Detalės",
      textOnly: "Tik Tekstas (Be Nuotraukos)",
      cropImage: "Apkirpti Nuotrauką",
      applyCrop: "Taikyti Apkirpimą",
      cancelCrop: "Atšaukti",
    },
  };

  // Initialize language
  function updateLanguage(lang) {
    currentLanguage = lang;
    const text = translations[lang] || translations.en;

    // Update UI text
    document.querySelector("h1").textContent = text.title;
    uploadText.textContent = text.uploadText;
    browseBtn.textContent = text.browseBtn;

    // Update analysis method section
    document.querySelector(".analysis-method-section h2").textContent =
      text.chooseMethod;
    document.querySelector('[data-method="photo"] span').textContent =
      text.photoOnly;
    document.querySelector('[data-method="photo-details"] span').textContent =
      text.photoDetails;
    document.querySelector('[data-method="text"] span').textContent =
      text.textOnly;

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
      faqContainer.appendChild(faqDiv);
    });

    // Update modals
    document.querySelector("#qualityAlertModal h3").textContent =
      text.imageQualityIssue;
    retakePhotoBtn.textContent = text.uploadNewPhoto;
    if (tryTextOnlyBtn) tryTextOnlyBtn.textContent = text.tryTextOnly;

    // Update crop modal
    document.querySelector("#cropModal h3").textContent = text.cropImage;
    document.getElementById("applyCropBtn").textContent = text.applyCrop;
    document.getElementById("cancelCropBtn").textContent = text.cancelCrop;

    // Update product recommendations
    document.querySelector("#productsModal h3").textContent =
      text.recommendedProducts;
  }

  // Event Listeners

  // Analysis method selection
  methodCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove active class from all cards
      methodCards.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked card
      card.classList.add("active");

      // Update current method
      currentAnalysisMethod = card.dataset.method;

      // Update UI based on selected method
      updateUIForMethod(currentAnalysisMethod);
    });
  });

  // Update UI based on selected analysis method
  // Update the updateUIForMethod function to show all fields for "photo" method
  function updateUIForMethod(method) {
    const uploadSection = document.querySelector(".upload-section");
    const inputSection = document.querySelector(".input-section");
    const brandField = document.getElementById("shoeBrand");
    const brandInputGroup = document.querySelector(
      'label[for="shoeBrand"]'
    ).parentNode;

    switch (method) {
      case "photo":
        // Show upload section and all input fields except brand
        uploadSection.style.display = "block";
        inputSection.style.display = "grid";

        // Show problem and affected part fields
        document.querySelector(
          'label[for="problemDescription"]'
        ).parentNode.style.display = "block";
        document.querySelector(
          'label[for="affectedPart"]'
        ).parentNode.style.display = "block";

        // Hide brand field completely in "photo" mode
        brandInputGroup.style.display = "none";

        // Enable submit button only when image is uploaded
        submitButton.disabled =
          !fileInput.files || fileInput.files.length === 0;
        break;

      case "photo-details":
        // Show upload section and all input fields
        uploadSection.style.display = "block";
        inputSection.style.display = "grid";

        // Show all input fields and enable brand field
        document.querySelector(
          'label[for="problemDescription"]'
        ).parentNode.style.display = "block";
        document.querySelector(
          'label[for="affectedPart"]'
        ).parentNode.style.display = "block";
        brandInputGroup.style.display = "block";
        brandField.disabled = false;
        brandField.placeholder =
          translations[currentLanguage].brandPlaceholder ||
          "e.g., Nike Air Jordan 1, Adidas Ultraboost";

        // Enable submit button only when image is uploaded
        submitButton.disabled =
          !fileInput.files || fileInput.files.length === 0;
        break;

      case "text":
        // Hide upload section, show all input fields
        uploadSection.style.display = "none";
        inputSection.style.display = "grid";

        // Show all input fields and enable brand field
        document.querySelector(
          'label[for="problemDescription"]'
        ).parentNode.style.display = "block";
        document.querySelector(
          'label[for="affectedPart"]'
        ).parentNode.style.display = "block";
        brandInputGroup.style.display = "block";
        brandField.disabled = false;
        brandField.placeholder =
          translations[currentLanguage].brandPlaceholder ||
          "e.g., Nike Air Jordan 1, Adidas Ultraboost";

        // Enable submit button (will be disabled if brand is empty in validation)
        submitButton.disabled = false;
        break;
    }
  }

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

  resetBtn.addEventListener("click", () => {
    resetImageEditing();
  });

  // Submit button click
  submitButton.addEventListener("click", validateAndAnalyze);

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

  // Try text only button
  if (tryTextOnlyBtn) {
    tryTextOnlyBtn.addEventListener("click", () => {
      qualityAlertModal.style.display = "none";
      // Switch to text-only mode
      methodCards.forEach((c) => c.classList.remove("active"));
      document.querySelector('[data-method="text"]').classList.add("active");
      currentAnalysisMethod = "text";
      updateUIForMethod("text");
    });
  }

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

  // Reset image editing
  function resetImageEditing() {
    if (originalImageSrc) {
      previewImage.src = originalImageSrc;
      currentRotation = 0;
      currentScale = 1;
      updateImageTransform();
    }
  }

  // Reset upload section
  function resetUploadSection() {
    fileInput.value = "";
    previewImage.src = "";
    dropZone.style.display = "block";
    imageEditorContainer.style.display = "none";
    submitButton.disabled = currentAnalysisMethod !== "text";
    currentRotation = 0;
    currentScale = 1;
    originalImageSrc = null;
  }

  // Validate inputs and analyze shoe
  function validateAndAnalyze() {
    const shoeBrand = document.getElementById("shoeBrand").value;
    const problemDescription =
      document.getElementById("problemDescription").value;
    const affectedPart = document.getElementById("affectedPart").value;

    // Validation based on analysis method
    switch (currentAnalysisMethod) {
      case "photo":
        if (!fileInput.files || fileInput.files.length === 0) {
          alert("Please upload an image of your shoe");
          return;
        }
        break;

      case "photo-details":
        if (!fileInput.files || fileInput.files.length === 0) {
          alert("Please upload an image of your shoe");
          return;
        }
        break;

      case "text":
        if (!shoeBrand || shoeBrand.trim() === "") {
          alert("Please enter the brand and model of your shoe");
          return;
        }
        break;
    }

    // Proceed with analysis
    analyzeShoe();
  }

  // Show quality alert with improved messaging
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

    // Show the modal
    qualityAlertModal.style.display = "flex";
  }

  // Analyze shoe
  async function analyzeShoe() {
    const shoeBrand = document.getElementById("shoeBrand").value;
    const problemDescription =
      document.getElementById("problemDescription").value;
    const affectedPart = document.getElementById("affectedPart").value;

    // Check if we have the required inputs based on analysis method
    const hasImage = fileInput.files && fileInput.files.length > 0;
    const hasBrandInfo = shoeBrand && shoeBrand.trim().length > 0;

    if (currentAnalysisMethod === "text" && !hasBrandInfo) {
      alert(
        translations[currentLanguage].needImageOrBrand ||
          "Please provide brand/model information"
      );
      return;
    }

    if (
      (currentAnalysisMethod === "photo" ||
        currentAnalysisMethod === "photo-details") &&
      !hasImage
    ) {
      alert("Please upload an image of your shoe");
      return;
    }

    // Show progress section
    progressSection.style.display = "block";
    resultSection.style.display = "none";

    const text = translations[currentLanguage];

    try {
      // Stage 1: Processing - now faster
      updateProgress(0, text.processingImage);

      // If we have an image, convert it to base64
      let base64Image = null;
      if (hasImage) {
        // Reduced wait for processing stage
        await new Promise((resolve) => setTimeout(resolve, 1000));
        base64Image = await convertImageToBase64(fileInput.files[0]);
      } else {
        // Shorter wait for text-only mode
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Stage 2: Analyzing - reduced time
      updateProgress(25, text.analyzingShoe);
      await new Promise((resolve) => setTimeout(resolve, 1500));

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

      // Stage 3: Getting recommendations - normal time
      updateProgress(50, text.gettingRecommendations);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Fetch product recommendations
      await fetchProductRecommendations(data);

      // Stage 4: Finalizing - extended time
      updateProgress(75, text.finalizing);
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
        }, index * 300); // Reduced delay for smoother experience
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

      // Fallback to empty products array if product data is not available
      console.error("Product data not available");
      products = [];
    } catch (error) {
      console.error("Error fetching product recommendations:", error);
      products = [];
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

    // Add recommended tags if available
    if (
      shoeDetails.recommendedTags &&
      Array.isArray(shoeDetails.recommendedTags)
    ) {
      keywords.push(
        ...shoeDetails.recommendedTags.map((tag) => tag.toLowerCase())
      );
    }

    console.log("Keywords extracted:", keywords);
    return keywords;
  }

  // Score and filter products based on keywords
  function scoreAndFilterProducts(productList, keywords) {
    if (
      !keywords ||
      keywords.length === 0 ||
      !productList ||
      productList.length === 0
    ) {
      return [];
    }

    // Score each product based on keyword matches
    const scoredProducts = productList.map((product) => {
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
    const topProducts = scoredProducts
      .filter((item) => item.score > 0) // Only include products with matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((item) => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        image: item.product.image,
        vendor: item.product.vendor,
        url:
          item.product.url || `https://example.com/products/${item.product.id}`,
      }));

    return topProducts;
  }

  // Display results
  function displayResults(data) {
    const text = translations[currentLanguage];

    // Clear previous results
    resultContainer.innerHTML = "";

    // Create brand and model section
    const brandSection = document.createElement("div");
    brandSection.className = "result-item";
    brandSection.innerHTML = `
    <h3>${text.brandAndModel}</h3>
    <p>${data.brandAndModel || "Unknown"}</p>
  `;
    resultContainer.appendChild(brandSection);

    // Create materials section
    if (data.materials) {
      const materialsSection = document.createElement("div");
      materialsSection.className = "result-item";
      materialsSection.innerHTML = `<h3>${text.materials}</h3>`;

      const materialsGrid = document.createElement("div");
      materialsGrid.className = "materials-grid";

      for (const [part, material] of Object.entries(data.materials)) {
        if (
          material &&
          material.toLowerCase() !== "unknown" &&
          material.toLowerCase() !== "unspecified"
        ) {
          const materialItem = document.createElement("div");
          materialItem.className = "material-item";
          materialItem.innerHTML = `
          <div class="material-part">${
            part.charAt(0).toUpperCase() + part.slice(1)
          }</div>
          <div>${material}</div>
        `;
          materialsGrid.appendChild(materialItem);
        }
      }

      materialsSection.appendChild(materialsGrid);
      resultContainer.appendChild(materialsSection);
    }

    // Create cleaning recommendations section
    if (
      data.cleaningRecommendations &&
      data.cleaningRecommendations.length > 0
    ) {
      const cleaningSection = document.createElement("div");
      cleaningSection.className = "result-item";
      cleaningSection.innerHTML = `<h3>${text.cleaningRecommendations}</h3>`;

      data.cleaningRecommendations.forEach((rec) => {
        const recItem = document.createElement("div");
        recItem.className = "recommendation-item";

        if (rec.affectedPart) {
          recItem.innerHTML += `<p><span class="highlight">${rec.affectedPart}:</span></p>`;
        }

        if (rec.recommendations && rec.recommendations.length > 0) {
          const recList = document.createElement("ul");
          rec.recommendations.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            recList.appendChild(li);
          });
          recItem.appendChild(recList);
        }

        cleaningSection.appendChild(recItem);
      });

      resultContainer.appendChild(cleaningSection);
    }

    // Create general care section
    if (data.generalCare && data.generalCare.length > 0) {
      const careSection = document.createElement("div");
      careSection.className = "result-item";
      careSection.innerHTML = `<h3>${text.generalCare}</h3>`;

      const careList = document.createElement("ul");
      data.generalCare.forEach((tip) => {
        const li = document.createElement("li");
        li.textContent = tip;
        careList.appendChild(li);
      });

      careSection.appendChild(careList);
      resultContainer.appendChild(careSection);
    }

    // Create product recommendations section if we have products
    if (products && products.length > 0) {
      const productsSection = document.createElement("div");
      productsSection.className = "result-item";
      productsSection.innerHTML = `
      <h3>${text.recommendedProducts}</h3>
      <div class="products-preview">
        <div class="products-grid">
          ${products
            .slice(0, 3)
            .map(
              (product) => `
            <div class="product-card">
              <img src="${product.image}" alt="${product.title}" class="product-image">
              <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-vendor">${product.vendor}</div>
                <div class="product-price">${product.price}</div>
                <button class="product-btn" data-product-id="${product.id}">${text.viewProduct}</button>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        ${
          products.length > 3
            ? `<div class="view-all-btn-container"><button id="viewAllProductsBtn" class="button secondary-btn">View All Products</button></div>`
            : ""
        }
      </div>
    `;
      resultContainer.appendChild(productsSection);

      // Add event listener for view all products button
      const viewAllBtn = document.getElementById("viewAllProductsBtn");
      if (viewAllBtn) {
        viewAllBtn.addEventListener("click", showProductsModal);
      }

      // Add event listeners for product buttons
      const productButtons = document.querySelectorAll(".product-btn");
      productButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const productId = btn.getAttribute("data-product-id");
          const product = products.find((p) => p.id === productId);
          if (product && product.url) {
            window.open(product.url, "_blank");
          }
        });
      });
    }
  }

  // Show products modal
  function showProductsModal() {
    const text = translations[currentLanguage];
    const productsList = document.getElementById("productsList");

    // Clear previous products
    productsList.innerHTML = "";

    if (products && products.length > 0) {
      // Add products to modal
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
          <div class="product-title">${product.title}</div>
          <div class="product-vendor">${product.vendor}</div>
          <div class="product-price">${product.price}</div>
          <button class="product-btn" data-product-url="${product.url}">${text.viewProduct}</button>
        </div>
      `;
        productsList.appendChild(productCard);
      });

      // Add event listeners for product buttons
      const productButtons = productsList.querySelectorAll(".product-btn");
      productButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const productUrl = btn.getAttribute("data-product-url");
          if (productUrl) {
            window.open(productUrl, "_blank");
          }
        });
      });
    } else {
      // No products available
      productsList.innerHTML = `<p class="no-products">${text.noProducts}</p>`;
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

  // Set default analysis method
  document
    .querySelector('[data-method="photo-details"]')
    .classList.add("active");
  updateUIForMethod("photo-details");

  // Add event listener for retake picture button
  const retakePictureBtn = document.getElementById("retakePictureBtn");
  retakePictureBtn.addEventListener("click", () => {
    resetUploadSection();
  });

  // Add event listeners for tooltip icons on mobile
  const tooltipIcons = document.querySelectorAll(".tooltip-icon");
  tooltipIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Check if this tooltip is already active
      const isActive = icon.classList.contains("active");

      // Remove active class from all tooltips
      tooltipIcons.forEach((i) => i.classList.remove("active"));

      // If this tooltip wasn't active, make it active
      if (!isActive) {
        icon.classList.add("active");

        // Hide tooltip after 5 seconds (extended from 3 seconds)
        setTimeout(() => {
          icon.classList.remove("active");
        }, 5000);
      }
    });
  });

  // Close tooltips when clicking elsewhere
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".tooltip-icon")) {
      tooltipIcons.forEach((icon) => icon.classList.remove("active"));
    }
  });

  // Initialize the app
  updateLanguage(languageSelect.value);
});
