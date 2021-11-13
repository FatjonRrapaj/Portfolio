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
      <h1>
        Hello <div className="helloHand">👋</div> ,
      </h1>
      <h2>I'm Fatjon</h2>
      <h6>React Js and React Native Developer</h6>
      <br />
      <br />
      <br />
      <p>I love making cool webistes and mobile apps (to be edited)</p>
    </div>
  );
});

export default Welcome;
