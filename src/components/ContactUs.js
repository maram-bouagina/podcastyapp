import React, { useState } from "react";
import "./ContactUs.css";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    message: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  
    const payload = {
      username: e.target.username.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value  
    };

    fetch("http://127.0.0.1:8000/admin/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Response data:", data);
        alert("Message sent successfully");
        setSuccessMessage("Message sent successfully");
      })
      .catch(err => {
        console.error("Error sending message:", err);
        setError("Failed to send message");
      });
  };

  const detectHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="super-div">
      <div className="text">
        <h1>Get in Touch with Us</h1>
        <h3>
          We’d love to hear from you! Whether you have a question, feedback, or need assistance,
          our team is here to help. Please feel free to reach out to us using the form below, and
          we'll get back to you as soon as possible.
        </h3>
      </div>
      <div className="form-div">
        <form className="form" onSubmit={formHandler}>
          <h1 className="hf">Contact us here</h1>

          <div className="input-label-text">
            <label htmlFor="username" className="required">
              Username <FaUser />
            </label>
            <input
              className="input"
              id="username"
              name="username"
              type="text"
              placeholder="username"
              required
              onChange={detectHandler}
            />
          </div>

          <div className="input-label-text">
            <label htmlFor="email" className="required">
              Email <MdEmail />
            </label>
            <input
              onChange={detectHandler}
              className="input"
              id="email"
              name="email"
              type="email"
              placeholder="email"
              required
            />
          </div>

          <div className="input-label-text">
            <label htmlFor="subject" className="required">
              Subject
            </label>
            <input
              onChange={detectHandler}
              className="input"
              id="subject"
              name="subject"
              type="text"
              placeholder="subject"
              required
            />
          </div>

          <div className="input-label-text">
            <label htmlFor="message" className="required">
              Enter your message
            </label>
            <textarea
              onChange={detectHandler}
              id="message"
              name="message"
              rows="6"
              cols="52"
              required
              placeholder="Enter your message"
            ></textarea>
          </div>

          {error && <p className="err">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <div className="sub-res">
            <input type="submit" value="Send" className="sub" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
