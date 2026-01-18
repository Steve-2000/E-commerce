import axios from "axios";
import {
  LoginFail,
  LoginRequest,
  LoginSuccess,
  clearError,
  registerFail,
  registerRequest,
  registerSuccess,
  loaduserFail,
  loaduserRequest,
  loaduserSuccess,
  logoutSuccess,
  logoutFail,
  //updatuserdetails
  updateuserFail,
  updateuserRequest,
  updateuserSuccess,

  //paswordchange
  updatepasswordRequest,updatepasswordSuccess,updatepasswordFail,

  //forgot
  forgotpasswordRequest,forgotpasswordSuccess,forgotpasswordFail,

  //reset
    resetpasswordRequest,resetpasswordSuccess,resetpasswordFail
} from "../slices/AuthSlices";

export const getuser = (email, password) => async (dispatch) => {
  try {
    dispatch(LoginRequest());
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      { email, password },{withCredentials: true}
    );
    dispatch(LoginSuccess(data));
  } catch (err) {
    const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
    dispatch(LoginFail(errorMessage));
  }
};

export const clearLoginerror = () => async (dispatch) => {
  dispatch(clearError());
};

export const registeruser=(userdata)=>async(dispatch)=>{
        try{
                dispatch(registerRequest())
                const{data}=await axios.post("http://localhost:5000/api/v1/auth/register",userdata,{withCredentials: true})
                dispatch(registerSuccess(data))
                console.log(data)
                

        }
        catch(err){
          const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
          dispatch(registerFail(errorMessage))
        }

}

export const loaduser = () => async(dispatch)=>{

  try{
      dispatch(loaduserRequest())

      const{data}=await axios.get("http://localhost:5000/api/v1/auth/userprofile",{withCredentials: true})
      dispatch(loaduserSuccess(data))
      console.log(data)

  }
  catch(err){ 
    const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
    dispatch(loaduserFail(errorMessage))
  }



}

export const logoutuser=()=>async(dispatch)=>{
 
try{
   await axios.post("http://localhost:5000/api/v1/auth/logout", null, { withCredentials: true })
  dispatch(logoutSuccess())
}
catch(err){
  const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
  dispatch(logoutFail(errorMessage))
}

}


//upate profile
export const updateprofile=(formdata)=>async(dispatch)=>{

  try{
    dispatch(updateuserRequest())
    const{data}=await axios.put("http://localhost:5000/api/v1/auth/updateprofile",formdata,{withCredentials: true})
    dispatch(updateuserSuccess(data))
    console.log(data)
  }
  catch(err){
    const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
    dispatch(updateuserFail(errorMessage))
  }

}

export const passwordchange=(formdata)=>async(dispatch)=>{
  try{
    dispatch(updatepasswordRequest())
await axios.put("http://localhost:5000/api/v1/auth/passwordchange",formdata,{withCredentials: true})
    dispatch(updatepasswordSuccess())
    
  }




catch(err){
  const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
  dispatch(updatepasswordFail(errorMessage))
}
}

export const forgotpasswordmail=(email)=>async(dispatch)=>{
    try{
      dispatch(forgotpasswordRequest())
    const{data} = await axios.post("http://localhost:5000/api/v1/auth/forgotpassword",{ email })
      dispatch(forgotpasswordSuccess(data))



    }catch(err){
      const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
      dispatch(forgotpasswordFail(errorMessage))

    }


}

export const resetpassword = (data, token) => async (dispatch) => {
    try{
      dispatch(resetpasswordRequest())
    const { data: responseData } = await axios.put(`http://localhost:5000/api/v1/auth/password/reset/${token}`, data)
      dispatch(resetpasswordSuccess(responseData))



    }catch(err){
      const errorMessage = err.response && err.response.data ? err.response.data.message : err.message;
      dispatch(resetpasswordFail(errorMessage))

    }


}
