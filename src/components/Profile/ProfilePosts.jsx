import { Box, Flex, Grid, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import ProfilePost from './ProfilePost'
import useGetUserPosts from '../../hooks/useGetUserPosts'

const ProfilePosts = () => {
  const {isLoading, posts} =useGetUserPosts()

  const noPostFound = !isLoading && posts.length === 0;

  if (noPostFound) return <NoPostFound />
  

  return (
    <Grid
    templateColumns={{
      sm:'repeat(1, 1fr)',
      md:'repeat(3, 1fr)',
    }}
    gap={1}
    columnGap={1}
    >
      {isLoading && [0,1,2].map((_,index)=>(
        <VStack key={index} gap={4} alignItems={'flex-start'}>
          <Skeleton w={'full'}
          >
            <Box h={'300px'}>contents wrapped</Box>
          </Skeleton>
        </VStack>
      ))}

      {!isLoading && (
        <>
        {(posts.map((post)=>(
          <ProfilePost key={post.id} post={post} />
        )))}
        </>
      )}

    </Grid>
  )
}

export default ProfilePosts

const NoPostFound = () =>{
  return(
    <Flex flexDir={'column'} textAlign={'center'} mx={'auto'} mt={'10'}>
      <Text fontSize={'2xl'}> No Posts Found</Text>
    </Flex>
  )
}