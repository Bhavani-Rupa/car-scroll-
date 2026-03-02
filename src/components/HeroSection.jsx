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

    const carWidth = car.offsetWidth;
    const roadWidth = road.offsetWidth;

    // ✅ STOP EXACTLY AT RIGHT EDGE
    const endX = roadWidth - carWidth;

    const tween = gsap.to(car, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: trackRef.current,
      },
      x: endX,
      ease: "none",
      onUpdate: () => {
        const carRect = car.getBoundingClientRect();
        const roadRect = road.getBoundingClientRect();

        const carFront =
          carRect.left + carRect.width * 0.55;

        // Letter reveal
        lettersRef.current.forEach((letter) => {
          if (!letter) return;
          const rect = letter.getBoundingClientRect();
          letter.style.opacity =
            carFront >= rect.left ? 1 : 0;
        });

        // Green trail grow
        gsap.set(trail, {
          width:
            carRect.left -
            roadRect.left +
            carRect.width * 0.55,
        });
      },
    });

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
    padding: "24px 34px",
    borderRadius: "14px",
    opacity: 0,
  };

  const numberStyle = {
    fontSize: "55px",
    fontWeight: 600,
    display: "block",
    marginBottom: "6px",
    lineHeight: "1",
  };

  const descStyle = {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "1.35",
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
            width: "100%", // ✅ FIXED (no more overflow)
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
              top: "50%",
              left: "6%",
              transform: "translateY(-50%)",
              fontSize: "8rem",
              fontWeight: 600,
              letterSpacing: "-1px", // ✅ ORIGINAL FEEL
              whiteSpace: "nowrap",
              color: "#111",
              zIndex: 5,
            }}
          >
            {"WELCOME ITZFIZZ".split("").map((letter, i) => (
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

        {/* STATS (unchanged from your design) */}

        <div
          className="text-box"
          style={{
            position: "absolute",
            top: "7%",
            right: "30%",
            background: "#def54f",
            color: "#111",
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
            position: "absolute",
            top: "7%",
            right: "7%",
            background: "#333",
            color: "#fff",
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
            position: "absolute",
            bottom: "7%",
            right: "35%",
            background: "#6ac9ff",
            color: "#111",
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
            position: "absolute",
            bottom: "7%",
            right: "12%",
            background: "#fa7328",
            color: "#111",
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