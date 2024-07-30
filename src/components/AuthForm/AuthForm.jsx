import { Box, VStack, Image, Input, Flex, Button, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleAuth = () => {
    if (!inputs.email || !inputs.password) {
      alert("Please fill the login details")
      return;
    }
    navigate('/')

  }
  return (
    <>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} cursor={'pointer'} alt="Instagram" />
          <Input
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            placeholder="Email"
            fontSize={14}
            type="email"
          />
          <Input
            value={inputs.password}
            onChange={((e) => setInputs({ ...inputs, password: e.target.value }))}
            placeholder="Password"
            fontSize={14}
            type="password"
          />
          {!isLogin ?
            (<Input
              value={inputs.confirmPassword}
              onChange={((e) => setInputs({ ...inputs, confirmPassword: e.target.value }))}
              placeholder="Confirm Password"
              fontSize={14}
              type="password"
            />)
            : null}
          <Button w={'full'} colorScheme="blue" size={'sm'} fontSize={14} onClick={handleAuth}>{isLogin ? 'Log in' : 'Sign in'}</Button>

          {/* or */}
          <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
            <Text mx={1} color={'white'}>OR</Text>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
          </Flex>

          {/* google Login */}
          <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
            <Image src="/google.png" w={5} alt="Google Logo" />
            <Text mx={2} fontSize={14} color={'blue.500'}>Login with Google</Text>
          </Flex>

        </VStack>
      </Box>

      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'}>
            {isLogin ? "Sign up" : 'Login'}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default AuthForm
