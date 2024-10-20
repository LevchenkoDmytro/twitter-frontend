import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/auth/login/LoginPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import Sidebar from "./components/common/Sidebar"
import RightPanel from "./components/common/RightPanel"
import NotificationPage from "./pages/notification/NotificationPage"
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from "@tanstack/react-query"
import { userInfo } from "./api/auth"
import LoadingSpinner from "./components/common/LoadingSpinner"

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: userInfo,
    retry: false,
  })

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className={`flex max-w-[1255px] mx-auto ${!data && 'justify-center items-center'}`}>
      {data && <Sidebar />}
      <div>
        <Routes>
          <Route path="/" element={data ? <HomePage /> : <Navigate to={'/login'} />} />
          <Route path="/login" element={!data ? <LoginPage /> : <Navigate to={'/'} />} />
          <Route path="/signup" element={!data ? <SignUpPage /> : <Navigate to={'/'} />} />
          <Route path="/notifications" element={data ? <NotificationPage /> : <Navigate to={'/login'} />} />
          <Route path="/profile/:username" element={data ? <ProfilePage /> : <Navigate to={'/login'} />} />
        </Routes>
      </div>
      {data && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App
