import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store.js'; 
import Home from './pages/Home.jsx';
import { Signup,Login } from './components/index';

const router = createBrowserRouter([
  {path: '/',element: <App />,
    children:[
      {path: '/', element: <Home />},
      {path: '/signup', element: <Signup />},
      {path: '/login', element: <Login />},
    ]}
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
