import React, { useContext } from "react";
import ModalContext from "../src/context/ModalContext.js";
import ReactMarkdown from "react-markdown";
import Modal from "./Modal.jsx";

function ActivityModal({ isHidden, onDismiss }) {
  const { starData } = useContext(ModalContext);

  const text = starData["Verse/Activity"] || "";
  const date = starData["originalDate"];
  const dateObj = !!date ? new Date(`${date}T00:00:00.000-06:00`) : Date.now();
  const videoId = starData["Video"];
  const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  const heading = Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeZone: "America/Chicago",
  }).format(dateObj);

  return (
    <Modal isHidden={isHidden} onDismiss={onDismiss} heading={heading}>
      <ReactMarkdown className="markdown-paragraph">
        {text.replace(/\n/gi, "  \n")}
      </ReactMarkdown>
      {videoUrl && (
        <div className="iframe-container">
          <iframe
            src={videoUrl}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </Modal>
  );
}

export default ActivityModal;
