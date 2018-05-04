import _ from 'lodash'
import {FETCH_POSTS,  FETCH_POST, DELETE_POST} from '../actions'

export default function (state = {} , action){

    switch(action.type){
        case FETCH_POST : 
         
           return { ...state , [action.payload.data.id]: action.payload.data }
        
     
        case FETCH_POSTS : 
        // lodash function to convert [] of {} into {} and assign id as key to each {}
          return _.mapKeys(action.payload.data, 'id')       

        default : return state
        

        case DELETE_POST: 
           return _.omit(state , action.payload)
    }
}