import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div>
        <h1 className={styles.root}>
            <span>:(</span>
            <br />
            Ничего не найдено
        </h1>
    </div>
  )
}

export default NotFoundBlock;
