import React,{ useState,useCallback,useMemo,useRef } from "react"
import {
    ModalOverlay,
    ModalContent,
    Modal, 
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    useColorModeValue,
    Box,
    Flex,
    Text,
    Button,
    Image
} from "@chakra-ui/react"
import ModalInput from "./input"
import ManageToken from "./manageTokens"
// import { Currency } from '@uniswap/sdk-core'
import { useWeb3React } from "@web3-react/core"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList } from "react-window"
import CurrencyList from "./CurrencyList"
import useDebounce from "../../hooks/useDebounce";
import {UseTokens,ExtendedEther} from "../../hooks/useWallet"
import { Token } from "../../hooks/useWallet"
import { useNativeBalance } from "../../utils/hooks/useBalances";

 type IModal= {
tokenModal:boolean,
setTokenModal:React.Dispatch<React.SetStateAction<boolean>>
}

export type Currency = Token
const SelectToken:React.FC<IModal> = ({tokenModal,setTokenModal}) => {
const { chainId } = useWeb3React()
const [ ,Symbol,Name,Logo] = useNativeBalance();
    const [displayManageToken,setDisplayManageToken] = useState(false)
    const [tokenList] = UseTokens()
    const ether = ExtendedEther(chainId,Symbol,Name,Logo)
    const [searchQuery,setSearchQuery] = useState<string>('')
    const debouncedQuery = useDebounce(searchQuery,300)

    const bgColor = useColorModeValue("#FFF", "#15202B");
    const boxShadow= useColorModeValue('#DEE6ED', '#324D68');
    const lightTextColor = useColorModeValue("#666666", "#DCE6EF");
    const heavyTextColor = useColorModeValue("#333333", "#F1F5F8");
    const textColor = useColorModeValue("#319EF6","#4CAFFF")
    const boxColor = useColorModeValue("#F2F5F8","#213345")


    const filteredTokenListWithETH = useMemo(():Currency[]=>{
      const s = debouncedQuery.toLowerCase().trim()
      if(s==="" || s ==="e" || s==="et" || s==="eth"){
        return ether ? [ether, ...tokenList] : tokenList
      }
      return tokenList
    },[debouncedQuery, ether, tokenList])
    const {
        onClose,
      } = useDisclosure();
const openManageToken = ():void => {
setDisplayManageToken(state => !state)
}

const handleInput = useCallback(
  (event) => {
   const input = event.target.value
    setSearchQuery(input)
  },
  [],
)


    return (
        
        <>
        <Modal isOpen={tokenModal} onClose={onClose} isCentered >
            <ModalOverlay />
            <ModalContent
                width="95vw"
                borderRadius="6px"
                bgColor={bgColor}
                minHeight="40vh"
            >
                <ModalHeader
                     fontSize="18px"
                     fontWeight="regular"
                    >Select a token</ModalHeader>
              <ModalCloseButton
                  bg="none"
                  size={'sm'}
                  mt={3}
                  mr={3}
                  cursor="pointer"
                  _focus={{ outline: 'none' }}
                  onClick={()=>setTokenModal(false)}
                  p={'7px'}
                  border='1px solid'
                  
              />
                 
<Box
              width="100%"
                fontSize="14px"
                boxShadow={`0px 1px 0px ${boxShadow}`}
              >
                  <Box 
                  width="90%"
                  margin="0 auto"
                  pb="5">
<ModalInput 
 placeholder="Search name or paste address"
 searchQuery={searchQuery}
 changeInput ={handleInput}
 />
                    </Box>
             
                </Box>
                <ModalBody maxHeight="60vh"
                  overflowY="scroll">

  
  {/* <AutoSizer disableWidth>
{({height}) => {
  console.log({height})
  return(
  <CurrencyList
  height={height}
  currencies = {tokenList}
  fixedListRef={fixedList}
  />
   )}} 
                     </AutoSizer> */}
                {filteredTokenListWithETH.map((currency,index)=>
    <CurrencyList currency={currency} key={index}/>
                 )}
                      </ModalBody>
              
               <ModalFooter py="4" bg={boxColor}
                borderRadius="6px">
                   <Box
                    w="100%" 
                    textAlign="center">
                    <Text fontSize="16px" 
                    color={textColor} 
                    cursor="pointer" 
                    onClick={() =>openManageToken()}>
                        Manage Tokens</Text>
                       </Box>
                   
               </ModalFooter>
            </ModalContent>
          </Modal>
          <ManageToken open={displayManageToken} setDisplayManageToken={setDisplayManageToken}/>
          </>
    )
}

export default SelectToken