"use client"; // Ensure this component is only executed on the client-side
import { useState } from "react";
import { useRouter } from "next/navigation"; // Adjust import based on your Next.js version
import { MdEdit } from "react-icons/md";
import ReactDOM from "react-dom";

export default function SeeEdit({ handleSubmit, content }) {
  const [see, setSee] = useState(false);
  const router = useRouter(); // Hook to access router

  const closeModal = () => setSee(false);

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target);

    // Call the handleSubmit function, passing the form data
    await handleSubmit(formData);

    // Close the modal
    setSee(false);

    // Revalidate and redirect to the current path
    router.refresh(); // Refresh the current page
    router.push(router.asPath); // Ensure user stays on the current path
  };

  return (
    <main className="relative flex flex-col">
      {/* Button to open modal */}
      <button
        id="secretBtn"
        onClick={() => setSee(true)} // Open modal
        className="flex bg-gray-100 rounded text-black items-center text-center
             w-fit h-fit text-xs p-1 justify-center hover:bg-green-700 hover:text-white"
      >
        <MdEdit />
      </button>

      {/* Render Modal using React Portals */}
      {see &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-[18rem] md:w-[30rem] z-[10000] relative">
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
          </div>,
          document.body // Render modal at the end of the body element
        )}
    </main>
  );
}
