import { Flex, Avatar, VStack, Box, Button } from "@chakra-ui/react"
import useFollowUser from '../../hooks/useFollowUser'
import { useAuthStore } from "../../store/authStore"
import { Link } from "react-router-dom"

const SuggestedUser = ({ User, setUser}) => {
  const {isFollowing, isUpdating, handleFollowers} = useFollowUser(User.uid)
  const {user} = useAuthStore()

  const onFollowUser = async ()=>{
    await handleFollowers();
    setUser({
      ...User,
      followers: isFollowing ? User.followers.filter((follower)=> follower.uid !== user.uid) :
      [...User.followers, user]
    })
  }

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${user.username}`}>
        <Avatar src={User.profilePicURL} name={User.fullName} size={'md'} />
        </Link>
        <VStack spacing={2} alignItems={'flex-start'}>
        <Link to={`/${user.username}`}>
          <Box fontSize={12} fontWeight={'bold'}>{User.fullName}</Box>
          </Link>
          <Box fontSize={13} color={'gray.500'}>{User.followers.length} followers</Box>
        </VStack>
      </Flex>
      {user.uid !== User.uid && (
        <Button
        fontSize={13}
        bg={"transparent"}
        p={0}
        h={'max-content'}
        fontWeight={'medium '}
        color={'blue.400'}
        cursor={'pointer'}
        _hover={{ color: 'white' }}
        onClick={onFollowUser}
        isLoading={isUpdating}
        >{isFollowing? "unfollow" : "follow"}
        </Button>)
      }
    </Flex>
  )
}

export default SuggestedUser
