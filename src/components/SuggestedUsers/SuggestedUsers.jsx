import { VStack, Flex, Text, Box } from '@chakra-ui/react'
import SuggestedUser from './SuggestedUser'
import SuggestedHeader from './SuggestedHeader'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'

const SuggestedUsers = () => {
  console.log('before suggested user hook')
  const {suggestedUsers, isLoading} = useGetSuggestedUsers();
  console.log('after suggested user hook')
  
  if (isLoading) return null;
  
  return (
    <VStack py={8} gap={4}>
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested for you
					</Text>
					<Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
						See All
					</Text>
				</Flex>
			)}

      
      {suggestedUsers.map((user)=>(
        <SuggestedUser key={user.id} User={user} />
      ))}
      


      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={'start'}>2024 Built by aryan</Box>
    </VStack>
  )
}

export default SuggestedUsers;