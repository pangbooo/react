import memoize from 'memoize-one';
import React from 'react';

class Memoize extends React.Component {
    state = {
        filterText: ''
    }

    filter = memoize(
        (list, filterText) => list.filter(item => item.text.includes(filterText))
    );

    handleChange = event => {
        this.setState({ filterText: event.target.value });
    };

    render(){
            const filterList = this.filter(this.props.list, this.state.filterText);


            return(
                <>
                <input onChange={this.handleChange} value={this.state.filterText}/>
                <ul>
                    {
                        filterList.map(item => <li key={item.id}>{item.text}</li>)
                    }
                </ul>
                </>
            )
    }
}

export default Memoize