const form = document.getElementById("uploadForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const audioFile = formData.get("audio");
    const imageFile = formData.get("image");

    // 🔍 VALIDATION
    if (!audioFile || !audioFile.type.startsWith("audio/")) {
        statusText.innerText = "❌ Please upload a valid audio file";
        return;
    }

    if (!imageFile || !imageFile.type.startsWith("image/")) {
        statusText.innerText = "❌ Please upload a valid image file";
        return;
    }

    // 🔄 LOADING STATE
    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.innerText = "Uploading...";

    statusText.innerText = "";

    try {
        const response = await fetch("http://localhost:8080/songs/upload", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Uploaded:", data);

            statusText.innerText = "✅ Song uploaded successfully!";
            form.reset();
        } else {
            const errorText = await response.text();
            console.error(errorText);
            statusText.innerText = "❌ Upload failed (Server error)";
        }

    } catch (error) {
        console.error(error);
        statusText.innerText = "❌ Cannot connect to backend";
    }

    // 🔄 RESET BUTTON
    submitBtn.disabled = false;
    submitBtn.innerText = "Upload";
});