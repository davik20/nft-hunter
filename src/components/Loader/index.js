import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import styles from './Loader.module.css'
function Loader({}) {
  return (
      <div className={styles.container}><ClipLoader color='#9e9e9e' size={70}/> </div>
  )
}

export default Loader