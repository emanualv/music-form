import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// ---------------- Home Page ----------------
function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await res.json();
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setMessage("Error submitting form");
      console.error(err);
    }
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <header>
        <h1>EMANUAL'S MUSIC ACADEMY</h1>
        <p>
          Learn music the smart way — interactive lessons, guided practice, and
          progress tracking for beginners and professionals.
        </p>
        <button onClick={() => navigate("/get-started")}>Get Started</button>
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
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
        {message && <p style={{ color: "#ffd700", marginTop: "10px" }}>{message}</p>}
      </section>

      {/* Footer */}
      <footer>© 2025 My Music Academy. All rights reserved.</footer>
    </div>
  );
}

// ---------------- Get Started Page ----------------
function GetStarted() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const res = await fetch("https://music-form-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMsg("Thank you! We’ll contact you soon.");
        setFormData({ name: "", email: "", address: "" });
      } else {
        setMsg("Error submitting form");
      }
    } catch (err) {
      console.error(err);
      setMsg("Error submitting form");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Get Started</h2>
      <p>Please fill in your details and we’ll get in touch with you!</p>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}
      >
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          rows="3"
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#4e54c8",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {msg && <p style={{ color: "green", marginTop: "20px" }}>{msg}</p>}
    </div>
  );
}

// ---------------- Router Setup ----------------
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </Router>
  );
}

export default App;
