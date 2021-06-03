import React from 'react';
import Styled from 'styled-components';

const Heading = Styled.div`
    top: 50px;
    direction: rtl;
    font-size: var(--heading-3);
`;

export const Success = () => (
  <Heading>
    <p>מותר להתרגש!</p>
    <p>לקחת את הצעד הראשון להגשמת העסק החלומי שלך! נבדוק את בקשתך</p>
    וניצור עמך קשר בהקדם!
  </Heading>
);
