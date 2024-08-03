import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth, firestore} from '../firebase/firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import useShowToast from './useShowToast'
import {useAuthStore} from '../store/authStore'

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth)
    const showToast = useShowToast()
    const {login} = useAuthStore()

    const signup = async (inputs) =>{
        if (!inputs.email || !inputs.username || !inputs.fullName || !inputs.password) {
            showToast('Error', "Please fill all the fields", "error")
            return
        }

        const userRef = collection(firestore, "users")
        const q = query(userRef, where('username', '==', inputs.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showToast('Error', "username already exists", 'error')
            return
        }

        try {
            const newUser= await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser && error) {
                showToast('Error', error.message, "error")
                return;
            }
            if(newUser){
                const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.username,
					fullName: inputs.fullName,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
                login(userDoc)
            }
        } catch (error) {
            showToast('Error', error.message, "error")
        }
    }
  
  return {loading, error, signup}
}

export default useSignUpWithEmailAndPassword
