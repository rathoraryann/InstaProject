import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react'
import { timeAgo } from '../../utils/timeAgo'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import { Link } from 'react-router-dom'

const Comments = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy)
  if (isLoading) {
    return <CommentSkeleton />
  }

  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={'sm'} />
      </Link>
      <Flex direction={'column'}>
        <Flex gap={2} alignItems={'center'}>
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={'bold'} fontSize={12}>{userProfile.username}</Text>
          </Link>
          <Text fontSize={12}>{comment.comment}</Text>
        </Flex>
        <Text fontSize={12} color={'gray'}>{timeAgo(comment.createdAt)}</Text>
      </Flex>
    </Flex>
  )
}

export default Comments

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={'full'} alignItems={'center'}>
      <SkeletonCircle h={10} w='10'>
        <Flex gap={1} flexDir={'column'}>
          <Skeleton h={2} w={'100'} />
          <Skeleton h={2} w={'50'} />
        </Flex>
      </SkeletonCircle>
    </Flex>
  )
}
