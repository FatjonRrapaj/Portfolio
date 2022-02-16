import { forwardRef } from "react";

import Paragraph from "./Paragraph";

function Android(_, ref) {
  return (
    <Paragraph
      ref={ref}
      position={[0, 0, 5]}
      title="Android"
      pronounciation="/ˈpeɪʃ(ə)ns/"
      definition="This is the starting point of my career as a Software Developer"
      sentence1="I learned the internal mobile lifecycle and some OOP design patterns"
      sentence2="Build and shipped 2 Android Native Apps"
      conclusion="Press [1] for app 1 and press [2] for app 2"
    />
  );
}

export default forwardRef(Android);
