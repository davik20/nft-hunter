const { createContext, useContext } = require("react");



export const appContext = createContext();




const  useAppContext = () => {

    let context = useContext(appContext)
  
    if(!context)  throw new Error("Please use Auth context inside Auth provider");
  
    return context
  
  }
  
  export default useAppContext