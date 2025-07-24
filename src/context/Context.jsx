import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
  };

  const onSent = async (prompt) => {
    const finalPrompt = prompt || input;
    if (!finalPrompt.trim()) return;

    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);

      // Atualiza o histórico ANTES da requisição
      setPrevPrompts((prev) => [...new Set([...prev, finalPrompt])]); // Remove duplicatas
      setRecentPrompt(finalPrompt);

      const response = await main(finalPrompt);

      let formattedResponse = response
        .split("**")
        .map((part, i) => (i % 2 ? `<b>${part}</b>` : part))
        .join("")
        .replace(/\*/g, "<br/>");

      formattedResponse.split(" ").forEach((word, i) => {
        delayPara(i, word + " ");
      });

      setInput("");
    } catch (error) {
      console.error("Erro na API:", error);
      setResultData("❌ Erro ao conectar com o Gemini. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    input,
    setInput,
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    prevPrompts,
    newChat,
    setRecentPrompt,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
