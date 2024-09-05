"use client";

import { useState } from "react";

export default function PostForm({ userData, handlePost }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setIsSubmitting(true); // Disable button during submission

    formData = new FormData(e.target);

    try {
      // Call the server action
      await fetch("", {
        method: "POST",
        body: formData,
      });

      e.target.reset(); // Clear the form after successful submission
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleFormSubmit}
      action={handlePost}
    >
      <div className="flex flex-col">
        <input
          name="user_id"
          className="text-black"
          defaultValue={userData.id}
          hidden
        />
        <label
          htmlFor="content"
          className="flex mb-5 mt-2 justify-center text-3xl"
        >
          <strong>Create A Post</strong>
        </label>

        <textarea
          className="w-80 h-20 text-black outline outline-black border-black md:w-[40rem]"
          name="content"
          required
          placeholder="Fill your post with content here!"
          maxLength="400"
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="flex bg-gray-400 rounded text-black items-center text-center
            w-fit pt-1 mt-2 justify-center hover:bg-green-400 hover:text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Post!"}
        </button>
      </div>
    </form>
  );
}
