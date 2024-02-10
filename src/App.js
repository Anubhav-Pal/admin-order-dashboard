import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/Auth/login';
import LoggedUserOrders from './components/LoggedUserOrders';
import { useEffect, useState } from 'react';

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [accessToken, setAccessToken] = useState(null);
  
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const storedAccessToken = localStorage.getItem('accessToken');
        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
        }
      } catch (error) {
        console.error('Error restoring authentication:', error);
      }
    };

    restoreAuth();
  }, []);

  useEffect(() => {
    const saveAuth = () => {
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    };

    saveAuth();
  }, [accessToken]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    if (isAuthenticated) {
      fetchAccessToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <div className='flex items-center justify-center font-bold text-2xl'>Loading...</div>;
  }

  return (
    <div className='overflow-x-hidden'>
      {isAuthenticated ? (
        <>
          {console.log(accessToken)}
          {accessToken}
          <LoggedUserOrders />
        </>
      ) : (
        <div className="flex flex-col items-center justify-between gap-5 p-4">
          <div className='font-bold text-2xl'>Hey there, please login to see your orders</div>
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default App;
