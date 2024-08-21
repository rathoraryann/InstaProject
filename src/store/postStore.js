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

  const deletePost = (id) =>{
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }

  const addComment = (postId, comment) =>{
    posts.map(post=>{
      if(post.id === postId){
        console.log([...post.comments, comment])
        return {
          ...post,
          comments: [...post.comments, comment]
        }
      }
      return post
    })
  }

  return {
    posts,
    createPost,
    setPosts,
    deletePost,
    addComment
  };
};


// const addComment = (postId, comment) => {
//   setPosts((prevPosts) =>
//     prevPosts.map((post) => {
//       if (post.id === postId) {
//         return {
//           ...post,
//           comments: [...post.comments, comment],
//         };
//       }
//       return post;
//     })
//   );
// };

