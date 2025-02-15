"use client";

import { useState } from "react";

export default function MultipleChoice({ question, options, onAnswer }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 max-sm:text-center">{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            className={`p-4 mb-2 cursor-pointer rounded-lg ${
              selectedOptions.includes(option)
                ? "bg-[#1e1e1f] text-[white]"
                : "bg-gray-100"
            }`}
            onClick={() => toggleOption(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <button
        className="purpleBg text-white px-6 cursor-pointer py-2 rounded-lg hover:opacity-85 max-sm:w-full transition mt-4"
        onClick={() => onAnswer(selectedOptions)}
        disabled={selectedOptions.length === 0}
      >
        Submit
      </button>
    </div>
  );
}