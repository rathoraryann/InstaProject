import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { useUserProfile } from '../../store/userProfileStore'
import { useAuthStore } from '../../store/authStore'
import EditProfile from './EditProfile'

const ProfileHeader = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const { userProfile } = useUserProfile()
    const { user } = useAuthStore()
    const visitingOwnProfileAndAuth = user && user.username === userProfile.username
    const visitingAnotherProfileAndAuth = user && user.username !== userProfile.username

    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
            <AvatarGroup
                size={{ base: 'xl', md: '2xl' }}
                justifySelf={"center"}
                alignSelf={"flex-start"}
                mx={"auto"}
            >
                <Avatar name='Rathor Aryan' src={userProfile.profilePicURL} alt="Rathor Aryan" />
            </AvatarGroup>
            <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
                <Flex gap={4} direction={{ base: 'column', sm: 'row' }} justifyContent={{ base: 'center', sm: 'flex-start' }} alignItems={'center'} w={'full'}>
                    <Text fontSize={{ base: 'sm', md: 'lg' }}>{userProfile.username}</Text>

                    {visitingOwnProfileAndAuth &&
                        <Flex gap={4} alignItems={'center'} justifyContent={'center '}>
                            <Button onClick={onOpen} bg={'white'} color={'black'} size={{ base: 'xs', md: 'sm' }} _hover={{ bg: 'whiteAlpha.800' }}>Edit Profile</Button>
                        </Flex>}

                        {visitingAnotherProfileAndAuth &&
                        <Flex gap={4} alignItems={'center'} justifyContent={'center '}>
                            <Button bg={'white'} color={'black'} size={{ base: 'xs', md: 'sm' }} _hover={{ bg: 'blue.600' }}>Follow</Button>
                        </Flex>}

                </Flex>

                <Flex alignItems={'center'} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>Posts
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>Followers
                    </Text>
                    <Text fontSize={{ base: 'xs', md: 'sm' }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>Following
                    </Text>
                </Flex>

                <Flex alignItems={'center'} gap={4}>
                    <Text fontSize={'sm'} fontWeight={'bold'}>{userProfile.fullName}</Text>
                </Flex>
                <Text fontSize={'sm'}>{userProfile.bio}</Text>
            </VStack>
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
        </Flex>
    )
}

export default ProfileHeader
