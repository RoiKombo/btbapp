/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import dataContext from './DataComponent';
import workIcon from '../images/briefcase.svg';
import userIcon from '../images/user.svg';
import { updateDetails } from './ApiRequests';

const Container = Styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 765px) {
        flex-direction: column;
        align-items: center;  
      }
`;
const SideBySide = Styled.div`
  display: flex;
  justify-content: center;
`;
const CustomRoundedCard = Styled.div`
    background: #ffffff;
    color: #495057;
    box-shadow:  3px 3px 17px #e1e1e3, -3px -3px 17px #ffffff;
    border-radius: 15px;
    margin-top: 30px;
    margin-left: 25px;
    margin-right: 25px;
    padding: 35px;
    font-size: var(--heading-5);
    width: 250px
    `;
const Heading = Styled.div`
    display: flex;
    justify-content: center;
    font-size: var(--heading-4);
    margin-top: 40px;
    margin-bottom: 20px;
`;
const SubHeading = Styled.div`
    display: flex;
    justify-content: center;
    font-size: var(--heading-4);
    margin-bottom: 20px;
`;
const MyLabel = Styled.label`
    align-self: flex-end; 
`;
const FlexContainer = Styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    `;
const LineInput = Styled.input`
    /* direction: rtl; */
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

const MyImg = Styled.img`
  display: flex;
  width: 25px;
  margin: auto;
  margin-bottom: 10px;
`;

export const Details = () => {
  const history = useHistory();
  const { accountInfo, setAccountInfo } = useContext(dataContext);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (accountInfo.userData) {
      setUserDetails(accountInfo.userData);
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {
        setUserDetails(userInfo.userData);
      } else {
        setUserDetails({});
      }
    }
  }, []);

  console.log('userDetails', userDetails);
  const handleClick = () => {
    updateDetails(userDetails); // send data to db
    setAccountInfo(userDetails); // update global cotext
    // window.localStorage.setItem('userInfo', JSON.stringify(userDetails)); // update localStorage
    history.push('/bank');
  };
  return (
    <div>
      <Heading>
        ???????? ?????? ?????????? ?????????? ?????? ???????????? ?????????????? ?????????? ???????? ????????????
      </Heading>
      <Container>
        <CustomRoundedCard>
          <MyImg src={workIcon} />
          <SubHeading>???????? ????????</SubHeading>
          <FlexContainer>
            <MyLabel htmlFor="email">??????????</MyLabel>
            <LineInput
              id="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <MyLabel htmlFor="phone">???????? ??????????</MyLabel>
            <LineInput
              id="phone"
              value={userDetails.phone}
              onChange={(e) =>
                setUserDetails({ ...userDetails, phone: e.target.value })
              }
            />
            <MyLabel htmlFor="business">???? ????????</MyLabel>
            <LineInput
              style={{ direction: 'ltr' }}
              id="business"
              value={userDetails.company_name}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,

                  company_name: e.target.value,
                })
              }
            />
            <MyLabel htmlFor="bNumber">??.??\ ????????????\ ??????????</MyLabel>
            <LineInput
              id="bNumber"
              value={userDetails.business_number}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  business_number: e.target.value,
                })
              }
            />
          </FlexContainer>
        </CustomRoundedCard>
        {/* <<<<<< */}
        <CustomRoundedCard>
          <MyImg src={userIcon} />
          <SubHeading>?????????? ????????????</SubHeading>
          <FlexContainer>
            <MyLabel htmlFor="firstName">???? ????????</MyLabel>
            <LineInput
              id="firstName"
              value={userDetails.first_name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, first_name: e.target.value })
              }
            />
            <MyLabel htmlFor="lastName">???? ??????????</MyLabel>
            <LineInput
              id="lastName"
              value={userDetails.last_name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, last_name: e.target.value })
              }
            />
            <MyLabel htmlFor="id">??.??</MyLabel>
            <LineInput
              id="id"
              value={userDetails.id}
              onChange={(e) =>
                setUserDetails({ ...userDetails, id: e.target.value })
              }
            />
            <MyLabel htmlFor="bday">?????????? ????????</MyLabel>
            <LineInput
              id="bday"
              type="date"
              value={moment(userDetails.date_of_birth).format('YYYY-MM-DD')}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  date_of_birth: e.target.value,
                })
              }
            />
          </FlexContainer>
        </CustomRoundedCard>
      </Container>
      <Container>
        <SideBySide>
          <MyButton onClick={handleClick}>????????</MyButton>
        </SideBySide>
      </Container>
    </div>
  );
};

export default Details;
