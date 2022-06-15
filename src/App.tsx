import logo from './assets/images/exchange-logo.svg';
import './App.scss';
import Home from './pages/home/home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Details from './pages/details/details';
import InfoAlert from './components/shared/info-alert/infoAlert';

const App = () => {
  const navigation = useNavigate();
  const eurToUsd = () => {
    navigation('/details/1/EUR/USD');
  }
  const eurToGbp = () => {
    navigation('/details/1/EUR/GBP');
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
        <InfoAlert message="When you change on 'Amount', 'Form' and 'To' fields, you should re-click to 'Convert' button to view new the results"></InfoAlert>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/home" element={<Home />}>
          </Route>
          <Route path="/details/:amount/:from/:to" element={<Details />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;