import _ from 'lodash'
import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../actions/index'

class PostsIndex extends Component{
   
    componentDidMount(){
        this.props.fetchPosts()
    }
 
   renderPosts(){
        return _.map(this.props.posts , post =>  {
            return (
                <li className='list-group-item' key={post.id} >
                  <Link to={`posts/${post.id}`} >  
                  <i className="fas fa-angle-double-right"></i>&nbsp; {post.title} &nbsp; <i className="fas fa-caret-right"></i> {post.categories}  
                  </Link>
                </li>
                
            )
        })
    }
    render(){

      return (

        <div className='animated fadeIn' >
           <div className='bg'></div> 
           <div className='jumbotron' >
           </div>
             <h3 className='titleIndex animated slideInDown'>RECENT BLOG POSTS</h3>
            <hr/>
           <ul className='list-group'>
               {this.renderPosts()}
           </ul>
           <div className='text-md-left'>
              <Link to='posts/new'>
                <button className='btn  btn-lg btn-primary'><i className="fas fa-plus-circle fa-lg "></i>&nbsp;New</button>
              </Link>
           </div>
        </div>
      )

    }
}

function mapStateToProps(state){
    return { posts : state.posts }
}
export default connect(mapStateToProps,  {fetchPosts})(PostsIndex)