import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Manually load .env for this script since we aren't using Vite here
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');
const envConfig = dotenv.config({ path: envPath });

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("No API KEY found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        // There isn't a direct listModels on the instance in the simple SDK usage often, 
        // but let's try to just run a generation to see if it works or fails with a specific error.
        // Actually, the error message suggested "Call ListModels to see the list of available models".
        // The SDK doesn't expose listModels directly on the main class in all versions, 
        // but let's try to just generate content with a fallback model to see if the KEY works at all.

        console.log("Trying gemini-1.5-flash-latest...");
        try {
            const result = await model.generateContent("Hello");
            console.log("Success with gemini-1.5-flash-latest:", result.response.text());
        } catch (e) {
            console.error("Failed with gemini-1.5-flash-latest:", e.message);
        }

        console.log("Trying gemini-pro...");
        try {
            const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
            const resultPro = await modelPro.generateContent("Hello");
            console.log("Success with gemini-pro:", resultPro.response.text());
        } catch (e) {
            console.error("Failed with gemini-pro:", e.message);
        }

    } catch (error) {
        console.error("Global Error:", error);
    }
}

listModels();
