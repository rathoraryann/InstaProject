import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfileTabs from '../../components/Profile/ProfileTabs'
import ProfilePosts from '../../components/Profile/ProfilePosts'
import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername'
import { useParams } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

const ProfilePage = () => {
  const { username } = useParams()
  const {isloading, userProfile} = useGetUserProfileByUsername(username)

  const userNotFound = !isloading && !userProfile
  if (userNotFound) {
     return <UserNotFound />
  }

  return (
    <Container maxW={'container.lg'} py={5}>
      <Flex
      py={10}
      px={4}
      pl={{base:4, md:10}}
      w={'full'}
      mx={'auto'}
      flexDirection={'column'}
      >
        {!isloading && userProfile &&<ProfileHeader /> }
        {isloading &&<ProfileHeaderSkeleton /> }
        
      </Flex>
      <Flex
      px={{base:2, sm:4}}
      maxW={'full'}
      mx={'auto'}
      direction={'column'}
      borderColor={'whiteAlpha.300'}
      borderTop={'1px solid'}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  )
}

export default ProfilePage


const UserNotFound = () =>{
  return(
    <Flex flexDir={'column'} textAlign={'center'} mx={'auto'} justifyContent={'center'} alignItems={'center'}>
      <Text fontSize={'2xl'}>User Not Found</Text>
      <Link as={RouterLink} to={'/'} mx={'auto'} w={'max-content'} color={'blue.500'}>Go to Home</Link>
    </Flex>
  )
}

const ProfileHeaderSkeleton = () =>{
  return(
    <Flex justifyContent={'center'} py={10} direction={{base:'column', sm: 'row'}}  alignItems={'center'} gap={{base: 4,sm : 10}}>
      <SkeletonCircle size={24}/>
      <VStack alignItems={{base:'center', sm:'flex-start'}} gap={2} mx={'auto'} flex={1}>
        <Skeleton height={'12px'} width={'150px'} />
        <Skeleton height={'12px'} width={'1o0px'} />
      </VStack>
    </Flex>
  )
}