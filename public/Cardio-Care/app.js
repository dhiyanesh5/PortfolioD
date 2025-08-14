const form = document.getElementById("predictionForm");
const resultDisplay = document.getElementById("result");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // default form submission

    // Collect form data
    const data = {
        age: document.getElementById("age").value,
        sex: document.getElementById("sex").value,
        cp: document.getElementById("cp").value,
        trtbps: document.getElementById("trtbps").value,
        chol: document.getElementById("chol").value,
        fbs: document.getElementById("fbs").value,
        restecg: document.getElementById("restecg").value,
        thalachh: document.getElementById("thalachh").value,
        exng: document.getElementById("exng").value,
        oldpeak: document.getElementById("oldpeak").value,
        slp: document.getElementById("slp").value,
        caa: document.getElementById("caa").value,
        thall: document.getElementById("thall").value
    };

    try {
        // POST request to the backend API
        const response = await fetch("https://cardiocare-1j5t.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Displayprediction result/error
        if (result.error) {
            resultDisplay.textContent = `Error: ${result.error}`;
            resultDisplay.style.color = "red";
        } else {
            resultDisplay.textContent = `Prediction: ${result.prediction}`;
            resultDisplay.style.color = "green";
        }
    } catch (error) {
        
        resultDisplay.textContent = "An error occurred while connecting to the server.";
        resultDisplay.style.color = "red";
        console.error("Error:", error);
    }
});
