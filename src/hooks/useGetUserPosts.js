import {useState, useEffect} from 'react'
import { usePostStore } from '../store/postStore'
import {useUserProfile} from '../store/userProfileStore'
import useShowToast from './useShowToast'
import {query, collection, where, getDocs} from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {posts, setPosts} = usePostStore()
    const showToast = useShowToast()
    const {userProfile} = useUserProfile()
    // const [error, setError] = useState()

    useEffect(()=>{
        const getPosts = async () =>{
            if(!userProfile) return
            setIsLoading(true)
            setPosts([])
            try {
                const q = query(collection(firestore, 'posts'),where('createdBy','==',userProfile.uid))
                const querySnapshot = await getDocs(q)

                const posts = []
                querySnapshot.forEach(doc => {
                    posts.push({...doc.data(),id:doc.id})
                })

                posts.sort((a,b)=>b.createdAt - a.createdAt)
                setPosts(posts)
                // setError(posts)

            } catch (error) {
                showToast("Error", error.message, 'error')
                setPosts([])
            }finally{
                setIsLoading(false)
            }
        }
        getPosts()
    }, [setPosts,userProfile, showToast])

    // console.log(error)
    return{isLoading,posts}
}

export default useGetUserPosts
