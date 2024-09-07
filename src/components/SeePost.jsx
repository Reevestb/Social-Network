"use client";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export default function SeeEdit({ handleSubmit, content }) {
  const [see, setSee] = useState(false);

  const closeModal = () => setSee(false);

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target);

    // Call the handleSubmit function, passing the form data
    await handleSubmit(formData);

    setSee(false); // Close the modal after form submission
  };

  return (
    <main className=" flex flex-col relative">
      {/* Button to open modal */}
      <button
        id="secretBtn"
        onClick={() => setSee(true)} // Open modal
        className="flex bg-white rounded text-black items-center text-center
             w-fit h-fit text-xs p-1 justify-center hover:bg-black hover:text-white "
      >
        <MdEdit />
      </button>

      {/* Modal */}
      {see && (
        // Modal background overlay
        <div className=" bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          {/* Modal content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-[18rem] md:w-[30rem] relative z-60">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-xl"
            >
              &times;
            </button>

            {/* Modal Form */}
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col justify-center space-y-4"
            >
              <textarea
                name="content"
                type="text"
                placeholder="Your content Here"
                id="content"
                className="text-black w-full h-48 p-2 border border-gray-300 rounded"
                defaultValue={content}
              />
              <button
                className="hover:bg-green-700 h-8 hover:text-white bg-black rounded text-white items-center text-center w-full justify-center text-base"
                type="submit"
              >
                Submit Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
