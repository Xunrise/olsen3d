import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to start your project? Have questions? Let&apos;s discuss how
            we can help bring your ideas to life.
          </p>
        </div>

        <form className="contact-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Service Interest</label>
            <select id="service" name="service" className="form-input">
              <option value="">Select a service...</option>
              <option value="work">Professional Work</option>
              <option value="guidance">Expert Guidance</option>
              <option value="courses">Learning Courses</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Project Details</label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Tell us about your project, goals, or questions..."
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
