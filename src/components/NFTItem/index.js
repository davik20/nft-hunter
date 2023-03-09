import React, {useState, useEffect, useRef} from 'react'
import styles from './NFTItem.module.css';
import NFTDetails from '../NFTDetails/index';


const  NFTItem = ({item, observer, chain}) => {

    const [showDetails, setShowDetails] = useState(false);
    const ref = useRef()


     useEffect(()=> {
        if(observer){
            observer.observe(ref.current)
        }
    }, [observer])


    const handleShowDetails = ()=> {
        setShowDetails(true)
      }
   
      const closeDetails = ()=> {
       setShowDetails(false)
      }

    let img_url = "";

    try {
     let metadata = JSON.parse(item.metadata);
    if(metadata.image || metadata.image_data){
        img_url = metadata.image || metadata.image_data
    }
    if(img_url && img_url.startsWith('ipfs')){
        img_url = `https://ipfs.io/ipfs/${img_url.slice(7)}`;
    }

    } catch (error) {
        console.log(error)
            img_url = ""
    }
    
    

    let details = {...item, img_url};
    


   
    return (
        <>
         {showDetails && <NFTDetails chain={chain} item={details} closeModal={closeDetails} />}
        <div ref={ref} className={styles.container} id={`nft-${item.token_id}`} onClick={handleShowDetails}>
                <img className={styles.img} src={img_url} onerror="this.onerror=null;this.src='https://i.seadn.io/gae/Dpf1IjvAGiFLtiqkpCAXXkl_x6OAhevwTPzlS3M9R8LDqI0KZHaLKVHv9Gm2iEmE_TEEad03QiLKto3bi9XmIiPnuWUrvvL44Q2Ujq4?auto=format&w=1000';" />

            <div className={styles.nftContent}>
                <h2>{item.name}</h2>
                <h3># {item.token_id}</h3>
            </div>
        </div>
        </>
    )
}

export default NFTItem