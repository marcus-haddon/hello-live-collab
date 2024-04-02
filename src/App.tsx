import { useState } from 'react'
import { Provider } from 'react-redux'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { NotesRoute } from './components/routes'
import { store } from './state';


function App() {
  return (
    <Provider store={store}>
      <NotesRoute />
    </Provider>
  );
}

export default App
