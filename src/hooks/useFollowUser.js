import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useUserProfile } from '../store/userProfileStore'
import { firestore } from '../firebase/firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    const { user, saveUser } = useAuthStore()
    const { userProfile, setUserProfile } = useUserProfile()

    const handleFollowers = async () => {
        setIsUpdating(true)
        try {
            const currentUserRef = doc(firestore, 'users', user.uid)
            const userToFollowOrUnfollow = doc(firestore, 'users', userId)

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })

            await updateDoc(userToFollowOrUnfollow, {
                followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })

            if (isFollowing) {
                saveUser({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                })
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid => uid !== user.uid)
                })
                localStorage.setItem('user-info', JSON.stringify({
                    ...user,
                    following: user.following.filter(uid => uid !== userId)
                }))
                setIsFollowing(false)
            } else {
                saveUser({
                    ...user,
                    following: [...user.following, userId]
                })
                if(userProfile)
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, user.uid]
                })
                localStorage.setItem('user-info', JSON.stringify({
                    ...user,
                    following: [...user.following.userId]
                }))
                setIsFollowing(true)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

    useEffect(() => {
        if (user) {
            const isFollowing = user.following.includes(userId)
            setIsFollowing(isFollowing)
        }
    }, [user, userId])
    return { isFollowing, isUpdating, handleFollowers }
}

export default useFollowUser
