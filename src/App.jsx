import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, FOODS } from "./Constants";
import FoodCard from "./Foodcard";
import FoodModal from "./Foodmodal";
import SpinAnimation from "./Spinanimation";
import "./App.css";

export default function App() {
  const [selectedFood, setSelectedFood] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [randomFood, setRandomFood] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const timeoutRef = useRef(null);

  const foods = useMemo(
    () =>
      activeCategory === "ทั้งหมด"
        ? FOODS
        : FOODS.filter((food) => food.category === activeCategory),
    [activeCategory],
  );

  const handleRandomFood = () => {
    if (isSpinning) return;

    const pool = activeCategory === "ทั้งหมด" ? FOODS : foods;
    if (pool.length === 0) return;

    setSelectedFood(null);
    setIsSpinning(true);

    const nextFood = pool[Math.floor(Math.random() * pool.length)];
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setRandomFood(nextFood);
      setIsSpinning(false);
    }, 1200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "28px 22px 48px",
        }}
      >
        <header style={{ marginBottom: 26 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#2563EB",
                  textTransform: "uppercase",
                  letterSpacing: "1.4px",
                }}
              >
                Kin Rai Dee
              </div>
              <h1
                style={{
                  margin: "10px 0 0",
                  fontSize: 38,
                  lineHeight: 1.05,
                  color: "#111827",
                }}
              >
                Food Random Menu
              </h1>
              <p
                style={{
                  margin: "10px 0 0",
                  color: "#475569",
                  maxWidth: 640,
                  fontSize: 15,
                }}
              >
                Select a category and click a dish to view the details.
              </p>
            </div>
            <div
              onClick={handleRandomFood}
              className={`popularDishButton${isSpinning ? " spinning" : ""}`}
              style={{
                width: 120,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ textAlign: "center", color: "#fff" }}>
                <div
                  style={{
                    fontSize: 32,
                    marginBottom: 4,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                >
                  {isSpinning ? "🎲" : "🍛"}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    marginTop: 6,
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {isSpinning ? "กำลังสุ่ม..." : "Popular Dish"}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
            }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setRandomFood(null);
                }}
                style={{
                  border: "1px solid",
                  borderColor:
                    activeCategory === category ? "#2563EB" : "#E2E8F0",
                  background: activeCategory === category ? "#EFF6FF" : "#fff",
                  color: activeCategory === category ? "#1D4ED8" : "#334155",
                  padding: "10px 16px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <SpinAnimation isSpinning={isSpinning} />

        {randomFood && (
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#111827",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                🎉 ผลการสุ่มอาหารของคุณคือ 🎉
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <div
                onClick={() => setSelectedFood(randomFood)}
                style={{
                  background: "#fff",
                  border: `2px solid ${randomFood.accent}`,
                  borderRadius: 24,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: "translateY(0)",
                  boxShadow: `0 20px 40px ${randomFood.accent}30`,
                  maxWidth: 480,
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 32px 64px ${randomFood.accent}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 20px 40px ${randomFood.accent}30`;
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={randomFood.image}
                    alt={randomFood.name}
                    style={{
                      width: "100%",
                      height: 320,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 20,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: randomFood.accent,
                      border: `1px solid ${randomFood.accent}30`,
                    }}
                  >
                    ⭐ Popular
                  </div>
                </div>

                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 24,
                          color: "#111827",
                          lineHeight: 1.2,
                          marginBottom: 4,
                        }}
                      >
                        {randomFood.name}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#6B7280",
                          fontWeight: 500,
                        }}
                      >
                        {randomFood.nameEn}
                      </div>
                    </div>
                    <span
                      style={{
                        background: `linear-gradient(135deg, ${randomFood.accent}20, ${randomFood.accent}40)`,
                        color: randomFood.accent,
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "6px 14px",
                        borderRadius: 20,
                        whiteSpace: "nowrap",
                        border: `1px solid ${randomFood.accent}30`,
                      }}
                    >
                      {randomFood.difficulty}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 20,
                    }}
                  >
                    {randomFood.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12,
                          background: "#F8FAFC",
                          color: "#475569",
                          padding: "4px 12px",
                          borderRadius: 16,
                          fontWeight: 500,
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <span style={{ fontSize: 14 }}>⏱️</span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "#374151",
                          fontWeight: 600,
                        }}
                      >
                        {randomFood.time}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <span style={{ fontSize: 14 }}>🔥</span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "#374151",
                          fontWeight: 600,
                        }}
                      >
                        {randomFood.calories} kcal
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      padding: "12px 0",
                      borderTop: "1px solid #E5E7EB",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        fontWeight: 500,
                      }}
                    >
                      คลิกเพื่อดูรายละเอียดและสูตรอาหาร 🍽️
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onClick={setSelectedFood} />
          ))}
        </div>

        {selectedFood && (
          <FoodModal
            food={selectedFood}
            onClose={() => setSelectedFood(null)}
          />
        )}
      </div>
    </div>
  );
}
