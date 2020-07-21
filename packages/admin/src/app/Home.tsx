import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/commands">Commands</Link>
      <iframe
        frameBorder="0"
        scrolling="no"
        id="chat_embed"
        src="https://www.twitch.tv/embed/bkegbot/chat?parent=localhost"
        height={500}
        width={350}
      />
    </div>
  );
};
