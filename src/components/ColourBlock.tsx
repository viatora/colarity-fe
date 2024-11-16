// src/components/ColorBlock.tsx
import chroma from "chroma-js";
import ColourPickerModal from "./ColourPickerModal";
import { useState } from "react";

interface ColourBlockProps {
  colour: string;
  index: number;
  updateColour: (index: number, color: string) => void;
  isLocked: boolean;
  toggleLock: (index: number) => void;
}

export default function ColourBlock({
  colour,
  index,
  updateColour,
  isLocked,
  toggleLock,
}: ColourBlockProps) {
  const [showPicker, setShowPicker] = useState(false);
  const textColour =
    chroma(colour).luminance() > 0.5 ? "text-black" : "text-white";

  const handleColourChange = (newColour: string) => {
    updateColour(index, newColour);
  };

  return (
    <div className="flex-1 relative" style={{ backgroundColor: colour }}>
      <div className={`p-4 ${textColour}`}>
        <div className="flex items-center">
          <input
            type="text"
            value={colour.toUpperCase()}
            onChange={(e) => handleColourChange(e.target.value)}
            className={`bg-transparent border-none w-20 ${textColour} uppercase focus:outline-none`}
          />
          <button onClick={() => setShowPicker(true)} className="ml-2">
            🎨
          </button>
          <button onClick={() => toggleLock(index)} className="ml-2">
            {isLocked ? "🔒" : "🔓"}
          </button>
        </div>
      </div>
      {showPicker && (
        <ColourPickerModal
          colour={colour}
          onClose={() => setShowPicker(false)}
          onChange={handleColourChange}
        />
      )}
    </div>
  );
}
