import { forwardRef } from "react";

import Paragraph from "./Paragraph";

function ReactJS(_, ref) {
  return (
    <Paragraph
      ref={ref}
      position={[0, 0, 0]}
      title="React JS"
      pronounciation="/rɪˈakt/"
      definition="I got into the javascript and react world, and I'm here to stay"
      sentence1="bla bla bla bla"
      sentence2="la la la la"
      conclusion="ahahhahahhahhahaha"
    />
  );
}

export default forwardRef(ReactJS);
