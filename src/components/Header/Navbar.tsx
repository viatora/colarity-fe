// src/components/Navbar.tsx
interface NavbarProps {
  generatePalette: () => void;
}

export default function Navbar({ generatePalette }: NavbarProps) {
  return (
    <nav className="h-12 bg-gray-100 flex items-center px-4">
      <h1 className="flex-1 text-lg font-bold">Colarity</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={generatePalette}
      >
        Generate
      </button>
    </nav>
  );
}
