import React from 'react';
import styles from './styles.css';

class Button extends React.Component {
    render() {
        return (
            <div>
                {this.props.children} <br/>
                <button className={this.props.size}>
                    click
                </button>
            </div>
        );
    }
}

export default Button;