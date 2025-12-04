const { GoogleGenAI } = require("@google/genai");

try {
    const client = new GoogleGenAI({ apiKey: "test" });
    console.log("Has client.models?", !!client.models);
    if (client.models) {
        console.log("Has client.models.generateContentStream?", typeof client.models.generateContentStream);
        console.log("Has client.models.generateContent?", typeof client.models.generateContent);
    }
} catch (e) {
    console.error(e);
}

