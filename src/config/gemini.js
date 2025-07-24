import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuração do Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

async function main(prompt) {
  try {
    // 1. Carrega o modelo (use "gemini-1.5-pro" ou "gemini-1.5-flash")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. Gera o conteúdo
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // 3. Extrai o texto (método síncrono)
    const response = await result.response;
    const text = response.text(); // ✅ Não precisa de "await" aqui!

    return text;
  } catch (error) {
    console.error("Erro no Gemini:", error);
    return "❌ Erro ao acessar o Gemini. Verifique o console ou sua chave de API.";
  }
}

export default main;
