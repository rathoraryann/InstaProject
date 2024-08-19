import { Flex, Text, InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react"
import { useState } from "react"
import { Box } from "@chakra-ui/react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants"
import usePostComment from '../../hooks/usePostComment'
import { useAuthStore } from "../../store/authStore"

const PostFooter = ({post, username, isProfilePage }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(99)
  const [comment, setComment] = useState('')
  const {isCommenting, handlePostComment} = usePostComment()
  const {user} = useAuthStore()

  const handleSubmit = () => {
    if (liked) {
      setLiked(false)
      setLikes(likes - 1)
    } else {
      setLiked(true)
      setLikes(likes + 1)
    }
  }

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment)
    setComment('')
  }
  return (
    <Box mb={10} marginTop={'auto'}>
      <Flex alignItems={'center'} gap={4} pt={0} mb={2} mt={4}>
        <Box
          onClick={handleSubmit}
          cursor={'pointer'}
          fontSize={18}
        >
          {!liked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
        </Box>

        <Box cursor={'pointer'} fontSize={18}><CommentLogo /></Box>
      </Flex>
      <Text fontWeight={600} fontSize={'sm'}>
        {likes} likes
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize={'sm'} fontWeight={700} >
            {username}{" "}
            <Text as={'span'} fontWeight={400}>Feeling Good</Text>
          </Text>
          <Text fontSize={'sm'} color={'gray'}>
            View all 999 comments
          </Text>
        </>
      )}

      {user && (
        <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
        <InputGroup>
          <Input
            variant={"flushed"}
            placeholder={"Add a comment..."}
            fontSize={14}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
              isLoading={isCommenting}
              onClick={handleSubmitComment}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      )}
    </Box>
  )
}

export default PostFooter
