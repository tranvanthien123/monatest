import React from 'react';
import DefaultLayout from './default/DefaultLayout';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DefaultLayout />
    </Provider>
  )
}

export default App;
