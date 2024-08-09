import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
 
const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const showToast = useShowToast()
    const {user} = useAuthStore()

    useEffect(()=>{
        const getSuggestedUsers = async () => {
			setIsLoading(true);
			try {
				const usersRef = collection(firestore, "users");
				const q = query(
					usersRef,
					where("uid", "not-in", [user.uid, ...user.following]),
					orderBy("uid"),
					limit(3)
				);

				const querySnapshot = await getDocs(q);
				const users = [];

				querySnapshot.forEach((doc) => {
					users.push({ ...doc.data(), id: doc.id });
				});

				setSuggestedUsers(users);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
        }

        if (user)  getSuggestedUsers();

    },[user, showToast])

    return {isLoading, suggestedUsers}  
}

export default useGetSuggestedUsers
