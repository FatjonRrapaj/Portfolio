import { forwardRef } from "react";

import Paragraph from "./Paragraph";

function IOS(_, ref) {
  return (
    <Paragraph
      ref={ref}
      position={[0, 2, 10]}
      title="iOS"
      pronounciation="/ʌɪəʊˈɛs/"
      definition="iOS development was next, and I had the chance to learn some even more complex design patterns on SWIFT"
      sentence1="Refactored, Maintained and Built from scratch multipe iOS Apps qe the ti Bash"
      sentence2="iOS was fun, but React Was better"
      conclusion="Press [1] for app 1 and press [2] for app 2"
    />
  );
}

export default forwardRef(IOS);
