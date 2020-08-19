import React from "react";
import { Link } from "react-router-dom";


export default function HomePage() {
  return (

    <div>
      <header class = "header">
        <h1>Welcome to SpeechBuddy</h1>
        <h6>The Best Text Analyzer for Students and Teachers Alike</h6>
      </header>
      <header class = "overview">
        <h2>Speech Buddy Overview</h2>
          <p>
            Speech Buddy is a text and speech analysis toolkit for quick statistics and visualizations on any given text.
            SpeechBuddy is comprised of three major text analysis tools:
            <ul>
              <li><Link to="/single_text">Single Text Analysis</Link></li>
              <li><Link to="/two_txt_plag">Two Text Analysis</Link></li>
              <li><Link to="/multi_text">Multi Text Analysis</Link></li>
            </ul>
            as well as a Speech-To-Text Analysis feature:
            <ul>
              <li>Speech Analysis</li>
            </ul>
          </p>
        <h2 class="reviews">Satisfied User Reviews</h2>
        <p>
          SpeechBuddy is wonderful! I used to have to manually check each essay for plagiarism but now that it's automated I don't have to! I give it a 9/9 for quality tools and a 1/1 for aesthetic. Total 10/10!
        </p>
        <span>- Karen J. (High School Teacher)</span>
        <p>
          This was a very helpful tool when writing speeches for my Speech Writing Class. The sentiment and toxicity analysis helps me better gauge how my audience would feel during my presentation! Definitely recommend utilizing before a big presentation!
        </p>
        <span>- Smar T. (Harvard Student)</span>
        <p>

        </p>
        <span>- Smar T. (Harvard Student)</span>
      </header>

    </div>

  );

}
