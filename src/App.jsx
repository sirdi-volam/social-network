import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage/HomePage';
import './styles/main.scss';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './app/providers/ThemeProvider/ThemeProvider';
import { Register } from './pages/Register/Register';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
