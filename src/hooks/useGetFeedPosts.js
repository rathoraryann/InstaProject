import React, { useEffect, useState } from 'react'
import {usePostStore} from '../store/postStore'
import {useAuthStore} from '../store/authStore'
import useShowToast from '../hooks/useShowToast'
import { useUserProfile } from '../store/userProfileStore'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import {firestore} from '../firebase/firebase'

const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {posts, setPosts} = usePostStore();
  const {user} = useAuthStore();
  const showToast = useShowToast();
  const {setUserProfile} = useUserProfile()

  useEffect(()=>{
    const getFeedPosts = async () =>{
        setIsLoading(true)
        if (user.following.length == 0) {
            setIsLoading(false)
            setPosts([])
            return
        }
        const q = query(collection(firestore, 'posts'), where("createdBy", "in", user.following))
        try {
          const querySnapshot = await getDocs(q)
          const feedPosts= [];

           querySnapshot.forEach((doc)=>{
            feedPosts.push({id: doc.id, ...doc.data()})
           }) 
           feedPosts.sort((a, b) => b.createdAt - a.createdAt)
           setPosts(feedPosts)
        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setIsLoading(false)
        }
    }
    if (user) getFeedPosts();
  }, [user, showToast, setPosts, setUserProfile])

  return { isLoading, posts}
}

export default useGetFeedPosts
