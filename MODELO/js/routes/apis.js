const express = require("express");
const router = express.Router();
const axios = require("axios");
// **Ruta para Numbers API**
router.get("/numberTrivia/:number", async (req, res) => {
    const { number } = req.params;
    try {
        const response = await axios.get(`http://numbersapi.com/${number}/trivia`);
        res.json({ success: true, trivia: response.data });
    } catch (error) {
        console.error("Error al consumir Numbers API:", error);
        res.status(500).json({ success: false, error: "Error al obtener trivia numérica." });
    }
});

// **Ruta para TheCatAPI**
router.get("/randomCat", async (req, res) => {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/images/search");
        res.json({ success: true, catImage: response.data[0].url });
    } catch (error) {
        console.error("Error al consumir TheCatAPI:", error);
        res.status(500).json({ success: false, error: "Error al obtener imagen de gato." });
    }
});


module.exports = router;
