import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.css';

function Modal({ children, closeModal }) {

    const modalRef = useRef()

    useEffect(() => {
        let modal = document.querySelector(`.${styles.container}`);
        console.log(modal)

        modal.onclick = (e) => {
            console.log(e)
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal();
            }
        }
    })
    return (
        <div className={styles.container}>
            <div ref={modalRef} className={styles.content}>
                {children}
            </div>
        </div>
    )
}

export default Modal