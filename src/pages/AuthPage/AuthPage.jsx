// import React from 'react'

import { Flex, Container, Box, Image, VStack } from "@chakra-ui/react"
import AuthForm from "../../components/AuthForm/AuthForm"

function AuthPage() {
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
      <Container maxW={'container.md'} padding={0}>
        <Flex justifyContent={'center'} alignItems={'center'} gap={10}>

          {/* left */}
          <Box display={{ base: 'none', md: 'block' }}>
            <Image src="/auth.png" h={650} alt="Phone png" />
          </Box>

          {/* right */}
          <VStack spacing={4} align={'stretch'}>
            <AuthForm />
            <Box textAlign={'center'}>Get the app.</Box>
            <Flex gap={5} justifyContent={'center'}>
              <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
              <Image src="/playstore.png" h={'10'} alt="playstore"/>              
              </a>
              <a href="https://apps.microsoft.com/detail/9nblggh5l9xt?hl=en-in&gl=IN">
              <Image src="microsoft.png" h={'10'} alt="microsoft"/>              
              </a>
            </Flex>
          </VStack>
          
        </Flex>
      </Container>
    </Flex>
  )
}

export default AuthPage