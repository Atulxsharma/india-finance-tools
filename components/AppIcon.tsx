export function AppIcon({
  size,
  maskable = false,
}: {
  size: number;
  maskable?: boolean;
}) {
  const padding = maskable ? Math.round(size * 0.16) : Math.round(size * 0.12);
  const innerSize = size - padding * 2;
  const accentHeight = Math.max(10, Math.round(innerSize * 0.1));
  const titleFontSize = Math.round(innerSize * 0.28);
  const subtitleFontSize = Math.round(innerSize * 0.12);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background:
          "linear-gradient(160deg, rgb(15, 92, 192) 0%, rgb(8, 48, 110) 70%, rgb(5, 32, 75) 100%)",
        color: "white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          margin: padding,
          width: innerSize,
          height: innerSize,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: Math.round(innerSize * 0.22),
          padding: Math.round(innerSize * 0.12),
          background: "rgba(255, 255, 255, 0.11)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: subtitleFontSize,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.82,
            }}
          >
            India
          </div>
          <div
            style={{
              display: "flex",
              width: Math.round(innerSize * 0.18),
              height: Math.round(innerSize * 0.18),
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.18)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: Math.round(innerSize * 0.04),
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: titleFontSize,
              fontWeight: 800,
              letterSpacing: "-0.06em",
              lineHeight: 1,
            }}
          >
            Rs
          </div>
          <div
            style={{
              display: "flex",
              fontSize: subtitleFontSize,
              opacity: 0.92,
            }}
          >
            Salary, GST, EMI, SIP, tax
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: Math.round(innerSize * 0.05),
          }}
        >
          <div
            style={{
              display: "flex",
              height: accentHeight,
              borderRadius: 999,
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.12)",
            }}
          >
            <div style={{ width: "54%", background: "#bfe0ff" }} />
            <div style={{ width: "27%", background: "#31c48d" }} />
            <div style={{ width: "19%", background: "#f59e0b" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: subtitleFontSize,
              opacity: 0.76,
            }}
          >
            <span>Fast</span>
            <span>Mobile</span>
            <span>Offline-ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
