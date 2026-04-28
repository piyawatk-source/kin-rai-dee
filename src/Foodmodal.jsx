import { useEffect } from "react";
import FoodImage from "./Foodimage";

export default function FoodModal({ food, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!food) return null;

  const stats = [
    { label: "Time", value: food.time, icon: "⏱" },
    { label: "Calories", value: `${food.calories} kcal`, icon: "🔥" },
    { label: "Difficulty", value: food.difficulty, icon: "📊" },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          maxWidth: 480,
          width: "100%",
          overflow: "hidden",
          animation: "slideUp 0.25s ease",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ position: "relative" }}>
          <FoodImage
            src={food.image}
            alt={food.name}
            style={{ height: 230, width: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "rgba(0,0,0,0.35)",
              border: "none",
              borderRadius: "50%",
              width: 34,
              height: 34,
              cursor: "pointer",
              fontSize: 15,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
          <div
            style={{ position: "absolute", bottom: 18, left: 20, right: 20 }}
          >
            <div style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>
              {food.name}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.75)",
                marginTop: 2,
              }}
            >
              {food.nameEn}
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 22px 26px" }}>
          <p
            style={{
              color: "#4B5563",
              fontSize: 14,
              lineHeight: 1.75,
              margin: "0 0 20px",
            }}
          >
            {food.description}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {stats.map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#F9FAFB",
                  borderRadius: 12,
                  padding: "10px 8px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18 }}>{item.icon}</div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 12,
                    color: "#111827",
                    marginTop: 3,
                  }}
                >
                  {item.value}
                </div>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 1 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 13,
                color: "#374151",
                marginBottom: 10,
              }}
            >
              Ingredients
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {food.ingredients.map((ing) => (
                <span
                  key={ing}
                  style={{
                    background: "#F3F4F6",
                    color: "#374151",
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: "1px solid #E5E7EB",
                  }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingTop: 14,
              borderTop: "1px solid #F3F4F6",
            }}
          >
            <span style={{ fontSize: 13, color: "#9CA3AF" }}>Origin:</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
              }}
            >
              {food.origin}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
