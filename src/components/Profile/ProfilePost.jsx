import { Avatar, Box, Button, Divider, Flex, Grid, Image, Modal, ModalBody, ModalCloseButton, ModalContent,  ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Comments from '../../components/Comments/Comments'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import PostFooter from '../../components/FeedPosts/PostFooter'
import {useUserProfile} from '../../store/userProfileStore'
import { useAuthStore } from '../../store/authStore'
import useShowToast from '../../hooks/useShowToast'
import { deleteObject, ref } from 'firebase/storage'
import {firestore, storage} from '../../firebase/firebase'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { usePostStore } from '../../store/postStore'

const ProfilePost = ({post }) => {
  console.log(post)
  const [isDeleting, setIsDeleting] = useState(false)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {userProfile} = useUserProfile()
  const {user} = useAuthStore()
  const showToast = useShowToast();
  const {deletePost} = usePostStore()
  const {deletePost: postCountInHeader} = useUserProfile()

  const handlDeletePost = async () =>{
    if(!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      // setIsDeleting(true)
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, 'users', user.uid);
      await deleteDoc(doc(firestore,'posts', post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id)
      })
      deletePost(post.id)
      postCountInHeader(post.id)
      showToast('Success','Post deleted successfully', 'success')
    } catch (error) {
      showToast("Error", error.message, 'error')
    } finally{
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Grid
        cursor={'pointer'}
        borderRadius={4}
        overflow={'hidden'}
        border={'1px solid'}
        borderColor={'whiteAlpha.300'}
        position={'relative'}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={'absolute'}
          top={0}
          bottom={0}
          right={0}
          left={0}
          bg={'blackAlpha.700'}
          transition={'all 0.3s ease'}
          zIndex={1}
          justifyContent={'center'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            gap={50}
          >

            <Flex><AiFillHeart size={20} />
              <Text fontWeight={'bold'} ml={2}>{post.likes.length}</Text></Flex>

            <Flex><FaComment size={20} />
              <Text fontWeight={'bold'} ml={2}>{post.comments.length}</Text></Flex>
          </Flex>
        </Flex>
        <Image src={post.image} alt='profile pic' w={'100%'} h={'100%'} objectFit={'cover'} />
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}
      isCentered={true}
      size={{base:'3xl', md:'5xl'}}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={'black'} pb={5}>
            <Flex gap={4} mx={'auto'} w={{base:'90%', sm:'70%', md:'full'}}
            maxH={'90vh'}
            minH={'50vh'}
            >
              <Flex borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} flex={1.5} justifyContent={'center'} alignItems={'center'}>
                <Image src={post.image} alt='upload image' />
              </Flex>
              <Flex flex={1} flexDirection={'column'} px={10} display={{base:'none', md:'flex'}}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={4}>
                  <Avatar src={userProfile.profilePicURL} size={'sm'} name='Rathor Aryan'/>
                  <Text fontWeight={'bold'} fontSize={12}>{userProfile.username}</Text>
                </Flex>
                { user.uid === userProfile.uid && (
                  <Button onClick={handlDeletePost} isLoading={isDeleting} size={'sm'} bg={'transparent'} borderRadius={4} p={1} _hover={{bg:'whiteAlpha.300', color:'red.600'}}>
                  <MdDelete size={20} cursor={'pointer'}/>
                </Button>
                )}
                </Flex>
                <Divider my={4} bg={'gray.500'}/>
                <VStack w={'full'} alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                  {post.comments.map((comment)=>(
                    <Comments key={comment.id} comment={comment} user={userProfile} />
                  ))}
                </VStack>
                <Divider my={4} bg={'gray.800'}/>
                <PostFooter isProfilePage={true} post={post}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfilePost
