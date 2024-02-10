// import logo from './logo.svg';
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/Auth/login';
import LogoutButton from './components/Auth/logout';
import Profile from './components/Auth/profile';


function App() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <LogoutButton />
          <Profile />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );

}

export default App;
