﻿import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

function LoadingComponent({inverted = true, content = 'پارسی گرام...' }: Props) {
  return (
      <Dimmer active={true} >
          <Loader content={content} inverted={inverted }/>
      </Dimmer>
  );
}

export default LoadingComponent;