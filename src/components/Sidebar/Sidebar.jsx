import { React, useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const { prevPrompts, newChat, setRecentPrompt, onSent } = useContext(Context);
  const [extended, setExtended] = useState(false);

  const loadPrompt = (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt); // Remove o await aqui para melhor fluidez
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
        />

        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="New chat" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts
              .slice()
              .reverse()
              .map(
                (
                  item,
                  index // Mostra do mais recente
                ) => (
                  <div
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className="recent-entry"
                  >
                    <img src={assets.message_icon} alt="Prompt" />
                    <p title={item}>{item.slice(0, 18)}...</p>
                  </div>
                )
              )}
          </div>
        )}
      </div>

      <div className="bottom">
        {[
          { icon: assets.question_icon, text: "Help" },
          { icon: assets.history_icon, text: "Activity" },
          { icon: assets.setting_icon, text: "Settings" },
        ].map((item, index) => (
          <div key={index} className="bottom-item recent-entry">
            <img src={item.icon} alt={item.text} />
            {extended && <p>{item.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
