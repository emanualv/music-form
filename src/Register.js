import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("https://yourdomain.com/save_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Registration successful!");
        setForm({ name: "", email: "", address: "" });
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
