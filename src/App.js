import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer 
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

      </Router>
    </UserProvider>
  );
}

export default App;