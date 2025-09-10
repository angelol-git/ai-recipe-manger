import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const router = express.Router();
const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

router.post("/message", async (req, res) => {
    try {
        const { message } = req.body;
        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",
            contents: message,
        });
        res.json({ reply: response.text });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" })
    }
})

export default router;