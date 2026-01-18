import { createSlice } from "@reduxjs/toolkit"

const authSlices=createSlice(
{
    name:"auth",
    initialState:{
        loading:true,
        isAuthenticated:false,
        user:null,
        error:null
    },
    reducers:{
        LoginRequest(state,action){
            state.loading = true
        },
        LoginSuccess(state,action){
            state.loading = false,
            state.isAuthenticated = true,
            state.user = action.payload.user,
            state.error = null
        },
        LoginFail(state,action){
            state.loading = false,
            state.error = action.payload
        },
        clearError(state,action){
            state.error=null
        },
        registerRequest(state,action){
            state.loading = true;

        },
        registerSuccess(state,action){
            state.loading = false,
            state.isAuthenticated=true,
            state.user = action.payload.user,
            state.error = null

        },
        registerFail(state,action){
            state.loading = false,
            state.error = action.payload
        
        },
          loaduserRequest(state,action){
            state.loading = true;
            state.isAuthenticated=false,
            state.user = null,
            state.error = null
          
        },
        loaduserSuccess(state,action){
            state.loading = false,
            state.isAuthenticated=true,
            state.user = action.payload.user,
            state.error = null

        },
        loaduserFail(state,action){
            state.loading = false,
            state.error = null
        
        },
           logoutSuccess(state,action){
            state.loading = false,
            state.isAuthenticated=false,
            state.user = null,
            state.error = null

        },
        logoutFail(state,action){
            state.loading = false,
            state.error = action.payload
        
        },



            updateuserRequest(state,action){
            state.loading = true;          

        },
       updateuserSuccess(state,action){
            state.loading = false,
            state.isAuthenticated=true,
            state.user = action.payload.user,
            state.error = null

        },
      updateuserFail(state,action){
            state.loading = false,
            state.error = action.payload
        
        },


            //update apssword
            
            updatepasswordRequest(state,action){
                state.loading = true;
        },
      updatepasswordSuccess(state,action){
            state.loading = false;
            state.passwordupdated = true;
            state.error = null;
        },
      updatepasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },




        //forgot password
        forgotpasswordRequest(state,action){
                state.loading = true;
        },
   forgotpasswordSuccess(state,action){
            state.loading = false;
            state.fogotmail = action.payload.message;
            state.error = false;
        },
      forgotpasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        //reset

          //forgot password
      resetpasswordRequest(state,action){
                state.loading = true;
        },
     resetpasswordSuccess(state,action){
            state.loading = false;
            state.resetstatusget = action.payload.message;
            state.error = false;
        },
      resetpasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
     }
     
    }
)

const{actions,reducer}=authSlices
export const {LoginRequest,LoginSuccess,LoginFail,clearError,
    registerRequest,registerSuccess,registerFail,
    loaduserRequest,loaduserSuccess,loaduserFail,
    logoutSuccess,logoutFail,
    updateuserRequest,updateuserSuccess,updateuserFail,
    updatepasswordRequest,updatepasswordSuccess,updatepasswordFail,
    forgotpasswordRequest,forgotpasswordSuccess,forgotpasswordFail,
    resetpasswordRequest,resetpasswordSuccess,resetpasswordFail
}=actions
export default reducer;
