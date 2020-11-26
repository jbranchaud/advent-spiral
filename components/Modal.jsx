import React, { useContext } from "react";
import ModalContext from "../src/context/ModalContext.js";
import SvgStar from "./SvgStar.jsx";
import ReactMarkdown from "react-markdown";

function Modal({ isHidden, onDismiss }) {
  const { starData } = useContext(ModalContext);

  if (isHidden) {
    return null;
  }

  const text = starData["Verse/Activity"] || "";
  const date = starData["originalDate"];
  const dateObj = !!date ? new Date(`${date}T00:00:00.000-06:00`) : Date.now();
  const videoId = starData["Video"];
  const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" onClick={onDismiss}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/*
Background overlay, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0"
  To: "opacity-100"
Leaving: "ease-in duration-200"
  From: "opacity-100"
  To: "opacity-0"
    */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          ​
        </span>
        {/*
Modal panel, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
  From: "opacity-100 translate-y-0 sm:scale-100"
  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    */}
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <SvgStar
                highlight
                position={1}
                currentPosition={1}
                entry={{ featured: true }}
                displayStatic
              />
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                    timeZone: "America/Chicago",
                  }).format(dateObj)}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <ReactMarkdown className="markdown-paragraph">
                      {text.replace(/\n/gi, "  \n")}
                    </ReactMarkdown>
                    {videoUrl && (
                      <iframe
                        width="560"
                        height="315"
                        src={videoUrl}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onDismiss}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
