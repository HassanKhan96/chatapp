import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { io } from 'socket.io-client';
import Login from './Login';
import Chat from './Chat';
import Context from './Context/Context';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [userCred, setUserCred] = useState({ username: '', password: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   if(socket){
  //     socket.on('connect', () => {
  //       if(socket.connected){
  //         console.log('connected')
  //         setIsLoggedIn(true);
  //       }
  //     })
  //   }
  // })

  const onConnect = (user) => {
    const soc = io('http://localhost:5000').connect()
    if (soc) {
      soc.auth = { user }
      soc.on('connect_error', (error) => {
        console.log(error)
        NotificationManager.error(error.message, "Login Error:")
      })
      setSocket(soc)
    }
  }
  return (
    <div className="App">
      <Context.Provider
        value={{
          socket,
          setSocket,
          onConnect,
          userCred,
          setUserCred,
          users,
          setUsers,
          currentUser,
          setCurrentUser
        }}
      >
        {
          !socket ?
            <Login />
            :
            <Chat />
        }

        <NotificationContainer />
      </Context.Provider>
    </div>
  );
}

export default App;
