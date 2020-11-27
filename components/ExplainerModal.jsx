import React from "react";
import ReactMarkdown from "react-markdown";
import Modal from "./Modal.jsx";

const instructions = `
Find the star for the day. It will be gold. Click on it to view the
steps for the day including a reading/activity, prayer, and song.

Feel free to click on the stars for prior or upcoming days.
`;

function ExplainerModal({ isHidden, onDismiss }) {
  const heading = "How does it work?";

  return (
    <Modal isHidden={isHidden} onDismiss={onDismiss} heading={heading}>
      <ReactMarkdown className="markdown-paragraph">
        {instructions}
      </ReactMarkdown>
    </Modal>
  );
}

export default ExplainerModal;
