import React from 'react';
import {   CustomProvider  } from 'rsuite';
 
import 'rsuite/dist/rsuite-no-reset.min.css';
import './App.css';
import Drawer from './Components/AppUi/Drawwer';
 
import Landing from './Components/Landing';

function App() {
  return (
    <CustomProvider theme="dark">
      <Drawer/>
      <Landing/>
       
    </CustomProvider>
  );
}

export default App;