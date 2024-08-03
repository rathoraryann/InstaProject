import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "../store/authStore";


const useLoginWithEmailAndPassword = () =>{

    const showToast = useShowToast()
    const {login} = useAuthStore()

    const [signInWithEmailAndPassword,user ,loading, error] = useSignInWithEmailAndPassword(auth)


    const Login = async (inputs)=>{
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill the required details", "error")
        }
        try {
          const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

          if (userCred) {
            const docRef = doc(firestore, "users", userCred.user.uid)
            const docSnap = await getDoc(docRef)
            localStorage.setItem("user-info", JSON.stringify(docSnap.data()))
            login(docSnap.data())
          }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
      }
      return {loading, error, Login}
}

export default useLoginWithEmailAndPassword;
