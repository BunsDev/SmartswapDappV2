import React, { useState } from 'react'
import {
    Box,
    Text,
    Button,
    useColorModeValue,
    Image,
    Flex,
    Heading,
  } from '@chakra-ui/react';

type NftProps = {
    nftName: string,
    image: string,
    isFeatured?: boolean,
    id: number,
    priceUSD?: number,
    priceRGP?: number,
    number?: string
}


export const Nft = function ({ nftName, image, number, id, priceUSD, priceRGP, isFeatured = false }: NftProps) {

    
  //const modalTextColor2 = useColorModeValue("#666666", "#DCE6EF");

    return (
         <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          borderColor={'#DEE5ED'}
          shadow="lg"
          position="relative"
          >
          <Image
            src={image}
            alt={`Picture `}
            roundedTop="lg"
            //maxHeight={246}
            borderRadius=".4rem"
            p={2}
          />
  
          <Box p="6">
            <Box d="flex" alignItems="baseline">
            <Text
            py={2} 
              >
                {nftName}
              </Text>
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Text textColor={'gray'}>Number:</Text>
              <Text>#179 of 500</Text>
            </Flex>
  
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Text textColor={'gray'}>Price:</Text>
              <Text>250 USD</Text>
            </Flex>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Text></Text>
              <Text >≈ 5000.91 RGP</Text>
            </Flex>
            <Flex mt="1" pt={2} justifyContent="space-between" alignContent="center">
              <Button width={40} variant={'brand'}>Buy NFT</Button>
              <Button 
              ml={2}
              textColor={'#319EF6'}
              borderRadius="6px"
              mb="4"
              borderColor={'#319EF6'}
              variant='outline'
              width={40}
              >
                   View NFT</Button>
            </Flex>
            
          </Box>
        </Box>
    )
}
export default Nft 
