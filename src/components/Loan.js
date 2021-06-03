import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Styled from 'styled-components';
import '@reach/slider/styles.css';
import {
  Slider,
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
  SliderMarker,
} from '@reach/slider';
import dataContext from './DataComponent';
import { updateDetails } from './ApiRequests';

const Container = Styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const CustomRoundedCard = Styled.div`
    direction: rtl;
    /* align-self: center; */
    background: #ffffff;
    color: #495057;
    box-shadow:  3px 3px 17px #e1e1e3, -3px -3px 17px #ffffff;
    border-radius: 15px;
    margin-top: 30px;
    margin-left: 25px;
    margin-right: 25px;
    padding: 35px;
    font-size: var(--heading-5);
    width: 280px;
`;
const MySliderInput = Styled(SliderInput)`
    display: flex;
    justify-content: center;
    align-self: center;
    width: 250px;
    margin-bottom: 15px;
`;
const BackButton = Styled.div`
    display: flex;
    width: 155px;
    height: 30px;
    background-color: #ffffff;
    border: 1px solid var(--pastelBlue);
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-right: 25px;
    margin-left: 25px;
    margin-top: 40px;
    margin-bottom: 20px;
    border-radius: 8px; 
    padding: 8px;
`;
const LineInput = Styled.input`
    appearance: none;
    margin: 0 10px;
    border: none;
    padding:12px;
    border-radius: 3px;
    background-color: #f9f9f9;
    outline: none;
    border-bottom: 2px solid #a7bbc7;
    margin-bottom: 25px;
    :focus::placeholder {
      color: transparent;
    }
    :focus{
      border-bottom: 2px solid #687980;
      transition: color 0.3s ease;
    }
    ::placeholder {
      color: #a7bbc7;
      transition: color 0.3s ease;
    }
  `;
const SubHeading = Styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: var(--heading-5);
  margin-bottom: 30px;
`;
const MyButton = Styled.div`
    display: flex;
    width: 155px;
    height: 30px;
    background-color: var(--pastelBlue);
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-right: 25px;
    margin-left: 25px;
    margin-top: 40px;
    margin-bottom: 20px;
    border-radius: 8px; 
    padding: 8px;
`;
const SideBySide = Styled.div`
  display: flex;
  justify-content: center;
`;

export const Loan = () => {
  const history = useHistory();
  const backClick = () => {
    history.push('/bank');
  };
  const { accountInfo } = useContext(dataContext);

  const [loanSize, setLoanSize] = useState(0);
  const [returnTime, setReturnTime] = useState(0);

  const returnPeriod = (e) => {
    setReturnTime(e);
  };

  const getApproval = () => {
    updateDetails({
      ...accountInfo,
      return_time: returnTime,
      loan_size: loanSize,
    });
    history.push('/success');
  };

  return (
    <div>
      <Container>
        <CustomRoundedCard>
          <Container>
            <SubHeading>
              הגענו לעצם העניין, על איזה סכום אנחנו מדברים?
            </SubHeading>
            <LineInput
              type="type"
              placeholder="100,000-1,000,000 שח"
              onClick={(e) => setLoanSize(e.target.value)}
            />
            <SubHeading>ניתן לפרוס את החזר ההלוואה בין 4 ל-8 שנים</SubHeading>
            <MySliderInput min={4} max={8} step={1} onChange={returnPeriod}>
              <SliderTrack>
                <SliderRange />
                <SliderHandle />
              </SliderTrack>
            </MySliderInput>
          </Container>
        </CustomRoundedCard>
        <SideBySide>
          <MyButton onClick={getApproval}>הגש בקשה</MyButton>
          <BackButton onClick={backClick}>חזור</BackButton>
        </SideBySide>
      </Container>
    </div>
  );
};
