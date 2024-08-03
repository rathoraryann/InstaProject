import { Flex, Text, Image } from '@chakra-ui/react'
import React from 'react'
import {useAuthStore} from '../../store/authStore'
import useShowToast from '../../hooks/useShowToast'
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import {auth, firestore} from '../../firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GoogleAuth = ({prefix}) => {

    const showToast = useShowToast()
    const {login} = useAuthStore()
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
    
    const handleGoogleAuth = async () =>{
        try {
            const newUser = await signInWithGoogle();
            if(!newUser && error){
                showToast('Error', error.message, 'error')
                return
            }

            const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				login(userDoc);
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
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
    return (
        <Flex
        onClick={handleGoogleAuth}
         alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
            <Image src="/google.png" w={5} alt="Google Logo" />
            <Text mx={2} fontSize={14} color={'blue.500'}>{prefix} with Google</Text>
        </Flex>

    )
}

export default GoogleAuth
