/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import dataContext from './DataComponent';
import { fetchUser } from './ApiRequests';

const FlexContainer = Styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    `;
const MyLabel = Styled.label`
    align-self: flex-end; 
    font-size: var(--heading-5);
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
const CustomRoundedCard = Styled.div`
    background: #ffffff;
    color: #495057;
    box-shadow:  3px 3px 17px #e1e1e3, -3px -3px 17px #ffffff;
    border-radius: 15px;
    margin: 20px 0 30px 0px;
    padding: 23px;
    `;
const Heading = Styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: var(--heading-2);
    color: var(--pastelBlue)
    `;
const SubHeading = Styled.div`
    font-size: var(--heading-4);
    `;
const LineInput = Styled.input`
    appearance: none;
    border: none;
    padding:12px;
    border-radius: 3px;
    background-color: #f9f9f9;
    outline: none;
    border-bottom: 2px solid #a7bbc7;
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

export const Login = () => {
  const history = useHistory();
  const { setAccountInfo } = useContext(dataContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const userPayload = await fetchUser(email, password);
    setAccountInfo(userPayload);
    history.push('/details');
    window.localStorage.setItem('userInfo', JSON.stringify(userPayload));
  };

  return (
    <div>
      <Heading>Welcome to BTB</Heading>
      <SubHeading>
        בכמה צעדים פשוטים עסק החלומות שלך יכול להפוך למציאות
      </SubHeading>
      <CustomRoundedCard>
        <FlexContainer>
          <MyLabel htmlFor="Email">דוא״ל</MyLabel>
          <LineInput
            id="Email"
            value={email}
            placeholder="user@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyLabel htmlFor="Password">סיסמא</MyLabel>
          <LineInput
            id="Password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MyButton onClick={handleClick}>כניסה</MyButton>
        </FlexContainer>
      </CustomRoundedCard>
    </div>
  );
};

export default Login;
