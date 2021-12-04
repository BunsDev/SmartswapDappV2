import React,{ useMemo,useEffect,useState,useCallback } from 'react';
import { Box, Button, Image, Flex, useColorModeValue } from '@chakra-ui/react';
import SwapSettings from './SwapSettings';
import { useHistory } from 'react-router';
import From from './From';
import To from './To';
import { SwitchIcon } from '../../../../theme/components/Icons';
import { useWeb3React } from '@web3-react/core';
import { useDefaultsFromURLSearch } from '../../../../state/swap/hooks';
import { useCurrency } from '../../../../hooks/Tokens';
import { Token } from '@uniswap/sdk-core';
import { useAllTokens } from '../../../../hooks/Tokens';
import NewToken from '../../../../components/Tokens/newToken';
const SendToken = () => {
  const { account,chainId } = useWeb3React();
  const history = useHistory()

  const loadedUrlParams = useDefaultsFromURLSearch()
  
 // token warning stuff
 const [loadedInputCurrency,loadedOutputCurrency] = [
  useCurrency(loadedUrlParams?.inputCurrencyId),
  useCurrency(loadedUrlParams?.outputCurrencyId),
]
const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)

const urlLoadedTokens: Token[] = useMemo(
  () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
  [loadedInputCurrency, loadedOutputCurrency]
)

const handleConfirmTokenWarning = useCallback(() => {
  setDismissTokenWarning(true)
}, [])


 // dismiss warning if all imported tokens are in active lists
 const defaultTokens = useAllTokens()
 const importTokensNotInDefault =
   urlLoadedTokens &&
   urlLoadedTokens.filter((token: Token) => {
     return !Boolean(token.address in defaultTokens)
   })

   const handleDismissTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
    history.push('/swap')
  }, [history])


  const borderColor = useColorModeValue('#DEE5ED', '#324D68');
  const color = useColorModeValue('#999999', '#7599BD');
  const lightmode = useColorModeValue(true, false);
  const switchBgcolor = useColorModeValue('#F2F5F8', '#213345');
  const buttonBgcolor = useColorModeValue('#F2F5F8', '#213345');

  
  return (
    <div>
      <NewToken 
      open = {importTokensNotInDefault.length > 0 && !dismissTokenWarning}
      tokens= {importTokensNotInDefault}
      setDisplayImportedToken={handleDismissTokenWarning}

      />
      <Box
        border="1px"
        borderColor={borderColor}
        borderRadius="6px"
        h="420px"
        pl={3}
        pr={3}
      >
        <SwapSettings />
        <From />
        <Flex justifyContent="center">
          <SwitchIcon />
        </Flex>
        <To />
        <Flex alignItems="center">
          <Button
            w="100%"
            borderRadius="6px"
            border={lightmode ? '2px' : 'none'}
            borderColor={borderColor}
            h="48px"
            p="5px"
            mt={1}
            color={color}
            bgColor={buttonBgcolor}
            fontSize="18px"
            boxShadow={lightmode ? 'base' : 'lg'}
            _hover={{ bgColor: buttonBgcolor }}
          >
            {account ? 'Enter an amount' : 'Connect Wallet'}
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default SendToken;
