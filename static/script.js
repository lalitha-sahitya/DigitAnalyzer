
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const filePicker = document.getElementById("file-picker");
const fileName = document.getElementById("file-name");
const generateBtn = document.getElementById("generate-btn");
const outputText = document.getElementById("output-text");
const outputContainer = document.getElementById("output-container");
const toggleImagesBtn = document.getElementById("toggle-images-btn");
const sampleImages = document.getElementById("sample-images");

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

generateBtn.addEventListener("click", async () => {
    if (!fileInput.files.length) {
        alert("Please select a file first.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://127.0.0.1:5000/", {  // Ensure correct URL
            method: "POST",
            body: formData
        });
        

        const data = await response.json();
        outputText.value = `Predicted Digit: ${data.prediction}`;
        outputContainer.classList.remove("hidden"); // Show the output field
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to get prediction.");
    }
});


toggleImagesBtn.addEventListener("click", () => {
    const isHidden = sampleImages.classList.toggle("hidden");
    toggleImagesBtn.innerText = isHidden ? "View Sample Images" : "Hide Sample Images";
});

