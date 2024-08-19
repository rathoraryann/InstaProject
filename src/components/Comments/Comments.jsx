import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {timeAgo} from '../../utils/timeAgo'

const Comments = ({comment}) => {
  return (
    <Flex gap={4}>
      {/* <Avatar src={profilePic} name={username} size={'sm'}/> */}
      <Flex direction={'column'}>
        <Flex  gap={2}>
          {/* <Text fontWeight={'bold'} fontSize={12}>{username}</Text> */}
          <Text fontSize={12}>{comment.comment}</Text>
        </Flex>
          <Text fontSize={12} color={'gray'}>{timeAgo(comment.createdAt)}</Text>
      </Flex>
    </Flex>
  )
}

export default Comments
