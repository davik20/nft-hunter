import React, { useMemo, useState, useEffect } from 'react'
import styles from './NFTList.module.css';
import NFTItem from '../NFTItem';
import Modal from '../modal/index';
import NFTDetails from '../NFTDetails/index';
import Loader from '../Loader';
import { BiFileFind } from 'react-icons/bi';
import { HiEmojiHappy } from 'react-icons/hi';
import {GiShrug} from 'react-icons/gi'
import useAppContext  from '../../context/AppContext.js';





function NFTList() {

    const {items, observer, loadingMore, chain} = useAppContext()
    console.log(observer, 'observer', loadingMore, chain)
    const { state, data, error } = items;






    if (state === "success" && data.length === 0) {
        return (
            <div className={styles.empty}><p> <span>
                <GiShrug/></span>No NFT collection found with this address, try switching chains  </p>
            </div>
        )
    }

    if (state !== "success") {

        return (
            <>
                {
                    state === "idle" && <div className={styles.empty}><p> <span>
                        <HiEmojiHappy/></span>Uh oh, No collection yet, use the search bar above to search for an NFT collection </p></div>
                }
                {
                    state === "pending" && <div className={styles.empty}> <Loader /> </div>
                }
                {
                    state === "error" && <div className={styles.empty}><p><span><BiFileFind/></span>An error Occured, Choose another address and search </p></div>
                }


            </>

        )
    }



    return (
        <>
            <div className={styles.container}>

                {state === "success" && data.map(item => (
                    <NFTItem chain={chain} key={item.token_id} item={item} observer={observer} />
                ))}



            </div>

            {loadingMore && <Loader />}

        </>
    )
}

export default NFTList