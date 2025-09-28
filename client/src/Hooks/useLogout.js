import  {useAuthContext} from "./useAuthContext";

export const useLogout = ()=>{
 const {dispatch} =useAuthContext();

const logout = ()=>{
     //Remove data localstorage

 localStorage.removeItem("user");

 //Update context 
dispatch({type: "LOGOUT"});
};
return {logout};
}
