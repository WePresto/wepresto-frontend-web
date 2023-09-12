import React from "react";
import { Box, Flex, Image, chakra } from "@chakra-ui/react";

const LogosShowcase = () => {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/c/c9/Universidad_de_los_Andes_%28logo%29.png",
    "https://wepresto.com/eventique.png",
    "https://wepresto.com/dfl.png"
  ];

  return (
    <Box py={16} bg="gray.100">
      <Box maxW="6xl" mx="auto">
        <Flex align="center" justify="center" mb={6}>
          <chakra.h3 fontSize={{
                base: "3xl",
                sm: "2xl",
              }}
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="shorter"
              color="gray.900"
              mb={12}
              _dark={{
                color: "gray.100",
              }}>Ellos confían en nosotros:</chakra.h3>
        </Flex>
        <Flex justifyContent="center">
          {logos.map((logo, index) => (
            <Box key={index} p={4} mx={12}>
              <Image src={logo} alt={`nos respalda ${index + 1}`} maxH="48px" maxW="100%" mx="auto" />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default LogosShowcase;
