import { SketchPicker } from "react-color";

interface ColourPickerModalProps {
  colour: string;
  onClose: () => void;
  onChange: (color: string) => void;
}

export default function ColourPickerModal({
  colour,
  onClose,
  onChange,
}: ColourPickerModalProps) {
  return (
    <div className="absolute z-10 top-12">
      <div className="fixed inset-0" onClick={onClose} />
      <SketchPicker
        color={colour}
        onChangeComplete={(colourResult) => onChange(colourResult.hex)}
      />
    </div>
  );
}
