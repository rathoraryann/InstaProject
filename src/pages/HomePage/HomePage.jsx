import { Container, Flex, Box, Text } from "@chakra-ui/react"
import FeedPosts from "../../components/FeedPosts/FeedPosts"
import SuggestedUsers from '../../components/SuggestedUsers/SuggestedUsers'

function HomePage() {
  return (
    <Container maxW={'container.lg'}>
      <Flex gap={20}>
        <Box flex={2} py={10} display={{base:'none', lg: 'block'}}>     
          <FeedPosts/>
        </Box>
        <Box flex={3} mr={20} display={{base:'none', lg:'block'}} >
          <SuggestedUsers/>
          </Box>
      </Flex>
    </Container>
  )
}

export default HomePage
