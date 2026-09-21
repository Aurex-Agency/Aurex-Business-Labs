import { ImageResponse } from "next/og";
export const alt =
  "Aurex Business Labs. Turn your website into a sales system.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#070c13",
        color: "#f0f6fa",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 70,
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 24, letterSpacing: 6, color: "#19bce5" }}>
        AUREX BUSINESS LABS
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          letterSpacing: -3,
          lineHeight: 1.05,
        }}
      >
        <span>Turn your website</span>
        <span>
          into a <span style={{ color: "#19bce5" }}>sales system.</span>
        </span>
      </div>
      <div
        style={{
          fontSize: 22,
          borderTop: "1px solid #225371",
          paddingTop: 25,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Custom websites. Connected systems.</span>
        <span>North Mississippi</span>
      </div>
    </div>,
    size,
  );
}
