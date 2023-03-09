import React, {useState} from 'react'
import { appContext } from './AppContext'
function AppContextProvider({children}) {

    const [items, setItems] = useState({
        state: "idle",
        data: null,
        error: null
      })

      const [observer, setObserver] = useState(null);
      const [loadingMore, setLoadingMore] = useState(false);
      const [chain, setChain] = useState("ETHEREUM");

      console.log(items)

  return (
    <appContext.Provider value={{items, setItems, observer,setObserver,  loadingMore, chain, chain, setChain}}>
        {children}
    </appContext.Provider>
  )
}

export default AppContextProvider