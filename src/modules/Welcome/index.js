import React, { useImperativeHandle, forwardRef } from "react";
import "./styles.css";

const Welcome = forwardRef(({ tl }, ref) => {
  useImperativeHandle(ref, () => {
    return {
      fadeOut() {
        tl.to(ref.current, { opacity: 0 });
      },
    };
  });

  return (
    <div className="welcomeContainer">
      <h1 style={{ fontSize: 100 }}>
        Hello <div className="helloHand">👋</div> ,
      </h1>
      <h2 style={{ fontSize: 80, marginTop: -24 }}>I'm Fatjon</h2>
      <h6 style={{ fontSize: 40 }}>React Js and React Native Developer</h6>

      <p style={{ fontSize: 20, marginTop: 40 }}>
        &emsp; I love making cool webistes I love making
        <br />
        I love making cool webistes and mobile apps
        <br />
        I love making cool webistes and mobile apps
        <br />
      </p>
    </div>
  );
});

export default Welcome;
