import React,{Component} from 'react'
import Comment from './Comment'

class CommentList extends Component{
    static defaultProps = {
        comments : []
    };
    render(){
        return(
            <div>
                {this.props.comments.map((comment,i)=>{
                  return  <Comment key={i} comment={comment}/>
                })}
            </div>
        )
    }
}
export  default CommentList