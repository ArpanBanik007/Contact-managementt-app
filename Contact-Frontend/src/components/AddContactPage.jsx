import { useState } from "react";
import axios from "axios";

const AddContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.phone) {
      setError("Name, Email and Phone are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/contact/addContacts",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(res.data.message || "Contact created successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert("Failed to add contact");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-4 text-sm text-green-600 bg-green-50 p-2 rounded">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) => {
              if (e.target.value.length > 10) {
                alert("Phone number should not be more than 10 digits");
                handleChange();
              } else {
                handleChange(e);
              }
            }}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            placeholder="Message (optional)"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContactPage;
