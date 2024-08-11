import React from 'react'

const useCreatePost = () => {
  useEffect (()=>{
    const createPost = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {})
    }
  },[])
}

export default useCreatePost
