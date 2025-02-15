'use client';

import { useState, useRef } from "react";

export default function DragAndDrop({ question, correctOrder, onAnswer }) {
  const [items, setItems] = useState([...correctOrder].sort(() => Math.random() - 0.5));
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const dragItemRef = useRef(null);
  const touchStartY = useRef(0);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer?.setData("text/plain", index);

    if (e.dataTransfer?.setDragImage) {
      e.dataTransfer.setDragImage(new Image(), 0, 0);
    }

    dragItemRef.current = e.target;
  };

  const handleTouchStart = (e, index) => {
    setDraggedIndex(index);
    touchStartY.current = e.touches[0].clientY;
  };

  const handleMove = (clientY) => {
    if (draggedIndex === null) return;

    const index = items.findIndex((_, i) => {
      const el = document.getElementById(`drag-item-${i}`);
      if (!el) return false;
      const { top, bottom } = el.getBoundingClientRect();
      return clientY > top && clientY < bottom;
    });

    if (index !== -1 && index !== draggedIndex) {
      const updatedItems = [...items];
      const movedItem = updatedItems.splice(draggedIndex, 1)[0];
      updatedItems.splice(index, 0, movedItem);
      setDraggedIndex(index);
      setItems(updatedItems);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    handleMove(e.clientY);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientY);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setHoverIndex(null);
  };

  const handleTouchEnd = () => {
    setDraggedIndex(null);
    setHoverIndex(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 max-sm:text-center">{question}</h2>
      <div className="space-y-2 relative">
        {items.map((item, index) => (
          <div
            key={index}
            id={`drag-item-${index}`}
            className={`p-4 rounded-lg cursor-move transition-all duration-300 ${
              draggedIndex === index ? "bg-customDark text-[white]" : "bg-gray-100"
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onTouchStart={(e) => handleTouchStart(e, index)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="button"
            aria-label={`Drag item: ${item}`}
            style={{
              transform: hoverIndex === index ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.2s ease, opacity 0.3s ease",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <button
        className="purpleBg text-white px-6 py-2 rounded-lg hover:opacity-85 cursor-pointer max-sm:w-full transition mt-4"
        onClick={() => onAnswer(items)}
      >
        Submit
      </button>
    </div>
  );
}
