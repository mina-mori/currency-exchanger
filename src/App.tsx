import logo from './exchange-logo.svg';
import './App.scss';
import Home from './pages/home/home';
import { Route, BrowserRouter as Router, BrowserRouter, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <div className='sticky-header'>
        <div className='header-logo'>
          <img src={logo} alt="logo" />
        </div>
        <div className='exchange-samples'>
          <button>EUR-USD Details</button>
          <button>EUR-GBP Details</button>
        </div>
      </div>
      <div className='pages'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/home" element={<Home />}>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
