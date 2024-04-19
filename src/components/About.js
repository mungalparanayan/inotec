import React, { useState } from "react";
import Feedback from "./Feedback";
import Alert from "./Alert";

const About = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <div className="container">
      <div>
        <h2>About Our iNoteBook</h2>
        <p>Welcome to our note-taking application! We're delighted to introduce you to a simple and efficient way to manage your notes, ideas, and thoughts.</p>

        <h3>Purpose</h3>
        <p>Our application is designed with a single, clear purpose in mind: to help you stay organized and productive. Whether you're a student, professional, or simply someone who loves jotting down ideas, our note-taking tool is here to make your life easier.</p>

        <h3>Key Features</h3>
        <ol className="py-2">
          <li>
            <strong>Create Notes:</strong><br/> Easily create new notes with a user-friendly interface. You can add title, description and categorize your notes for better organization.
          </li>
          <li>
            <strong>Update Notes:</strong><br/> Need to make changes? No problem! Edit and update your notes at any time to keep them current.
          </li>
          <li>
            <strong>Delete Notes:</strong><br/> If you've completed a task or no longer need a note, you can delete it with a single click.
          </li>
        </ol>

        <h3>Get Started</h3>
        <p>Ready to get started? Simply sign up or log in to begin taking notes, keeping track of your tasks, and staying organized.</p>

        <h3>Contact Us</h3>
        <p>Have questions or feedback? We'd love to hear from you! Feel free to reach out to our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
        <Alert alert={alert} />
        <Feedback showAlert={showAlert}/>
        <p>Thank you for choosing our note-taking application. We hope it helps you streamline your note-taking process and enhance your productivity.</p>
      </div>
    </div>
  )
}

export default About
