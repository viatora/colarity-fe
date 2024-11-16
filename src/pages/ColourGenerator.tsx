// src/App.tsx
import { useState, useEffect } from "react";
import ColourBlock from "../components/ColourBlock";
import Header from "../components/Header/Header";
import chroma from "chroma-js";

export default function ColourGenerator() {
  const [colours, setColours] = useState<string[]>(generateRandomColours());
  const [locked, setLocked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [contrastColours, setContrastColours] = useState<string[]>([]);

  function generateRandomColours(): string[] {
    return Array.from({ length: 5 }, () => chroma.random().hex());
  }

  const updateColour = (index: number, newColour: string) => {
    const updatedColours = colours.map((colour, i) =>
      i === index ? newColour : colour
    );
    setColours(updatedColours);
  };

  const toggleLock = (index: number) => {
    const updatedLocks = [...locked];
    updatedLocks[index] = !updatedLocks[index];
    setLocked(updatedLocks);
  };

  const generatePalette = () => {
    setColours((prevColours) =>
      prevColours.map((colour, index) =>
        locked[index] ? colour : chroma.random().hex()
      )
    );
  };

  // Calculate contrasting colors based on logic
  const calculateContrastColours = () => {
    // Example logic: Use one or two contrasting colors
    let newContrastColours: string[] = [];

    // Determine if colors are mostly light or dark
    const luminances = colours.map((colour) => chroma(colour).luminance());
    const lightColours = luminances.filter((lum) => lum > 0.5).length;
    const darkColours = luminances.filter((lum) => lum <= 0.5).length;

    if (lightColours === 0 || darkColours === 0) {
      // All colors are either light or dark, use one contrasting color
      const contrastColour = lightColours === 0 ? "#FFFFFF" : "#000000";
      newContrastColours = Array(5).fill(contrastColour);
    } else {
      // Mix of light and dark colors, use two contrasting colors
      newContrastColours = colours.map((colour) =>
        chroma(colour).luminance() > 0.5 ? "#000000" : "#FFFFFF"
      );
    }

    setContrastColours(newContrastColours);
  };

  useEffect(() => {
    calculateContrastColours();
  }, [colours]);

  return (
    <div className="h-screen flex flex-col">
      <Header generatePalette={generatePalette} />
      <div className="flex flex-1">
        {colours.map((colour, index) => (
          <ColourBlock
            key={index}
            colour={colour}
            index={index}
            updateColour={updateColour}
            isLocked={locked[index]}
            toggleLock={toggleLock}
          />
        ))}
      </div>
      {/* Contrasting colors strip */}
      <div className="flex h-16">
        {contrastColours.map((contrastColour, index) => (
          <div
            key={index}
            className="flex-1"
            style={{ backgroundColor: contrastColour }}
          ></div>
        ))}
      </div>
    </div>
  );
}
