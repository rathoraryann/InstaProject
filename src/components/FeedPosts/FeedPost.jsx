import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { Box, Image } from '@chakra-ui/react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'



const FeedPost = ({post}) => {
  const {userProfile} = useGetUserProfileById(post.createdBy)
  // console.log(userProfile)
  // console.log(post)
  return (
    <Box marginBottom={5}>
      <PostHeader post={post} creatorProfile={userProfile}/>
      <Box
        my={2}
        borderRadius={4}
        overflow={'hidden'}
      >
        <Image src={post.image} alt={"feed post"} />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile}/>
    </Box>
  )
}

export default FeedPost