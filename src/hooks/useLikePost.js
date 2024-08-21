import { useState } from 'react'
import { useAuthStore } from '../store/authStore';
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import {firestore} from '../firebase/firebase'

const useLikePost = (post) => {
    // console.log(post.likes)
    const { user } = useAuthStore();
    const [isUpdating, setIsUpdating] = useState(false)
    const [isLiked, setIsLiked] = useState(post.likes.includes(user?.uid));
    const [likes, setLikes] = useState(post.likes.length);
    const showToast = useShowToast()

    const handleLikePost = async () =>{
        if (isUpdating) return;
        if (!user) return showToast("Error", "You mus logged in to like a post", 'error')
        setIsUpdating(true)

        try {
            const postRef = doc(firestore, "posts", post.id);
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })
            setIsLiked(!isLiked)
            setLikes(isLiked ? likes - 1 : likes + 1)
        } catch (error) {
            showToast("Error", error.message, 'error')
        }
        finally{
            setIsUpdating(false)
        }
    }
    return {isLiked, likes, handleLikePost}
  
}

export default useLikePost
