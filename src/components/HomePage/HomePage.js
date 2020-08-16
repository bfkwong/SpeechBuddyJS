import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <header>
        <h1>Welcome to SpeechBuddy</h1>
        <h6>The Best Text Analyzer for Students and Teachers Alike</h6>
      </header>
      <header>
        <h2>Speech Buddy Overview</h2>
        <p>
          Speech Buddy is a text and speech analysis toolkit for quick
          statistics and visualizations on any given text. SpeechBuddy is
          comprised of three major text analysis tools:
        </p>
        <ul>
          <li>
            <Link to="/SpeechBuddyJS/single_text">Single Text Analysis</Link>
          </li>
          <li>
            <Link to="/SpeechBuddyJS/two_txt_plag">Two Text Analysis</Link>
          </li>
          <li>
            <Link to="/SpeechBuddyJS/multi_text">Multi Text Analysis</Link>
          </li>
        </ul>
        <h2>Satisfied User Reviews</h2>
      </header>
    </div>
  );
}
