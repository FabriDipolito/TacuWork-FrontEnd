import React from "react";

import { NextFixedPage } from "./styles";

const Background: React.FC = ({
  children,
}) => {

  return (
    <NextFixedPage>
        {children}
    </NextFixedPage>
  );
};
export default Background;