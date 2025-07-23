import { useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import { Header, Footer,Loading } from './components/index'
import { useDispatch,useSelector } from 'react-redux'
import { getCurrentUser } from './services/authServices'
import { login, logout,setLoading } from './store/authSlice'

function App() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    dispatch(setLoading(true))
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser()
        dispatch(login(user))
      } catch (error) {
        console.error('Failed to fetch current user:', error)
        dispatch(logout())
      }finally {
        dispatch(setLoading(false))
      }
    }
    fetchCurrentUser()
  }, [dispatch])

  return (
    loading? (<Loading/>):
    <>
    <Header/>
      <main>
        <Outlet />
      </main>
    <Footer />
    </>
  )
}

export default App
