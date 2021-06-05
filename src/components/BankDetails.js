/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Slider,
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
  SliderMarker,
} from '@reach/slider';
import {
  Listbox,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox';
import '@reach/listbox/styles.css';
import dataContext from './DataComponent';
import '@reach/slider/styles.css';
import { updateDetails } from './ApiRequests';

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
    width: min-content;
    
`;
const Container = Styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 765px) {
        flex-direction: column;
        align-items: center;  
      }
`;
const SideBySide = Styled.div`
  display: flex;
  justify-content: center;
`;
const Heading = Styled.div`
    direction: rtl;
    span {
    display: flex;
    justify-content: center;
    font-size: var(--heading-4);
    margin-top: 20px;
}

`;
const SubHeading = Styled.div`
    display: flex;
    justify-content: flex-start;
    font-size: var(--heading-5);
    margin-bottom: 30px;
`;
const SubHeading2 = Styled.div`
    display: flex;
    justify-content: flex-start;
    font-size: var(--heading-5);
    margin-bottom: 30px;
    margin-top: 30px;
`;
const MySliderInput = Styled(SliderInput)`
    display: flex;
    justify-content: center;
    align-self: center;
    width: 250px;
    margin-bottom: 15px;
`;
const Percent = Styled.div`
    display: flex;
    justify-content: center;
`;

const Devider = Styled.div`
    border-top: 1px solid #eee;
    margin: 1.5rem 0rem 1.5rem 0rem;
`;
const AddButton = Styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: bottom;
    text-align: center;
    overflow: hidden;
    position: relative;
    border-radius: 3px;
    background-color: var(--pastelBlue);
    /* width: 30px;; */
    height: 30px;
    font-size: var(--heading-5);
    color: var(--fontGrey);
    padding: 0 10px;
`;
const RemoveButton = Styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: bottom;
    text-align: center;
    overflow: hidden;
    position: relative;
    border-radius: 3px;
    background-color: var(--pastelRed);
    height: 30px;
    font-size: var(--heading-5);
    color: var(--fontGrey);
    padding: 0 10px;
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
    @media (max-width: 765px) {
        margin-bottom: 10px;
      }
    
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
const TableGridHeader = Styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr 3fr 1fr; 
    @media (max-width: 765px) {
        flex-direction: column;
        align-items: center; 
        grid-template-columns:none; 
        display: flex;
      }
`;
const SavedDataGrid = Styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr; 
`;
const Column1 = Styled.div`
    grid-column: 1/2;
`;
const Column2 = Styled.div`
    grid-column: 2/3;
`;
const Column3 = Styled.div`
    grid-column: 3/4;
`;
const SavedAccount = Styled.div`
    grid-column: 2/3;
    margin-bottom: 20px;
`;
const Column4 = Styled.div`
    grid-column: 4/5;
`;
const MyListBox = Styled(Listbox)`
  
   > [data-reach-listbox-button] {
    width: 150px;
    height: 21px;
    appearance: none;
    margin: 0 10px;
    border: none;
    padding:9px;
    border-radius: 3px;
    background-color: #f9f9f9;
    outline: none;
    border-bottom: 2px solid #a7bbc7;
    @media (max-width: 765px) {
        margin-bottom: 10px;
      }
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
  }`;
const ListDiv = Styled.div`
  @media (max-width: 765px) {
        display: none;
      }
`;
const BankDetails = () => {
  const history = useHistory();
  const { accountInfo } = useContext(dataContext);
  const [bankAccounts, setBankAccounts] = useState([]);

  const [accountFields, setAccountFields] = useState({
    bank_name: 'Leumi',
    branch: '000',
    account: '0000000',
  });

  const [own, setOwn] = useState(0);
  const percentageFunc = (e) => {
    setOwn(e);
  };

  const backClick = () => {
    history.push('/details');
  };
  const nextClick = () => {
    updateDetails({ ...accountInfo, own, bank_account: bankAccounts });
    history.push('/loan');
  };

  useEffect(() => {
    if (accountInfo.bank_account.length > 0) {
      setBankAccounts(accountInfo.bank_account);
    } else {
      setBankAccounts([]);
    }
  }, []);
  const { company_name, business_number } = accountInfo;

  const addAccount = () => {
    setBankAccounts(() => [...bankAccounts, accountFields]);
  };
  const removeAccount = (e, index) => {
    bankAccounts.splice(index, 1);
    setBankAccounts(() => [...bankAccounts]);
  };
  return (
    <Container>
      <Heading>
        <span>בשלב זה נפרט את חשבונות הבנק המשויכים לעסק {company_name}</span>
        <span>ח.פ {business_number}</span>
      </Heading>
      <CustomRoundedCard>
        <Container>
          <SubHeading>יש לציין את אחוז האחזקה שלך בעסק</SubHeading>
          <MySliderInput min={0} max={100} step={10} onChange={percentageFunc}>
            <SliderTrack>
              <SliderRange />
              <SliderHandle />
            </SliderTrack>
          </MySliderInput>
          <Percent>{own}%</Percent>
        </Container>
        <Devider />
        <Container>
          <SubHeading>פרט\י לפחות חשבון אחד או יותר הקשורים לעסק</SubHeading>

          <TableGridHeader>
            <ListDiv>בנק</ListDiv>
            <ListDiv>סניף</ListDiv>
            <ListDiv>חשבון</ListDiv>
            <Column1>
              <MyListBox
                aria-labelledby="my-label"
                defaultValue="לאומי"
                value={accountFields.bank_name}
                onChange={(value) =>
                  setAccountFields({ ...accountFields, bank_name: value })
                }
              >
                <ListboxOption value="לאומי">לאומי</ListboxOption>
                <ListboxOption value="הפועלים">הפועלים</ListboxOption>
                <ListboxOption value="דיסקונט">דיסקונט</ListboxOption>
                <ListboxOption value="המזרחי">המזרחי</ListboxOption>
              </MyListBox>
            </Column1>
            <Column2>
              <LineInput
                maxLength="3"
                placeholder="מס׳ הסניף"
                id="branch"
                value={accountFields.branch}
                onChange={(e) =>
                  setAccountFields({ ...accountFields, branch: e.target.value })
                }
              />
            </Column2>
            <Column3>
              <LineInput
                maxLength="7"
                placeholder="מס׳ החשבון"
                id="account"
                value={accountFields.account}
                onChange={(e) =>
                  setAccountFields({
                    ...accountFields,
                    account: e.target.value,
                  })
                }
              />
            </Column3>
            <Column4>
              <AddButton onClick={addAccount}>שמור</AddButton>
            </Column4>
          </TableGridHeader>
        </Container>
        <SubHeading2>חשבונות מקושרים:</SubHeading2>
        {bankAccounts.length > 0 ? (
          bankAccounts.map((account, index) => (
            <SavedDataGrid key={index}>
              <Column1>{account.bank_name}</Column1>
              <SavedAccount>
                {account.branch}-{account.account}
              </SavedAccount>

              <Column3>
                <RemoveButton
                  key={index}
                  onClick={(e) => removeAccount(e, index)}
                >
                  {' '}
                  הסר{' '}
                </RemoveButton>
              </Column3>
            </SavedDataGrid>
          ))
        ) : (
          <div>לא נשמרו חשבונות עבור עסק זה</div>
        )}
      </CustomRoundedCard>
      <SideBySide>
        <MyButton onClick={nextClick}>המשך</MyButton>
        <BackButton onClick={backClick}>חזור</BackButton>
      </SideBySide>
    </Container>
  );
};

export default BankDetails;
