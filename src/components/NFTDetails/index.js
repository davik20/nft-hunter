import React from 'react'
import Modal from '../modal/index';
import styles from './NFTDetails.module.css';
function NFTDetails({ closeModal, item, chain }) {

    console.log(item)
    const { name, minter_address, metadata, img_url, token_address, token_id, token_uri, contract_type, symbol } = item


    let attributes = [];
    let description;
    try {
        let _metadata = JSON.parse(metadata);
        if(_metadata){
            if(_metadata.attributes){
                attributes = _metadata.attributes;
            }
            if(_metadata.description){
                description = _metadata.description;
            }
           
        }     
        console.log(attributes)
    } catch (error) {
        attributes = [];
        console.log(error);
    }
   

    return (
        <Modal closeModal={closeModal}>

            <div className={styles.container}>
                <img className={styles.img} src={item.img_url} onerror="this.onerror=null;this.src='https://i.seadn.io/gae/Dpf1IjvAGiFLtiqkpCAXXkl_x6OAhevwTPzlS3M9R8LDqI0KZHaLKVHv9Gm2iEmE_TEEad03QiLKto3bi9XmIiPnuWUrvvL44Q2Ujq4?auto=format&w=1000';" />

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionHeader}>
                            Details
                        </h3>
                        <div className={styles.sectionContent}>
                            <div className={styles.sectionItem}>
                                <p className={styles.label}>
                                    Name
                                </p>
                                <p className={styles.description}>
                                    {name}
                                </p>
                               
                            </div>
                            <div className={styles.sectionItem}>
                                <p className={styles.label}>
                                    Description
                                </p>
                                <p className={styles.description}>
                                    {description ? `${description.slice(0, 25)}...`: "..."}
                                </p>
                               
                            </div>
                            <div className={styles.sectionItem}>
                                <p className={styles.label}>
                                    Creator Address
                                </p>
                                <p className={styles.tokenAddress}>
                                    {minter_address && minter_address.slice(0, 15)}...
                                </p>
                            </div>
                            <div className={styles.sectionItem}>
                            <p className={styles.label}>
                                    Symbol
                                </p>
                                <p className={styles.description}>
                                    {symbol ? symbol: "..."}
                                </p>
                            </div>

                          

                            <div className={styles.sectionItem}>
                                <p className={styles.label}>
                                    Token address
                                </p>
                                <p className={styles.tokenAddress}>
                                    {token_address && token_address.slice(0, 15)}...
                                </p>
                            </div>


                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionHeader}>
                            Attributes
                        </h3>

                        {attributes && attributes.map((attribute, index) => (
                            <>
                            {
                              index < 6 &&  <div key={index} className={styles.sectionContent}>
                                <div className={styles.sectionItem}>
                                    <p className={styles.label}>
                                       {attribute.trait_type}
                                    </p>
                                    <p className={styles.description}>
                                        {attribute.value.length > 10 ? `${attribute.value.slice(0,15)}...`: attribute.value}
                                    </p>
                                </div>
                            </div>
                            }
                            </>
                           
                        ))}



                    </div>

                    <div className={styles.sectionFooter}>
                        <button onClick={()=> {
                            let link = `https://opensea.io/assets/${chain.toLowerCase()}/${token_address}/${token_id}`
                            window.open(link, '_blank');
                        }}>
                            PURCHASE ITEM
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default NFTDetails
