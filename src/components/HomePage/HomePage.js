import React from "react";
import { Link } from "react-router-dom";
import Stars from "../../Images/Stars.png";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="flexContainer">
      <header className="header">
        <div className="main flexItem">
          <h1>Welcome to SpeechBuddy</h1>
          <h5>A Free Text and Speech Analyzer</h5>
          <h6>For Students and Teachers Alike</h6>
        </div>
        <div className="overview flexItem">
          <h2>Speech Buddy Overview</h2>
          <p>
            Speech Buddy is a text and speech analysis toolkit for quick
            statistics and visualizations on any given text.
          </p>
        </div>
      </header>
      <header className="features flexItem">
        <h2> Analyze Text Tone & Word Variance for Single Text Speeches </h2>
        <div>
          <p>
            Check the tone of your text before you perform in front of an
            audience. Ensure that your audience reacts the way you expect
            depending on your intended tone:
          </p>
          <ul>
            <li>
              <Link to="/SpeechBuddyJS/single_text">Single Text Analysis</Link>
            </li>
          </ul>
        </div>
        <h2> Plagiarism and Similarity Comparison Between 2+ Text Speeches </h2>
        <div>
          <p>Compare two or more .txt files for speech similarity:</p>
          <ul>
            <li>
              <Link to="/SpeechBuddyJS/two_txt_plag">Two Text Analysis</Link>
            </li>
            <li>
              <Link to="/SpeechBuddyJS/multi_text">Multi Text Analysis</Link>
            </li>
          </ul>
        </div>
      </header>
      <header className="reviews flexItem">
        <h2>Satisfied User Reviews</h2>
        <div>
          <img src={Stars} alt="5Stars" id="stars" />
          <p>
            "SpeechBuddy is wonderful! I used to have to manually check each
            essay for plagiarism but now that it's automated I don't have to! I
            give it a 9/9 for quality tools and a 1/1 for aesthetic. Total
            10/10!"
          </p>
          <span>- Karen J. (High School Teacher)</span>
          <img src={Stars} alt="5Stars" id="stars" />
          <p>
            "This was a very helpful tool when writing speeches for my Speech
            Writing class. The sentiment and toxicity analysis helps me better
            gauge how my audience would feel during my presentation! Definitely
            recommend utilizing before a big presentation!"
          </p>
          <span>- Smar T. (Harvard Student)</span>
          <img src={Stars} alt="5Stars" id="stars" />
          <p>"My dad like this alot."</p>
          <span>- Smar T. Jr. (Preschool Student)</span>
        </div>
      </header>
    </div>
  );
}
