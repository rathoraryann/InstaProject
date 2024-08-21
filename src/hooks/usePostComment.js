import React, { useState } from 'react'
import useShowToast from './useShowToast'
import { useAuthStore } from '../store/authStore'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import {firestore} from '../firebase/firebase'
import { usePostStore } from '../store/postStore'

const usePostComment = () => {
  const [isCommenting, setIsCommneting] = useState(false)
  const showToast = useShowToast()
  const {user} = useAuthStore()
  const {addComment} = usePostStore()

  const handlePostComment = async (postId, comment) =>{
    if(isCommenting) return
    if(!user) return showToast("Error", "You must be logged in to comment", 'error')
    setIsCommneting(true)

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: user.uid,
      postId
    }

    try {
      await updateDoc(doc(firestore,"posts",postId), {
        comments: arrayUnion(newComment)
      })
      console.log('before comment')
      addComment(postId, comment)
      console.log('after comment')
    } catch (error) {
      showToast("Error", error.message, "error")
    } finally{
      setIsCommneting(false)
    }
  }
  return {isCommenting, handlePostComment}
}

export default usePostComment