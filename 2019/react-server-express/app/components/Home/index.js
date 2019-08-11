import React from 'react';
import styles from './styles.css';
import {a} from '../../xxx.js';

class Home extends React.Component {
    render() {
        console.log('a1',a);
        a.name = 'aa'
        console.log('a2',a);
        return (
            <div className={styles.header} onClick={()=> window.alert(123)}>Home{a.name}</div>
        );
    }
}

export default Home;