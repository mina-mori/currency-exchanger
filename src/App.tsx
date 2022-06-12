import logo from './exchange-logo.svg';
import './App.scss';
import Home from './pages/home/home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Details from './pages/home/details/details';

const App = () => {
  const navigate = useNavigate()
  const eurToUsd = () => {
    navigate('/details/EUR/USD');
  }
  const eurToGbp = () => {
    navigate('/details/EUR/GBP');
  }
  return (
    <div className="App">
      <div className='sticky-header'>
        <div className='header-logo'>
          <img src={logo} alt="logo" />
        </div>
        <div className='exchange-samples'>
          <button onClick={eurToUsd}>EUR-USD Details</button>
          <button onClick={eurToGbp}>EUR-GBP Details</button>
        </div>
      </div>
      <div className='pages'>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/home" element={<Home />}>
          </Route>
          <Route path="/details/:from/:to" element={<Details />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
