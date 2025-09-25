import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Hero Section */}
      <header>
        <h1>EMANUAL'S MUSIC ACADEMY</h1>
        <p>
          Learn music the smart way — interactive lessons, guided practice, and
          progress tracking for beginners and professionals.
        </p>
        <button>Get Started</button>
      </header>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>Interactive Lessons</h3>
          <p>Structured tutorials designed for every skill level.</p>
        </div>
        <div className="feature-card">
          <h3>Practice Tools</h3>
          <p>Fun and engaging exercises to build your rhythm and skills.</p>
        </div>
        <div className="feature-card">
          <h3>Track Progress</h3>
          <p>Monitor your learning journey and celebrate milestones.</p>
        </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>Join Our Music Community</h2>
        <p>Sign up for free tips, updates, and exclusive lessons.</p>
        <div style={{ marginTop: "20px" }}>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer>© 2025 My Music Academy. All rights reserved.</footer>
    </div>
  );
}

export default App;
