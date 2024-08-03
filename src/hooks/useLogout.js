import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { useAuthStore } from "../store/authStore";

const useLogout = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const {logout} = useAuthStore()
    const showToast = useShowToast();

    const handleLogout = async()=>{
        try {
           await signOut();
           localStorage.removeItem('user-info') 
           logout();
        } catch (error) {
            showToast("Error", error.message, 'error')
        }
    }
    return { handleLogout, isLoggingOut};
}

export default useLogout
