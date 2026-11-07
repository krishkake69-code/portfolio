export function Scanlines() {
  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.08) 2px,
            rgba(0, 0, 0, 0.08) 4px
          )
        `,
        opacity: 0.4,
      }}
      aria-hidden="true"
    />
  );
}