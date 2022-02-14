import { BrowserRouter } from 'react-router-dom';
// import { HashRouter } from "react-router-dom";

import './App.css';
import Container from './components/Container';
import ScrollToTop from './helper/ScrollToTop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Container />
      </BrowserRouter>
    </div>
  );
}

export default App;
