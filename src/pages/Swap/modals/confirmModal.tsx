import React from "react"
import {
    ModalOverlay,
    ModalContent,
    Modal, 
    ModalCloseButton,
    ModalHeader,
    useDisclosure,
    useColorModeValue,
    Box,
    Flex,
    Text,
    Button,
    Image
} from "@chakra-ui/react"
import { InfoOutlineIcon,ArrowDownIcon } from "@chakra-ui/icons"
import RGPImage from "./../../../assets/tokens/RGP.svg"
import USDTImage from "./../../../assets/tokens/USDT.svg"



export type IModal= {
title:string;
from:string;
fromPrice:string;
to:string;
fromDeposited:string;
toDeposited:string;
minRecieved:string;
route: string[],
fee: string,
impact: string,
slippage:string
}

const ConfirmModal:React.FC<IModal> = ({
    title,
    from,
    to,
    fromPrice,
    fromDeposited,
    toDeposited,
    minRecieved,
    route,
    slippage,
    impact,
    fee
    }) => {
    const bgColor = useColorModeValue("#FFF", "#15202B");
    const lightTextColor = useColorModeValue("#666666", "#DCE6EF");
    const heavyTextColor = useColorModeValue("#333333", "#F1F5F8");
    const borderColor = useColorModeValue("#DEE6ED","#324D68")
    const boxColor = useColorModeValue("#F2F5F8","#213345")
    const {
        isOpen,
        onOpen,
        onClose,
      } = useDisclosure();
    return (
        <>
        <button onClick={onOpen}>
            click me
        </button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                width="95vw"
                borderRadius="6px"
                paddingBottom="20px"
                bgColor={bgColor}
                minHeight="40vh"
            >
                <ModalHeader
                     fontSize="18px"
                     fontWeight="regular"
                    >{title}</ModalHeader>
              <ModalCloseButton
                  bg="none"
                  size={'sm'}
                  mt={3}
                  mr={3}
                  cursor="pointer"
                  _focus={{ outline: 'none' }}
                  onClick={onClose}
                  p={'7px'}
                  border={'1px solid'}

              />
              <Box
              width="90%"
                margin="0 auto"
                fontSize="14px"
              >
                <Box
                bgColor={boxColor}
                border={`1px solid ${borderColor}`}
                borderRadius="6px"
                padding="10px"
                fontWeight="normal"
                fontSize="24px"
                >
                        <Text fontSize="16px" color={lightTextColor}>From</Text>
                        <Flex justifyContent="space-between" mt="2">
                        <Flex><Image src={RGPImage} mr="2"/> <Text>{from}</Text></Flex>
                        <Text color={heavyTextColor}>{fromDeposited}</Text>
                        </Flex>
                    
                </Box> 
                <Box display= "flex"
                justifyContent= "center" my="-4">
                <Box
                display= "flex"
                flexDirection= "row"
                justifyContent= "center"
                alignItems= "center"
                width="40px"
                height="40px"
                bgColor={boxColor}
                border={`3px solid ${borderColor}`}
                boxSizing= "border-box"
                borderRadius= "12px">
                <ArrowDownIcon w={5} h={10}/>
                </Box>
                    </Box>
                
                <Box
                bgColor={boxColor}
                border={`1px solid ${borderColor}`}
                borderRadius="6px"
                padding="10px"
                fontWeight="normal"
                fontSize="24px"
                >
                        <Text fontSize="16px" color={lightTextColor}>To</Text>
                        <Flex justifyContent="space-between" mt="2">
                        <Flex><Image src={USDTImage} mr="2"/> <Text>{to}</Text></Flex>
                        <Text color={heavyTextColor}>{toDeposited}</Text>
                        </Flex>
                    
                </Box>
                <Box my="5">
                <Flex
                justifyContent="space-between" fontSize="14px">
                    <Text color={lightTextColor}>Price</Text>
                    <Text color={heavyTextColor} fontWeight="bold">1 {to} = {fromPrice} {from}</Text>
                </Flex>
                </Box>
                <Box
                border={`1px solid ${borderColor}`}
                borderRadius="6px"
                padding="10px"
                fontWeight="normal"
                background={boxColor}
                fontSize="14px"
                margin="15px 0"
                >
                        <Flex justifyContent="space-between">
                        <Box color={lightTextColor}>Minimum received <InfoOutlineIcon /></Box>
                        <Text color={heavyTextColor}>{minRecieved}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" my="4">
                        <Box color={lightTextColor}>Route <InfoOutlineIcon /></Box>
                        <Text color={heavyTextColor} fontWeight="500">{route.join(" > ")}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                        <Box color={lightTextColor}>Allowed Slippage <InfoOutlineIcon /></Box>
                        <Text color={heavyTextColor}>{slippage}%</Text>
                        </Flex>
                        <Flex justifyContent="space-between" my="4">
                        <Box color={lightTextColor}>Price Impact <InfoOutlineIcon /></Box>
                        <Text color={heavyTextColor}>{impact}%</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                        <Box color={lightTextColor}>Liquidity Provider Fee <InfoOutlineIcon /></Box>
                        <Text color={heavyTextColor}>{fee} RGP</Text>
                        </Flex>
                    
                </Box>
                <Text mb="2" color={lightTextColor}>Output is estimated. You will receive at least <Text as="span" color={heavyTextColor}>{toDeposited} {to}</Text> or the transaction will revert.
                </Text>
                <Button variant="brand" isFullWidth padding="24px 0" boxShadow="none"> Confirm Swap </Button>
                
                </Box>
                
               
            </ModalContent>
          </Modal>
          </>
    )
}

export default ConfirmModal