"use client";

import React from "react";

import { Center, Spinner, Image, Flex } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center h="100vh">
      <Flex flexDirection="column" alignItems="center">
        <Image
          alt="Bienvenido a WePresto"
          src={"/logo.png"}
          width={150}
          height={30}
          mb={4}
        />
        <Spinner color="primary" size="xl" />
      </Flex>
    </Center>
  );
}
