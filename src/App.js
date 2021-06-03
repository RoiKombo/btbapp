import React, { useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useHistory,
  withRouter,
} from 'react-router-dom';
import Styled from 'styled-components';
import { Login } from './components/Login';
import dataContext from './components/DataComponent';
import './styles.css';
import { Details } from './components/Details';
import { Loan } from './components/Loan';
import { Success } from './components/Success';
import BankDetails from './components/BankDetails';
import exit from './images/exit.svg';

const Container = Styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    height: 100vh;
    @media (max-width: 1000px) {
      grid-template-rows: 1fr 5fr;
      grid-template-columns: none;
    }
`;
const RightColumn = Styled.div`
    display: grid;
    grid-column: 2/3;
    background-color: var(--pastelBlue);
    color: var(--fontGrey);
    font-family: var(--arimoFam)
    @media (max-width: 1000px) {
      grid-row: 1/2;
      display: flex;
      /* align-items: center; */
      width: 100vw;
    }
`;
const LeftColumn = Styled.div`
    grid-column: 1/2;
    display: flex;
    justify-content: center; 
    @media (max-width: 1000px) {
      grid-row: 2/2;
      grid-column: none;
    }
`;
const Side = Styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    margin-top: 50px;
    margin-right: 50px;
`;
const Disconnect = Styled.div`
  margin-bottom: 15px;
`;
const MyImg = Styled.img`
  display: flex;
  width: 25px;
  margin: auto;
  margin-bottom: 10px;
  margin-left: 10px;
`;
const SideBySide = Styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 1000px) {
  justify-content: flex-start;      
    }
`;

export const DataContext = React.createContext();

function App() {
  const history = useHistory();
  const [accountInfo, setAccountInfo] = useState('');
  const [token, setToken] = useState('');
  const { Provider } = dataContext;

  const disconnect = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <Provider
      value={{
        token,
        setToken,
        accountInfo,
        setAccountInfo,
      }}
    >
      <Switch>
        <Container>
          <LeftColumn>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/details" component={Details} />
            <Route path="/bank" component={BankDetails} />
            <Route path="/loan" component={Loan} />
            <Route path="/success" component={Success} />
          </LeftColumn>
          <RightColumn>
            <Side>
              <Disconnect>
                <SideBySide onClick={disconnect}>
                  <span>התנתק</span>
                  <MyImg src={exit} onClick={disconnect} />
                </SideBySide>
              </Disconnect>
            </Side>
          </RightColumn>
        </Container>
      </Switch>
    </Provider>
  );
}

export default App;
