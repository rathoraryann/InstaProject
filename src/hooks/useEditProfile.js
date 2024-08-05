import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import useShowToast from './useShowToast'
import {storage, firestore} from '../firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useUserProfile } from '../store/userProfileStore'

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false)

    const { user, saveUser } = useAuthStore()
    const {setUserProfile} = useUserProfile()
    const showToast = useShowToast()

    const editProfile = async(inputs, selectedFile) => {
        if (isUpdating || !user) return
        setIsUpdating(true)
        
        const storageRef = ref(storage, `profilePics/${user.uid}`)
        const userDocRef = doc(firestore, "users", user.uid)


        let URL = ''
        try {
            if (selectedFile) {
               await uploadString(storageRef, selectedFile, "data_url")   
               URL = await getDownloadURL(ref(storage, `profilePics/${user.uid}`))
            }
            const updateUser = {
                ...user,
                fullName: inputs.fullName || user.fullName,
                username: inputs.username || user.username,
                bio: inputs.bio || user.bio,
                profilePicURL: URL || user.profilePicURL,
            }

            await updateDoc(userDocRef, updateUser)
            localStorage.setItem('user-info', JSON.stringify(updateUser))
            saveUser(updateUser)
            setUserProfile(updateUser)
            showToast("Success", "Profile Updated Succesfully", "success")

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return {editProfile, isUpdating}
}

export default useEditProfile
