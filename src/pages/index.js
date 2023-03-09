import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '@/components/Header'
import NFTList from '@/components/NFTList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react'
import AppContextProvider from '../context/AppContextProvider';


export default function Home() {
  const [items, setItems] = useState({
    state: "idle",
    data: null,
    error: null
  })
  const [observer, setObserver] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [chain, setChain] = useState("ETHEREUM");


  return (
    <AppContextProvider>
      <div className={styles.container}>
        <ToastContainer />
        <Header/>
        <div className={styles.nftListContainer}>
          <NFTList/>
        </div>
      </div>
    </AppContextProvider>

  )
}