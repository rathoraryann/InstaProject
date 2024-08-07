import { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import { useUserProfile } from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {firestore} from '../firebase/firebase'

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast()
    const { userProfile, setUserProfile } = useUserProfile()

    useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			try {
				const q = query(collection(firestore, "users"), where("username", "==", username));
				const querySnapshot = await getDocs(q);

				if (querySnapshot.empty) return setUserProfile(null);

				let userDoc;
				querySnapshot.forEach((doc) => {
					userDoc = doc.data();
				});

				setUserProfile(userDoc);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

        getUserProfile()
    }, [username, showToast])
    return { userProfile, isLoading}
}

export default useGetUserProfileByUsername

// Error or rendering usernot found  comp
