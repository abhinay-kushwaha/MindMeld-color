// Home.jsx
import React, { useState, useEffect } from "react";

// Utility functions
const hexToRgb = (hex) => {
  const [r, g, b] = [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgb) => {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

const rgbToHsl = (rgb) => {
  let [r, g, b] = rgb.match(/\d+/g).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
};

const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return `rgb(${Math.round(f(0) * 255)}, ${Math.round(f(8) * 255)}, ${Math.round(f(4) * 255)})`;
};

const Home = () => {
  const [colorInput, setColorInput] = useState("");
  const [initialColor, setInitialColor] = useState("#ffffff");
  const [adjustedColor, setAdjustedColor] = useState("#ffffff");
  const [hex, setHex] = useState("#ffffff");
  const [rgb, setRgb] = useState("rgb(255, 255, 255)");
  const [lightness, setLightness] = useState(50); // Default brightness level
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const validColor = validateColor(colorInput);

    if (validColor) {
      const hexColor = validColor.startsWith("#") ? validColor : rgbToHex(validColor);
      setInitialColor(hexColor);
      updateAdjustedColor(hexColor, lightness);
    } else {
      resetColor();
    }
  }, [colorInput]);

  useEffect(() => {
    updateAdjustedColor(initialColor, lightness);
  }, [lightness, initialColor]);

  const validateColor = (color) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) return color;
    if (/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(color)) return color;
    if (typeof document !== "undefined" && color in document.createElement("div").style) return color;
    return "";
  };

  const updateAdjustedColor = (hexColor, lightnessValue) => {
    const rgbColor = hexToRgb(hexColor);
    const [h, s] = rgbToHsl(rgbColor).slice(0, 2);
    const newColor = hslToRgb(h, s, lightnessValue);
    setAdjustedColor(newColor);
    setHex(rgbToHex(newColor));
    setRgb(newColor);
  };

  const resetColor = () => {
    setInitialColor("#ffffff");
    setAdjustedColor("#ffffff");
    setHex("#ffffff");
    setRgb("rgb(255, 255, 255)");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setPopupMessage(`Copied: ${text}`);
      setTimeout(() => setPopupMessage(""), 2000); // Hide message after 2 seconds
    });
  };

  return (
    <>
      <main className=" py-10 bg-gray-100 flex flex-col items-center p-4">
        <div className="w-full max-w-4xl flex flex-col gap-2 lg:gap-4 md:flex-row items-center">
          <div className="flex flex-col items-center md:items-start md:w-1/2 mb-6 md:mb-0">
            <p className="font-mono">A simple, color-picking app designed to help users find the perfect color for their digital workspace.</p>
            <p className="my-2">Enter a color name, HEX, or RGB value to see it displayed. Adjust the lightness to generate different shades.</p>
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Enter color name, HEX, or RGB"
              className="mb-4 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <div className="h-64 w-full rounded shadow-lg" style={{ backgroundColor: initialColor }}></div>
            <div className="text-gray-700 text-lg mt-2 font-medium">Original Color</div>
          </div>
          <div className="flex flex-col items-center md:items-end md:w-1/2">
            <div className="h-64 w-full rounded shadow-lg" style={{ backgroundColor: adjustedColor }}></div>
            <div className="text-gray-700 text-lg mt-2 font-medium">Adjusted Color</div>
            <label className="block text-sm text-gray-700 mb-2">Adjust Level:</label>
            <input type="range" min="0" max="100" value={lightness} onChange={(e) => setLightness(Number(e.target.value))} className="w-full mb-4" />
            <div className="text-sm text-gray-700 mb-4">Level: {lightness}%</div>
            <div className="flex flex-col space-y-2">
              <button onClick={() => copyToClipboard(hex)} className="px-4 py-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300 relative transition">
                Copy HEX: {hex}
                {popupMessage && popupMessage.includes(hex) && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">Copied</span>
                )}
              </button>
              <button onClick={() => copyToClipboard(rgb)} className="px-4 py-2 border border-gray-300 rounded bg-gray-200 hover:bg-gray-300 relative transition">
                Copy RGB: {rgb}
                {popupMessage && popupMessage.includes(rgb) && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded">Copied</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
