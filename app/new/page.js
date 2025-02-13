"use client";
import { redirect } from 'next/navigation'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Form = () => {
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    name: '', // Default to an empty string
  });
  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(null); // To handle errors
  const [success, setSuccess] = useState(null); // To show success message

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: session.user.name,
      }));
    }
  }, [session]); // Re-run this effect whenever session changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submit

    // Check if form data is valid
    if (!formData.title || !formData.content || !formData.description) {
      setError("Please fill in all the fields.");
      return;
    }
    if (!session) {
        setError("Please log in.");
        return;
      }
    setLoading(true); // Set loading to true when starting the request
    setError(null); // Clear previous error
    setSuccess(null); // Clear previous success message

    try {
      // Send data to API
      const response = await fetch("/api/database/blogpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Post created successfully!");
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      setError("Error: " + error.message);
    } finally {
      setLoading(false); // Set loading to false once the request is complete
      redirect(`/`)
    }
  };

  // If session is still loading, we can show a loading state or a fallback message
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create New Post
      </h2>

      {/* Display success or error message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="6"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading} // Disable button while loading
        className="w-full p-3 mt-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Form;
