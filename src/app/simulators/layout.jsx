"use client";
import React from "react";
import { Flex, Container, ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

export default function RootLayout({
  children
}) {
  return (
<ChakraProvider theme={theme}>
      <Flex w="100%" h={["auto", "auto", "100dvh"]} justifyContent={"center"}>
        <Container
          boxShadow={["0px 4px 51px rgba(0, 0, 0, 0.05)", "none", "none"]}
          maxW="100%"
          zIndex={[2, -1]}
          position={["fixed", "absolute"]}
          backgroundImage={"/banner.png"}
          width="100vw"
          height={["66px", "32dvh"]}
          backgroundSize="cover"
        />
        <Flex height="fit-content" alignSelf="center" justifyContent="center" pt={["32px", "32px", 0]} pb={["80px", 0]} w="100%" flexDirection={"row"}>
          {children}
        </Flex>
      </Flex>
      </ChakraProvider>
  );
}
