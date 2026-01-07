import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SketchPicker } from "react-color";

function ColorPickerPortal({ anchorRef, color, onChange, onClose }) {
  const portalRef = useRef(null);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  useEffect(() => {
    if (!portalRef.current || !anchorRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const portalRect = portalRef.current.getBoundingClientRect();

    const safe = getSafePosition(anchorRect, portalRect);
    setPosition(safe);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        portalRef.current &&
        !portalRef.current.contains(event.target) &&
        !anchorRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  function getSafePosition(anchorRect, portalRect, margin = 4) {
    const vw = window.innerWidth;

    let top = anchorRect.bottom + margin;
    let left = anchorRect.left;

    if (left + portalRect.width > vw) {
      left = vw - portalRect.width - margin;
    }

    if (left < margin) {
      left = margin;
    }
    return { top, left };
  }
  return createPortal(
    <div
      ref={portalRef}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
      className="absolute  rounded-2xl bg-white"
    >
      <SketchPicker
        color={color}
        onChangeComplete={onChange}
        presetColors={[
          "#8B9F87",
          "#FFB86C",
          "#A94D54",
          "#E5C890",
          "#6C8FA5",
          "#B6A7B2",
          "#B4BEFE",
          "#E7DFD8",
        ]}
        disableAlpha={true}
      />
    </div>,
    document.body
  );
}

export default ColorPickerPortal;
