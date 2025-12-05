import React, { useRef, useState } from "react";

export default function MagnifierImage({
  src,
  alt = "",
  zoom = 2,
  lensSize = 150,
}) {
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleMove = (e) => {
    const img = imgRef.current;
    const lens = lensRef.current;
    if (!img || !lens) return;

    // Use the image's bounding rect (handles object-contain letterboxing)
    const imgRect = img.getBoundingClientRect();

    // Get pointer coordinates relative to the image
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - imgRect.left;
    const y = clientY - imgRect.top;

    // If pointer is outside image bounds, hide lens
    if (x < 0 || y < 0 || x > imgRect.width || y > imgRect.height) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const lensRadius = lensSize / 2;

    // Position lens (inside the image wrapper)
    // We'll position the lens using coordinates relative to the image's top-left
    // lens.style.left/right should be relative to the image container, so set via transform
    const left = x - lensRadius;
    const top = y - lensRadius;
    lens.style.transform = `translate(${left}px, ${top}px)`;

    // Background size: displayed image size * zoom
    const bgWidth = imgRect.width * zoom;
    const bgHeight = imgRect.height * zoom;
    lens.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;

    // Background position: move the background so the point under cursor is centered in lens
    // The point on the background corresponding to (x,y) is at (x*zoom, y*zoom)
    const bgPosX = -(x * zoom - lensRadius);
    const bgPosY = -(y * zoom - lensRadius);
    lens.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;

    // Set background image (only once is fine, but we set here to be safe)
    lens.style.backgroundImage = `url('${src}')`;
  };

  const handleLeave = () => {
    setVisible(false);
  };

  return (
    <div className="w-full h-[350px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Wrapper keeps padding off the image to avoid offsets */}
      <div
        className="relative"
        style={{ width: "100%", height: "100%", maxHeight: "350px" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleMove}
        onTouchEnd={handleLeave}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="w-full h-full object-contain block"
          draggable={false}
          style={{ userSelect: "none", WebkitUserDrag: "none" }}
        />

        <div
          ref={lensRef}
          className="pointer-events-none"
          style={{
            display: visible ? "block" : "none",
            position: "absolute",
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            borderRadius: "50%",
            border: "2px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            // start at 0,0 and we move it by transform so it stays positioned relative to wrapper
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundClip: "content-box",
            zIndex: 40,
          }}
        />
      </div>
    </div>
  );
}
