import React, { useCallback, useEffect, useState, useRef } from 'react'
import styles from './Header.module.css';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { getNfts } from '../../handlers/getNFTs';
import { Switch } from '@mui/material';
import {FiTarget} from 'react-icons/fi'


const chains = [
  "ETHEREUM",
  "MATIC",
  "BSC",
  "AVALANCHE"
]




function Header({ setItems, items, setObserver, setLoadingMore, chain,setChain}) {
  const [address, setAddress] = useState('')
  const [cursor, setCursor] = useState(null)
  const [limit, setLimit] = useState(10)
  const [theme, setTheme] = useState('dark');
  const [fetchingMore, setFetchingMore] = useState(false)
  const addressRef = useRef();

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  }


  const fetchMoreNFTS = async () => {
    try {
      setLoadingMore(true)
      const result = await getNfts(address, chain, limit, cursor);
      setCursor(result.data.cursor);
      
      setItems(prev => {
        return {
          ...prev,
          data: [...prev.data, ...result.data.result]
        }
      })

      setLoadingMore(false)
    }
    catch (error) {
      console.log(error)
      setLoadingMore(false)
    }

  }

  const handleThemeSwitch = (e)=> {
    
    if(theme === "dark"){
      let theme = "light"
      setTheme('light');
      document.documentElement.setAttribute('data-theme', theme);
    }else {
      let theme  = "dark"
      document.documentElement.setAttribute('data-theme', theme);
      setTheme(theme);
    }
  }

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };




    if (items && items.length > 0) {
      let canFetchMore = true;
      let previousY = 0;
      let alreadyFetched;
      let observer = new IntersectionObserver(async (entry) => {
        const currentY = window.pageYOffset;
        entry.forEach(async(entry_)=> {
          if (entry_.isIntersecting &&  currentY > previousY) {
            let id = entry_.target.id;
            id = id.slice(4);
            if (id === items[items.length - 1]?.token_id) {
              if (canFetchMore && alreadyFetched!== id) {
                canFetchMore = false;
                await fetchMoreNFTS();
                alreadyFetched = id;
                canFetchMore = true;
              }
            }
          }
        })


       
       


        previousY = currentY;



      }, options);

      setObserver(observer);

    }
  }, [items])


  const handleSearchAddress = async (e) => {
    let address = addressRef.current.value
    let cursor = null;
    console.log(address)
    if (!ethers.isAddress(address.trim())) {
      toast.error("Not a valid address");
      return;
    }

    try {
      setItems(prev => {
        return {
          ...prev,
          state: "pending",
          data: []
        }
      })
      const result = await getNfts(address, chain, limit, cursor);
      setCursor(result.data.cursor);
      setItems(prev => {
        return {
          ...prev,
          data: result.data.result,
          state: "success"
        }
      })
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          console.log(error)
          toast(error.response.data.message);
        }
      }
      else {
        console.log(error)
        toast('An error occurred with the server');
        setItems(prev => {
          return {
            ...prev,
            state: "error"
          }
        })
      }

    }


  }



  const handleSelectChain = async (e) => {
    setChain(e.target.value)
  }

  return (
    <>
    <div className={styles.hero}>
     <FiTarget/>
      NFT Hunter
    </div>
    <div className={styles.container}>
      <div>
        <div className={styles.darkModeSwitch}>
          <div>Toggle Mode</div>
        <Switch onChange={handleThemeSwitch} checked={theme === "dark" ? true: false}  label="switch"/>
        </div>
        
      
  
        <select className={styles.select} onChange={handleSelectChain}>
          {chains.map(item => (
            <option selected={item == chain ? true: false} key={item}>{item}</option>
          ))}

        </select>
      </div>
      <div className={styles.searchBar}>
        <input ref={addressRef} value={address} onChange={handleAddressInput} className={styles.input} placeholder='Search Address or ENS name' />
        <button onClick={handleSearchAddress} className={styles.button}> Search</button>
      </div>

    </div>
    </>
  )
}


export default Header