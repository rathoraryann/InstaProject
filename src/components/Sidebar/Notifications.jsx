import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";
import SuggestedUsers from "../SuggestedUsers/SuggestedUsers";

const Notifications = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Tooltip
				hasArrow
				label={"Notifications"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<NotificationsLogo />
					<Box display={{ base: "none", md: "block" }}>Notifications</Box>
				</Flex>
			</Tooltip>
			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Suggested Users</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<SuggestedUsers />
					</ModalBody>

					<ModalFooter>
						<Text color={'red'} fontWeight={'900'}>Follow users, to see their posts on your feed</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Notifications;