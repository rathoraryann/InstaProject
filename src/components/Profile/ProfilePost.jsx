import { Avatar, Box, Divider, Flex, Grid, Image, Modal, ModalBody, ModalCloseButton, ModalContent,  ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import Comments from '../../components/Comments/Comments'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import PostFooter from '../../components/FeedPosts/PostFooter'

const ProfilePost = ({ img }) => {
  const {isOpen, onOpen, onClose} = useDisclosure()
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
              <Text fontWeight={'bold'} ml={2}>9</Text></Flex>

            <Flex><FaComment size={20} />
              <Text fontWeight={'bold'} ml={2}>9</Text></Flex>
          </Flex>
        </Flex>
        <Image src={img} alt='profile pic' w={'100%'} h={'100%'} objectFit={'cover'} />
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
            >
              <Box borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} flex={1.5}>
                <Image src={img} alt='profile pic' />
              </Box>
              <Flex flex={1} flexDirection={'column'} px={10} display={{base:'none', md:'flex'}}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Flex alignItems={'center'} gap={4}>
                  <Avatar src='/profilepic.jpeg' size={'sm'} name='Rathor Aryan'/>
                  <Text fontWeight={'bold'} fontSize={12}>Rathor Aryan</Text>
                </Flex>
                <Box borderRadius={4} p={1} _hover={{bg:'whiteAlpha.300', color:'red.600'}}>
                  <MdDelete size={20} cursor={'pointer'}/>
                </Box>
                </Flex>
                <Divider my={4} bg={'gray.500'}/>
                <VStack w={'full'} alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                  <Comments 
                  createdAt="1d ago"
                  username='cristie'
                  profilePic={'https://bit.ly/dan-abramov'}
                  text={'Nice pic'}
                  />
                  <Comments 
                  createdAt="10h ago"
                  username='Light'
                  profilePic={'https://bit.ly/kent-c-dodds'}
                  text={'og'}
                  />
                  <Comments 
                  createdAt="3h ago"
                  username='Johan'
                  profilePic={'https://bit.1y/day-abramov'}
                  text={'perfect !'}
                  />
                </VStack>
                <Divider my={4} bg={'gray.800'}/>
                <PostFooter isProfilePage={true}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfilePost
