import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/Auth/login';
import LoggedUserOrders from './components/LoggedUserOrders';



function App() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    <div className='overflow-x-hidden'>
      {isAuthenticated ? (
        <>
        <LoggedUserOrders/>

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
