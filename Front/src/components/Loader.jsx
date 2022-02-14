import React from 'react';
import { Dimmer, Loader as LoaderUI, Image, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const Loader = () => {
  return (
    <Segment style={{ height: '100vh' }}>
      <Dimmer active>
        <LoaderUI>Loading</LoaderUI>
      </Dimmer>

      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  );
};

export default Loader;
