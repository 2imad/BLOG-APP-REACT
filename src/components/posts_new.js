import _ from 'lodash'
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

const FIELDS = {
 
  title : {
    type : 'input',
    label : 'Titel'
   },
  categories : {
    type : 'input',
    label:'Category'
  },
  content : {
    type : 'textarea',
    label: 'content'
  }
}


class PostsNew extends Component {
  
  renderField(fieldConfig,field) {
    const fieldHelper = this.props.fields[field]
    // const { meta: { touched, error } } = field;
    // const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div  key={fieldConfig.label} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`} >
        <label>{fieldConfig.label}</label>
          <fieldConfig.type type='text' className='form-control'   {...fieldHelper}/>
          <div className='text-help'>
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
       </div> 
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
    <div className='animated fadeIn' >
        <div id='jumbo-add-new' className='bg'></div>
        <div className='jumbotron'>
     </div>
        <h3 className='post-title'>New Post</h3>
       <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
           {_.map(FIELDS , this.renderField.bind(this))}        
       <button type="submit" className="btn btn-lg btn-primary"><i className="fas fa-plus"></i>&nbsp;Submit</button>
         <Link to="/"> <button className="btn btn-lg btn-danger" ><i className="fas fa-minus-circle"></i>&nbsp;Cancel</button></Link>
      </form>
      </div>                
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type , field ) =>{
    if(!values[field]){
      errors[field] = `Please enter  ${field}`
    }
   
  })
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  form: "PostsNewForm",
  fields: _.keys(FIELDS),
  validate
})(connect(null, { createPost })(PostsNew));