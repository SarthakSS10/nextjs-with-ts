import { createSlice,isAnyOf } from '@reduxjs/toolkit'
import {userApi } from './userApi';


const matchNotificationsReceivedForAdding = isAnyOf(
    userApi.endpoints.addUser.matchFulfilled
  );
  const matchNotificationsReceived = isAnyOf(
    userApi.endpoints.fetchUser.matchFulfilled
  );
  const matchNotificationsReceivedForDelete = isAnyOf(
    userApi.endpoints.deleteUser.matchFulfilled
  );
  const matchNotificationsReceivedForEdit = isAnyOf(
    userApi.endpoints.editUser.matchFulfilled
  );
const userSlice = createSlice({
    name:'user',
    initialState:{users:[]},
    reducers:{
        loadUser:(state,action)=>{
            console.log("loaduser in slice callled");
            state.users = [...action.payload]
        },
        deletedUser:(state,action) =>{
            state.users = state.users.filter((val)=>
                            // val.uid !== action.payload
                            val.uid !== action.meta.arg.originalArgs
                        )
        },
        addedUser:(state,action) =>{
            console.log('add user');
            state.users = [...state.users,action.payload]
        } ,
        editTheUser:(state,action) =>{
            console.log('edit user');
            state.users = state.users.map((val)=>
            val.uid === action.payload.uid ? action.payload:val
           )
        }


    },
    extraReducers(builder) {
        builder.addMatcher(matchNotificationsReceived, (state, action) => {
          console.log(action);
          userSlice.caseReducers.loadUser(state,action)
        });
        builder.addMatcher(matchNotificationsReceivedForAdding, (state, action) => {
            console.log(action);
            userSlice.caseReducers.addedUser(state,action)
          });
          builder.addMatcher(matchNotificationsReceivedForDelete, (state, action) => {
            console.log(action);
            userSlice.caseReducers.deletedUser(state,action)
          });
          builder.addMatcher(matchNotificationsReceivedForEdit, (state, action) => {
            console.log(action);
            userSlice.caseReducers.editTheUser(state,action)
          });
      },
    // extraReducers:{
    //     // [fetchUser.fulfilled]:(state,action)=>{
    //     //     console.log(action);
    //     //     userSlice.caseReducers.loadUser(state,action)
    //     // },

    //     // [deleteUser.fulfilled]:(state,action)=>{
    //     //     console.log("action delete");
    //     //     userSlice.caseReducers.deletedUser(state,action)
    //     // },
    //     // [addUser.fulfilled]:(state,action)=>{
    //     //     console.log("action delete");
    //     //     userSlice.caseReducers.addedUser(state,action)
    //     // },
    //     // [editUser.fulfilled]:(state,action)=>{
    //     //     console.log("action edit");
    //     //     userSlice.caseReducers.editTheUser(state,action)
    //     // }
    // }
    

})
console.log(userSlice);
export const {loadUser,deletedUser,addedUser,editTheUser}  = userSlice.actions;
export default  userSlice.reducer;

// export const fetchUserReducer = (state ={users:[]},action)=>{
//     switch (action.type) {
//         case FETCH_USER:
//             return {...state,users:action.payload}

//         case DELETE_USER:
//             return {users:state.users.filter((val)=>
//                 val.uid !== action.payload
//             )}

//         case EDIT_USER:
//             return {users:state.users.map((val)=>
//                     val.uid === action.payload.uid ? action.payload:val
//                 )}

//         case ADD_USER:
//             return {users:[...state.users,action.payload]}
             
            
//         default:
//             return state
//     }

// }