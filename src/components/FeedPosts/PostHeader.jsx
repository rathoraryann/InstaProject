import { Flex, Box, Avatar, Text, SkeletonCircle, Skeleton, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useFollowUser from '../../hooks/useFollowUser'
import {timeAgo} from '../../utils/timeAgo'

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowers, isUpdating, isFollowing } = useFollowUser(post.createdBy)
  // console.log(creatorProfile)
  // console.log(creatorProfile.username)
  // console.log(creatorProfile.profilePicURL)
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} my={2}>
      <Flex alignItems={'center'} gap={2}>
        {creatorProfile ? (<Link to={`/${creatorProfile.username}`}>
          <Avatar src={creatorProfile.profilePicURL} alt={creatorProfile.username} size={'sm'} />
        </Link>) : (
          <SkeletonCircle size={'10'} />
        )}
        {creatorProfile ? (<Flex fontSize={12} fontWeight={'bold'} gap={'2'}>
          <Link to={`/${creatorProfile.username}`}> {creatorProfile.username}</Link>
          <Box color={'gray.500'}>{timeAgo(post.createdAt)}</Box>
        </Flex>) : (<Skeleton w={'100px'} h={'10px'} />)}

      </Flex>

      <Box cursor={'pointer'}>
        <Button
        size={'xs'}
        bgColor={'transparent'}
        onClick={handleFollowers}
        isLoading={isUpdating}
          fontSize={12}
          fontWeight={'bold'}
          color={'blue.500'}
          _hover={{
            color: 'white'
          }}
          transition={'0.2s ease-in-out'}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
    // <Box>hello</Box>
  )
}

export default PostHeader
