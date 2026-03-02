import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const car = carRef.current;
    const trail = trailRef.current;
    const road = car?.parentElement;

    if (!car || !trail || !road) return;

    // =========================
    // CAR SCROLL ANIMATION
    // =========================
    const tween = gsap.to(car, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: trackRef.current,
        invalidateOnRefresh: true,
      },

      // 👇 Dynamic calculation (prevents overflow)
      x: () => {
        const carWidth = car.offsetWidth;
        const roadWidth = road.clientWidth;

        const visiblePortion = carWidth * 0.7; // 20% visible
        return roadWidth - carWidth + visiblePortion;
      },

      ease: "none",

      onUpdate: () => {
        const carRect = car.getBoundingClientRect();
        const roadRect = road.getBoundingClientRect();

        // ===== Trail Growth =====
        const greenEnd =
          carRect.left + carRect.width * 0.15;

        gsap.set(trail, {
          width: greenEnd - roadRect.left,
        });

        // ===== Letter Reveal =====
        const revealPoint =
          carRect.left + carRect.width * 0.75;

        lettersRef.current.forEach((letter) => {
          if (!letter) return;
          const rect = letter.getBoundingClientRect();
          letter.style.opacity =
            revealPoint >= rect.left ? 1 : 0;
        });
      },
    });

    // =========================
    // STATS FADE ANIMATION
    // =========================
    gsap.utils.toArray(".text-box").forEach((box, i) => {
      gsap.to(box, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top+=${420 + i * 200} top`,
          end: `top+=${600 + i * 200} top`,
          scrub: true,
        },
        opacity: 1,
      });
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const statBox = {
  opacity: 0,
  transition: "opacity 0.5s",
  padding: "1rem",
  borderRadius: "10px",
  margin: "1rem",
  position: "absolute",
  zIndex: 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "5px",
};

  const numberStyle = {
  fontSize: "58px",
  fontWeight: 600,
};

  const descStyle = {
  fontSize: "18px",
};

  return (
    <div
      ref={sectionRef}
      style={{
        height: "200vh",
        background: "#121212",
      }}
    >
      <div
        ref={trackRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "#d1d1d1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ROAD */}
        <div
          style={{
            width: "100%",
            height: "200px",
            background: "#1e1e1e",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* GREEN TRAIL */}
          <div
            ref={trailRef}
            style={{
              height: "200px",
              background: "#45db7d",
              position: "absolute",
              top: 0,
              left: 0,
              width: 0,
              zIndex: 1,
            }}
          />

          {/* CAR */}
          <img
            ref={carRef}
            src="/car.png"
            alt="car"
            style={{
              height: "200px",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
            }}
          />

          {/* HEADLINE */}
          <div
  style={{
    position: "absolute",
    top: "1%",
    left: "5%",
    fontSize: "8rem",
    fontWeight: "bold",
    display: "flex",
    gap: "0.3rem",
    color: "#111",
    zIndex: 5,
  }}
>
  {"WELCOME              ITZFIZZ".split("").map((letter, i) => (
    <span
      key={i}
      ref={(el) => (lettersRef.current[i] = el)}
      style={{ opacity: 0 }}
    >
      {letter}
    </span>
  ))}
</div>
        </div>

        {/* STATS */}

        <div
  className="text-box"
  style={{
    top: "7%",
    right: "30%",
    background: "#def54f",
    color: "#111",
    padding: "30px 30px",
    ...statBox,
  }}
>
  <span style={numberStyle}>58%</span>
  <div style={descStyle}>
    Increase in pick up point use
  </div>
</div>

        <div
  className="text-box"
  style={{
    top: "7%",
    right: "7%",
    background: "#333",
    color: "#fff",
    padding: "30px 30px",
    ...statBox,
  }}
>
  <span style={numberStyle}>27%</span>
  <div style={descStyle}>
    Increase in pick up point use
  </div>
</div>

        <div
  className="text-box"
  style={{
    bottom: "7%",
    right: "35%",
    background: "#6ac9ff",
    color: "#111",
    padding: "30px 30px",
    ...statBox,
  }}
>
  <span style={numberStyle}>23%</span>
  <div style={descStyle}>
    Decrease in customer phone calls
  </div>
</div>

        <div
  className="text-box"
  style={{
    bottom: "7%",
    right: "12%",
    background: "#fa7328",
    color: "#111",
    padding: "30px 30px",
    ...statBox,
  }}
>
  <span style={numberStyle}>40%</span>
  <div style={descStyle}>
    Decrease in customer phone calls
  </div>
</div>
      </div>
    </div>
  );
}
