import { Flex, Avatar, Text, Button, Alert, AlertIcon } from "@chakra-ui/react"
import useLogout from "../../hooks/useLogout"
import { useAuthStore } from "../../store/authStore"
import { Link } from "react-router-dom"

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut, error } = useLogout()
  const { user } = useAuthStore()
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        {user ? (
          <>
            <Link to={`${user.username}`}>
              <Avatar name="Rathor Aryan" size={'sm'} src="/profilepic.jpeg" />
            </Link>
            <Link to={`${user.username}`}>
              <Text fontSize={'12'} fontWeight={'bold'} color={"white"} >Rathor Aryan</Text>
            </Link>
          </>
        ) : (
          <>
            <Avatar name="Guest" size={'sm'} src="/profilepic.jpeg" />
            <Text fontSize={'12'} fontWeight={'bold'} color={"white"} >Guest</Text>
          </>
        )}

      </Flex>

      {error && <Alert
        status='error' fontSize={13} borderRadius={4}>
        <AlertIcon
          fontSize={12} />{error.message}
      </Alert>}


      <Button
        onClick={handleLogout}
        isLoading={isLoggingOut}
        size={'xs'}
        background={'transparent'}
        _hover={{ backgroundColor: 'transparent' }}
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.400'}
        style={{ textDecoration: "none" }}
        cursor={'pointer'}
      >Log out</Button>

    </Flex>
  )
}
export default SuggestedHeader
