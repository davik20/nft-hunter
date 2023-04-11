import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '@/components/Header'
import NFTList from '@/components/NFTList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react'


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
    <div className={styles.container}>
      <ToastContainer />
      <Header setItems={setItems} setObserver={setObserver} items={items.data} setLoadingMore={setLoadingMore} chain={chain} setChain={setChain} />
      <div className={styles.nftListContainer}>
        <NFTList chain={chain} observer={observer} items={items} loadingMore={loadingMore} />
      </div>
    </div>
  )

  


}
