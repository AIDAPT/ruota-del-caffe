import { ThemeProvider } from '@mui/system';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ErrorPage } from './pages/ErrorPage';
import { MainPage } from './pages/MainPage';
import { theme } from './Theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />}/>
            <Route path='*' element={<ErrorPage />}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
