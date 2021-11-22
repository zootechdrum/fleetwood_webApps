import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
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
      </Routes>
    </Router>
  )}

export default App;
