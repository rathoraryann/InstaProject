import { Flex, Avatar, VStack, Box, Button } from "@chakra-ui/react"
import useFollowUser from '../../hooks/useFollowUser'
import { useAuthStore } from "../../store/authStore"

const SuggestedUser = ({ User, setUser}) => {
  const {isFollowing, isUpdating, handleFollowers} = useFollowUser(User.uid)
  const {user} = useAuthStore()

  const onFollowUser = async ()=>{
    await handleFollowers();
    setUser({
      ...User,
      followers: isFollowing ? User.followers.filter((follower)=> follower.uid !== user.uid): ([...user.followers, user.uid])
    })
  }

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar src={User.profilePicURL} name={User.fullName} size={'md'} />
        <VStack spacing={2} alignItems={'flex-start'}>
          <Box fontSize={12} fontWeight={'bold'}>{User.fullName}</Box>
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
