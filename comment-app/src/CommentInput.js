import React,{Component} from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component{
    //组件参数验证
    static propTypes = {
        onSubmit : PropTypes.func
    }

    constructor (){
        super();
        this.state = {
            username :'',
            content : '',
            createTime : +new Date()
        }
    }
    componentWillMount(){
        this._loadUsername()
    }
    componentDidMount () {
        this.textarea.focus()
    }
    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }
    handleContentChange(event){
        this.setState({
            content : event.target.value
        })
    }
    handleSubmit(){
        if(this.props.onSubmit){
            const {username,content,createTime} = this.state;
            //CommentInput 调用 props 中的回调函数并且将 state 传入该函数
            this.props.onSubmit({username,content,createTime})
        }
        this.setState({ content: '' })
    }
    handleUsernameBlur(event){
        this._saveUsername(event.target.value)
    }
    _loadUsername(){
        const username = localStorage.getItem('username');
        if(username){
            this.setState({
                username : username
            })
        }
    }
    _saveUsername(username){
        localStorage.setItem('username',username)
    }
    render(){
        return(
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username} onChange={this.handleUsernameChange.bind(this)} onBlur={this.handleUsernameBlur.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea value={this.state.content} ref={(textarea)=>this.textarea = textarea} onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}
export default CommentInput