import { forwardRef } from "react";

import Paragraph from "./Paragraph";

function Time(_, ref) {
  return (
    <Paragraph
      ref={ref}
      position={[15, 4, 0]}
      title="Time"
      pronounciation="/tʌɪm/"
      definition="Time is valuable and it's running"
      sentence1="If you dont' have the time right now"
      sentence2="Just download my resume by pressing [SPACE]"
      conclusion="Otherwise keep scrolling"
    />
  );
}

export default forwardRef(Time);
