import { forwardRef } from "react";
import { Html } from "@react-three/drei";

function Paragraph(
  {
    title = "Time",
    pronounciation = "/tʌɪm/",
    definition = "Time is valuable, and it's running",
    sentence1 = " If you dont' have the time right now",
    sentence2 = " Just download my resume by pressing [SPACE]",
    conclusion = "Otherwise, keep scrolling",
    position = [15, 4, 0],
    children,
  },
  ref
) {
  return (
    <Html
      position={position}
      ref={ref}
      transform
      sprite
      style={{
        opacity: 0,
      }}
    >
      <h1 style={{ color: "white" }}>{title}</h1>
      <h2 style={{ color: "white" }}>{pronounciation}</h2>
      <h3 style={{ color: "white" }}>{definition}</h3>
      <p style={{ color: "white" }}>{sentence1}</p>
      <p style={{ color: "white" }}>{sentence2}</p>
      <p style={{ color: "white" }}>{conclusion}</p>
      {children}
    </Html>
  );
}

export default forwardRef(Paragraph);
