import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import Home from './pages/Home.jsx';
import { Signup, Login, PostForm, PrivateRoute } from './components/index';
import Post from './pages/Post';

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      {
        path: '/',
        element: 
        <PrivateRoute authenticated={false}>
          <Home />
        </PrivateRoute>
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
          <PostForm />
        </PrivateRoute>  },
      {
        path: '/posts/:slug/:id',
        element: 
        <PrivateRoute authenticated={false}>
          <Post />
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
