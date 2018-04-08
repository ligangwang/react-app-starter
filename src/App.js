import React, { Component } from 'react'
import logo from './logo.svg'

import {Provider} from 'react-redux'
import {ListItems, PostItem} from './Item'
import {UserLogin} from './User'
import store from './store'
import firebaseItemProvider from './Service/Item/FirebaseItemProvider'
import firebaseUserProvider from './Service/User/FirebaseUserProvider'
import styled, { keyframes } from 'styled-components'

const Main = styled.div`
  text-align: center;
`

const Header = styled.header`
  background-color: #BBB;
  height: 150px;
  padding: 20px;
  color: white;
  > h1 {
    font-size: 1.5em;
    color: white;
  }
`
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Logo = styled.img`
  animation: ${ spin } infinite 20s linear;
  height: 80px;
`


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main>
          <Header>
            <Logo src={logo} alt="logo" />
            <h1>Welcome to React App Starter</h1>
          </Header>
          <UserLogin serviceProvider={firebaseUserProvider}/>
          <PostItem serviceProvider={firebaseItemProvider}/>
          <ListItems serviceProvider={firebaseItemProvider}/>
        </Main>
      </Provider>
    );
  }
}

export default App;
