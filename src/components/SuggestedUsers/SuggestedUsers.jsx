import { VStack, Flex, Text, Box } from '@chakra-ui/react'
import SuggestedUser from './SuggestedUser'
import SuggestedHeader from './SuggestedHeader'

const SuggestedUsers = () => {
  return (
    <VStack py={8} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
        <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>Suggested for you</Text>
        <Text fontSize={12} fontWeight={'bold'} _hover={{color:'gray.400'}} cursor={'pointer'}>See all</Text>
      </Flex>
      <SuggestedUser name="Akash" followers={1084} avatar=""/>
      <SuggestedUser name="Akash" followers={1084} avatar=""/>
      <SuggestedUser name="Akash" followers={1084} avatar=""/>
      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={'start'}>2024 Built by aryan</Box>
    </VStack>
  )
}

export default SuggestedUsers
