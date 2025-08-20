import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer, Loading } from './components/index'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './services/authServices'
import { login, logout, setLoading } from './store/authSlice'

function App() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)
  // const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(setLoading(true))
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser()
        dispatch(login({ user: response }))
        // console.log('Current user fetched:', response)
      } catch (error) {
        console.error('Failed to fetch current user:', error)
        dispatch(logout())
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchCurrentUser()
  }, [dispatch]);
  
  return (
    <>
      {loading && <Loading />}
      <div  className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
