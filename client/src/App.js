import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { Provider } from 'react-redux';
import Navigator from './navigator/Navigator';

import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;
