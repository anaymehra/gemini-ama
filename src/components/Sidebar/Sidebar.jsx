import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : "close"}`}>
      <div className="top">
        <img
          onClick={() => {
            setExtended((prevValue) => {
              return !prevValue;
            });
            toggleSidebar;
          }}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div
          onClick={() => {
            newChat();
          }}
          className="new-chat"
        >
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, i) => {
              return (
                <div
                  onClick={() => {
                    loadPrompt(item);
                  }}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      
    </div>
  );
}

export default Sidebar;
