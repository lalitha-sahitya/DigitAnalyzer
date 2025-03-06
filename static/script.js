
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const filePicker = document.getElementById("file-picker");
const fileName = document.getElementById("file-name");
const generateBtn = document.getElementById("generate-btn");
const outputText = document.getElementById("output-text");
const outputContainer = document.getElementById("output-container");
const toggleImagesBtn = document.getElementById("toggle-images-btn");
const sampleImages = document.getElementById("sample-images");
const cardContainer = document.getElementById("card-container");


filePicker.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        fileName.textContent = `Selected File: ${file.name}`;
        enableGenerateButton();
    }
});

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("bg-gray-200");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("bg-gray-200");
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("bg-gray-200");

    const file = event.dataTransfer.files[0];
    if (file) {
        fileName.textContent = `Selected File: ${file.name}`;
        enableGenerateButton();
    }
});

function enableGenerateButton() {
    generateBtn.classList.remove("opacity-50", "cursor-not-allowed");
    generateBtn.disabled = false;
}

generateBtn.addEventListener("click", () => {
    if (fileName.textContent) {
        outputText.value = fileName.textContent.replace("Selected File: ", "");
        outputContainer.classList.remove("hidden"); // Show the input field
    }
});

toggleImagesBtn.addEventListener("click", () => {
    const isHidden = sampleImages.classList.toggle("hidden");
    toggleImagesBtn.innerText = isHidden ? "View Sample Images" : "Hide Sample Images";
});



const images = [
    { url: "/images/digit_0_1.png", caption: "Sample 1" },
    { url: "/images/digit_0_4.png", caption: "Sample 2" },
    { url: "/images/digit_0_5.png", caption: "Sample 3" },
    { url: "/images/digit_1_0.png", caption: "Sample 4" },
    { url: "/images/digit_1_2.png", caption: "Sample 5" },
    { url: "/images/digit_1_35.png", caption: "Sample 6" },
    { url: "/images/digit_1_37.png", caption: "Sample 7" },
    { url: "/images/digit_1_38.png", caption: "Sample 8" },
    { url: "/images/digit_2_34.png", caption: "Sample 9" },
    { url: "/images/digit_3_7.png", caption: "Sample 10" },
    { url: "/images/digit_3_9.png", caption: "Sample 11" },
    { url: "/images/digit_3_36.png", caption: "Sample 12" },
    { url: "/images/digit_4_3.png", caption: "Sample 13" },
    { url: "/images/digit_4_32.png", caption: "Sample 14" },
    { url: "/images/digit_4_39.png", caption: "Sample 15" },
    { url: "/images/digit_5_8.png", caption: "Sample 16" },
    { url: "/images/digit_6_2.png", caption: "Sample 17" },
    { url: "/images/digit_7_6.png", caption: "Sample 18" },
    { url: "/images/digit_8_30.png", caption: "Sample 19" },
    { url: "/images/digit_9_31.png", caption: "Sample 20" },
    { url: "/images/digit_9_33.png", caption: "Sample 21" }
];


// Loop through images and create cards
images.forEach(image => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                <img src="${image.url}" alt="${image.caption}">
                <p>${image.caption}</p>
            `;

    cardContainer.appendChild(card);
});