import { forwardRef } from "react";

import Paragraph from "./Paragraph";

function Patience(_, ref) {
  return (
    <Paragraph
      ref={ref}
      position={[-22, 2, 0]}
      title="Patience"
      pronounciation="/ˈpeɪʃ(ə)ns/"
      definition="Sometimes I put myself in difficult circumstances 😤"
      sentence1="Just to endure them 💪"
      sentence2="Don't worry, I tend not to do this in work-related stuff"
      conclusion="If we don't train our patience, we cannot acomplish bigger things"
    />
  );
}

export default forwardRef(Patience);
