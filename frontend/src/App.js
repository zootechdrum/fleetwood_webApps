import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import ReceivingStage from './screens/ReceivingStage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/menu' element={
          <ProtectedRoute >
            <MenuScreen />
          </ProtectedRoute>
          } />
        <Route path='/ReceivingStage' element={
          <ProtectedRoute >
            <ReceivingStage />
          </ProtectedRoute>
          } />
        <Route path="*" element={<HomeScreen />} />
      </Routes>

    </Router>
  )}

export default App;
