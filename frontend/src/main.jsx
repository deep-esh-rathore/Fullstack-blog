import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import Home from './pages/Home.jsx';
import { Signup, Login,CreatePost, PrivateRoute,EditPost } from './components/index';
import Post from './pages/Post';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      {
        path: '/',
        element: 
          <Home />
      },
      { path: '/signup', element:
        <PrivateRoute authenticated={false}>
          <Signup />
        </PrivateRoute>  },
      { path: '/login', element:
        <PrivateRoute authenticated={false}>
          <Login />
        </PrivateRoute>  },
      { path: '/posts/create', element:
        <PrivateRoute authenticated={true}>
          <CreatePost />
        </PrivateRoute>  },
      {
        path: '/posts/:slug/:id',
        element: 
          <Post />
      },
      {path: '/edit/:id', element:
        <PrivateRoute authenticated={true}>
          <EditPost />
        </PrivateRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
