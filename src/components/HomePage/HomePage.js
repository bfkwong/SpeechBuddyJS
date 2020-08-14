import React from "react";
import { Link } from "react-router-dom";


export default function HomePage() {
  return (

    <div>
    <script src="https://unpkg.com/scrollreveal"></script>
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
      </header>
      <script>
        ScrollReveal().reveal('.header';
        ScrollReveal().reveal('.overview');
        ScrollReveal().reveal('.reviews');
      </script>
    </div>

  );

}
