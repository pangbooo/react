import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Comment extends Component{
    static propTypes = {
        comment : PropTypes.object.isRequired,
        onDeleteComment:PropTypes.func,
        index:PropTypes.number
    };
    constructor () {
        super();
        this.state = { timeString: '' }
    }
    componentWillMount(){
        this._updateTimeString();
        this._timer = setInterval(()=>{
            console.log(this);
            this._updateTimeString()
        },
            //this._updateTimeString.bind(this); //bind(this)?
            5000
        )
    }
    _updateTimeString(){
        const comment = this.props.comment;
        const duration = (+Date.now() - comment.createTime) /1000;
        this.setState({
            timeString:duration > 60
                    ? `${Math.round(duration / 60)}分钟前`
                    : `${Math.round(Math.max(duration, 1))}秒前`
        })
    }
    handleDeleteComment(){
        if(){

        }
    }
    render(){
        return(
            <div className="comment">
                <div className="comment-user">
                    <span>{this.props.comment.username}</span>
                </div>
                <p>{this.props.comment.content}</p>
                <span className="comment-createdtime">{this.state.timeString}</span>
                <span className="comment-delete" onClick={this.handleDeleteComment.bind(this)}>删除</span>
            </div>
        )
    }
}
export default Comment