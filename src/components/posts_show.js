import React , { Component } from 'react'
import { connect }  from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost ,deletePost}  from  '../actions'


 
class PostsShow extends Component {
    
    
    componentDidMount(){
        const {id} =  this.props.match.params;
        this.props.fetchPost(id);
        
    }
    onClickDelete(){
        const {id} = this.props.match.params
        this.props.deletePost(id , () => {
           this.props.history.push('/')
        })
    }
    render(){
        const {post} = this.props

        if(!post){
            return <div> Loading... </div>
            
        }
        return(
             <div className='animated fadeIn' >
             <div id='jumboShow' className='bg'></div>
             <div className='jumbotron'>
             </div>
              <h3 className='post-title animated slideInDown '>{post.title}</h3>
              <hr/>
              <h6 className='categories  '> Category : <span className='category-name'> {post.categories} </span></h6>
                <p> {post.content} </p>
              <Link to='/'><button className='btn btn-lg btn-primary'> <i className="fas fa-arrow-left"></i>&nbsp;Back</button></Link>
              <button 
                 onClick={this.onClickDelete.bind(this)}
                 className='btn btn-lg btn-danger pull-xs-right'><i className="fas fa-minus-circle"></i>&nbsp;Delete</button>
             </div>

        )
    }
}

function mapStateToProps({ posts } , ownProps){
  return { post : posts[ownProps.match.params.id]}
}


export default  connect(mapStateToProps , {fetchPost , deletePost})(PostsShow)