import {Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react"
import { Link as RouterLink } from 'react-router-dom'
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants"
import { BiLogOut } from "react-icons/bi"
import useLogout from '../../hooks/useLogout'
import SidebarItems from './SidebarItems'
 
const Sidebar = () => {

  const { handleLogout, isLoggingOut } = useLogout()

  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={'column'} gap={10} w={'full'} height={'full'}>
        <Link to={'/'} as={RouterLink} pl={2} display={{ base: 'none', md: 'block' }} cursor='pointer'>
          <InstagramLogo />
        </Link>
        <Link to={'/'} as={RouterLink} p={2} display={{ base: 'block', md: 'none' }} cursor='pointer' borderRadius={6} w={10} _hover={{ bg: 'whiteAlpha.200' }}>
          <InstagramMobileLogo />
        </Link>

        <Flex direction={'column'} gap={5} cursor={'pointer'}>
          <SidebarItems />
        </Flex>

        {/* LOGOUT  */}

        <Tooltip
          hasArrow
          label={'Logout'}
          placement="right"
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            alignItems={'center'}
            gap={4}
            p={2}
            w={{ base: 10, md: 'full' }}
            justifyContent={{ base: 'center', md: 'flex-start' }}
            marginTop={'auto'}
          >
            <BiLogOut size={25} />
            <Button onClick={handleLogout} isLoading={isLoggingOut} variant={'ghost'} _hover={{ bg: 'transparent' }} display={{ base: 'none', md: 'block' }}>Logout</Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  )
}

export default Sidebar
