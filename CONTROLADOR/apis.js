// **Obtener Trivia Numérica**
document.getElementById("getTrivia")?.addEventListener("click", async () => {
    const number = document.getElementById("numberInput").value;

    if (!number) {
        alert("Por favor, ingresa un número.");
        return;
    }

    try {
        // Obtén la trivia en inglés
        const response = await fetch(`http://numbersapi.com/${number}/trivia`);
        const triviaInEnglish = await response.text();

        // Traduce al español usando Google Translate API
        const translationResponse = await fetch(
            "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=" +
                encodeURIComponent(triviaInEnglish)
        );

        const translationData = await translationResponse.json();
        const triviaInSpanish = translationData[0][0][0]; // Traducción en español

        document.getElementById("triviaResult").textContent = triviaInSpanish;
    } catch (error) {
        console.error("Error al obtener o traducir trivia:", error);
        document.getElementById("triviaResult").textContent = "No se pudo obtener la trivia.";
    }
});


// **Obtener Imagen de Gato**
document.getElementById("getCat").addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3000/api/randomCat");
        const data = await response.json();

        if (data.success) {
            const catContainer = document.getElementById("catContainer");
            catContainer.innerHTML = `<img src="${data.catImage}" alt="Un gato lindo" style="max-width: 100%; height: auto;">`;
        } else {
            alert("Hubo un problema al obtener la imagen del gato.");
        }
    } catch (error) {
        console.error("Error al obtener imagen del gato:", error);
        alert("Error al conectar con el servidor.");
    }
});
