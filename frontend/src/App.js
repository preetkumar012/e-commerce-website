
import React, { useEffect } from 'react'
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './componets/Header.js'
import Footer from './componets/Footer.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './comman/index.js'
import Context from './context/index.js'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice.js'


function App() {
  const dispatch = useDispatch()


  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',

    })
    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log('data-user', dataResponse)

    // console.log(dataApi)

  }
  useEffect(() => {
    fetchUserDetails()
  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails //user details fetch
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-120px)] '>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
