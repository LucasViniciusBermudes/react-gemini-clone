import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSubmit = () => {
    if (input.trim()) {
      onSent(input);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              {[
                "Suggest beautiful places to see on an upcoming road trip",
                "Briefly summarize this concept: urban planning",
                "Brainstorm team bonding activities for our work retreat",
                "Improve the readability of the following code",
              ].map((text, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => {
                    setInput(text);
                    onSent(text);
                  }}
                >
                  <p>{text}</p>
                  <img
                    src={
                      [
                        assets.compass_icon,
                        assets.bulb_icon,
                        assets.message_icon,
                        assets.code_icon,
                      ][index]
                    }
                    alt=""
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <div>
              <img src={assets.gallery_icon} alt="Attach" />
              <img src={assets.mic_icon} alt="Voice input" />
              {input && (
                <img
                  src={assets.send_icon}
                  alt="Send"
                  onClick={() => onSent()}
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
