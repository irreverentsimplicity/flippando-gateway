import React from "react";
import { Flex, Box, Text, Spacer } from '@chakra-ui/react';
import Image from "next/image";


const Header = () => {
    

    return (
        <Flex align="center" p="3" bg="transparent" boxShadow="sm" alignItems="flex-start">
          <Box display="flex" alignItems="flex-start" flexDirection={"column"}>
          <Box display="flex" alignItems="flex-start" flexDirection={"row"}>
            <Image src="/assets/flippando-logo.png" width={48} height={48} alt ="logo" style={{marginTop: '11px', marginRight: '7px'}} />
            <Text className="text-[3vw]" marginTop={2} marginLeft={2} fontWeight="bold">Flippando</Text>
          </Box>
            <Text className="text-[0.8vw]" fontWeight="normal" style={{marginLeft: '4px'}}>Estoy flippando en colores</Text>
          </Box>
          
        </Flex>
      );
}

export default Header;