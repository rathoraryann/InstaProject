import { Flex , Box, Spinner} from "@chakra-ui/react"
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from '../../components/Navbar/Navbar'


const PageLayout = ({children}) => {
  const { pathname } = useLocation();

  const [user, loading, error] = useAuthState(auth)

  const canRenderSidebar = pathname !== '/auth' && user;
  const canRenderNavBar = !user && !loading && pathname !=='/auth'

  const checkingIsUserAuth = !user && loading

  if(checkingIsUserAuth)
    return <PageLayoutSpinner />
  
  return (
    <Flex flexDir={canRenderNavBar ? "column" : 'row'}>

        {/* Sidebar left */}
        {canRenderSidebar ? (
        <Box w={{base: '70px', md:'240px'}}>
        <Sidebar />
        </Box>
        ): null}

        {/* Navbar */}
        {canRenderNavBar && (<Navbar />)}

        {/* MainContent right */}
        <Box flex={1} mx={'auto'} w={{base: 'calc(100% -70px)', md: 'calc(100%- 240px)'}}>
        {children}
        </Box>
    </Flex>
  )
}

export default PageLayout

const PageLayoutSpinner = () =>{
  <Flex flexDir={'column'} h={'100vh'} w={
    '100vw'
  } alignItems={'center'} justifyContent={'center'}>
    <Spinner size={'xl'}/>
  </Flex>
}