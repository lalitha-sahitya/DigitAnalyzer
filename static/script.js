document.addEventListener("DOMContentLoaded", function () {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const fileName = document.getElementById("file-name");
    const generateBtn = document.getElementById("generate-btn");
    const outputText = document.getElementById("output-text");
    const outputContainer = document.getElementById("output-container");
    const toggleImagesBtn = document.getElementById("toggle-images-btn");
    const sampleImages = document.getElementById("sample-images");
    const loadingIndicator = document.getElementById("loading");

    // Click to Open File Picker
    document.querySelector("label[for='file-input']").addEventListener("click", () => {
        fileInput.click();
    });

    // File Selection via Input
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            fileName.textContent = `Selected File: ${file.name}`;
            enableGenerateButton();
        }
    });

    // Prevent Default Drag Events
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, (event) => {
            event.preventDefault();
            event.stopPropagation();
        });
    });

    // Drag Over Effect
    dropArea.addEventListener("dragover", () => {
        dropArea.classList.add("drag-over");
    });

    // Drag Leave Effect
    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("drag-over");
    });

    // Drop File Handling
    dropArea.addEventListener("drop", (event) => {
        dropArea.classList.remove("drag-over");

        const file = event.dataTransfer.files[0];
        if (file) {
            fileName.textContent = `Selected File: ${file.name}`;
            fileInput.files = event.dataTransfer.files;
            enableGenerateButton();
        }
    });

    // Enable Generate Button
    function enableGenerateButton() {
        generateBtn.classList.remove("opacity-50", "cursor-not-allowed");
        generateBtn.disabled = false;
    }

    // Handle File Upload and Prediction
    generateBtn.addEventListener("click", async () => {
        const file = fileInput.files[0];
        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        loadingIndicator.style.display = "block";

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {  // Ensure correct endpoint
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const data = await response.json();
            outputText.value = `Predicted Digit: ${data.prediction}`;
            outputContainer.classList.remove("hidden");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to get prediction.");
        } finally {
            loadingIndicator.style.display = "none";
        }
    });

    // Toggle Sample Images View
    toggleImagesBtn.addEventListener("click", () => {
        const isHidden = sampleImages.classList.toggle("hidden");
        toggleImagesBtn.innerText = isHidden ? "View Sample Images" : "Hide Sample Images";
    });

    // Sample Images
    const images = [
        { url: "/static/images/digit_0_4.png", caption: "Digit Sample 2" },
        { url: "/static/images/digit_0_5.png", caption: "Digit Sample 3" },
        { url: "/static/images/digit_1_0.png", caption: "Digit Sample 4" },
        { url: "/static/images/digit_1_2.png", caption: "Digit Sample 5" },
        { url: "/static/images/digit_1_35.png", caption: "Digit Sample 6" },
        { url: "/static/images/digit_1_37.png", caption: "Digit Sample 7" },
        { url: "/static/images/digit_1_38.png", caption: "Digit Sample 8" },
        { url: "/static/images/digit_2_34.png", caption: "Digit Sample 9" },
        { url: "/static/images/digit_3_7.png", caption: "Digit Sample 10" },
        { url: "/static/images/digit_3_9.png", caption: "Digit Sample 11" },
        { url: "/static/images/digit_3_36.png", caption: "Digit Sample 12" },
        { url: "/static/images/digit_4_3.png", caption: "Digit Sample 13" },
        { url: "/static/images/digit_4_32.png", caption: "Digit Sample 14" },
        { url: "/static/images/digit_4_39.png", caption: "Digit Sample 15" },
        { url: "/static/images/digit_5_8.png", caption: "Digit Sample 16" },
        { url: "/static/images/digit_6_2.png", caption: "Digit Sample 17" },
        { url: "/static/images/digit_7_6.png", caption: "Digit Sample 18" },
        { url: "/static/images/digit_8_30.png", caption: "Digit Sample 19" },
        { url: "/static/images/digit_9_31.png", caption: "Digit Sample 20" },
        { url: "/static/images/digit_9_33.png", caption: "Digit Sample 21" }
    ];

    // Render Sample Images
    images.forEach(image => {
        const card = document.createElement("div");
        card.classList.add(
            "p-2", "border", "rounded-xl", "bg-white", "shadow-md",
            "text-center", "flex", "flex-col", "items-center",
        );

        card.innerHTML = `
            <img src="${image.url}" alt="${image.caption}" class="w-18 h-18 rounded-md">
            <p class="mt-2 text-sm text-gray-600 font-semibold">${image.caption}</p>
        `;

        sampleImages.appendChild(card);
    });
});