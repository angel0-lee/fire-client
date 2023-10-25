import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {Button, Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getMessagingToken, onMessageListener} from './firebase';

function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [currentToken, setTokenFound] = useState('');

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));


  return (
    <div className="App">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      <header className="App-header">
        {currentToken.length > 0 && <h1> Notification permission enabled 👍🏻 </h1>}
        {currentToken.length === 0 && <h1> Need notification permission ❗️ </h1>}
        <h3>{currentToken}</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => getMessagingToken(setTokenFound)}>GetPermission</Button>
      </header>
    </div>
  )
};

export default App;
