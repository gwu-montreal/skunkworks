import React from "react";
import styled, { css } from "astroturf";

import Text from "../sample.mdx";

const { button, icongroup, avatar } = css`
  .button {
    color: black;
    border: 1px solid black;
    background-color: white;
    display: inline-block;
  }

  .icongroup {
    display: flex;
    flex-direction: column;
    width: 96px;
    align-items: center;
  }

  .avatar {
    border-radius: 50%;
  }
`;

const Butt = styled.div`
  background-color: lime;
`;

const Index: React.FC = () => {
  return (
    <Butt>
      <Text />
      <div className={button}>greets</div>
    </Butt>
  );
};

export default Index;
