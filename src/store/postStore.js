// import { atom } from "recoil"

// const {create} from 'zustand'
// const userPostStore = create((set)=>({
//     posts: [],
//     createPost : (post)=> set(state =>({posts:[post, ...state.posts]}))
// }))


import { atom, selector, useSetRecoilState, useRecoilValue } from 'recoil';

// Define an atom to hold the posts array
const postsState = atom({
  key: 'postsState', 
  default: [], 
});

// Define a custom hook to use the posts state and functions
export const usePostStore = () => {
  const setPosts = useSetRecoilState(postsState);
  const posts = useRecoilValue(postsState);

//   createPost 
  const createPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };


  return {
    posts,
    createPost,
  };
};
