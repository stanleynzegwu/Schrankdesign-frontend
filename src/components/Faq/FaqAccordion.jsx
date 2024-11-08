// Accordion.js
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const Accordion = ({ question, answer, index, totalItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const isLastItem = index === totalItems - 1;

  return (
    <div
      className={`py-[12px] ${isLastItem ? "" : "border-b border-gray-400"}`}
    >
      <div
        className={`flex font-semibold cursor-pointer p-[10px] mx-5 transition-all duration-500`}
        onClick={toggleAccordion}
      >
        {question}
        {isOpen ? (
          <>
            <span className="ml-auto cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-minus"
              >
                <path d="M5 12h14" />
              </svg>
            </span>
          </>
        ) : (
          <>
            <span className="ml-auto cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            </span>
          </>
        )}
      </div>
      {isOpen && (
        <Fade duration={1000}>
          <div className="p-[10px] mx-5 text-gray-600">{answer}</div>
        </Fade>
      )}
    </div>
  );
};

export default Accordion;
