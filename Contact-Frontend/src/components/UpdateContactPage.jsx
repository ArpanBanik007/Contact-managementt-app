import { useState } from "react";
import axios from "axios";

const UpdateContact = () => {
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!identifier || !name) {
      setError("Identifier and new name are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contacts/${identifier}`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(res.data.message || "Contact updated successfully");
      setIdentifier("");
      setName("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Contact Name
        </h2>

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
            placeholder="Phone or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="New Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Name"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateContact;