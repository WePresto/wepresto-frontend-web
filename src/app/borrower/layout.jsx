"use client";

import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import { FaChartPie, FaChartLine } from "react-icons/fa";

import { Providers } from "../providers";

import useAuthContext from "@wepresto/context/auth-context";

import Menu from "@wepresto/components/Menu";
import WhatsAppIcon from "@wepresto/components/WhatsAppButton";

const BorrowerMenuItems = [
  {
    name: "Inicio",
    icon: <FaChartPie fontSize={22} style={{ marginRight: "8px" }} />,
    iconMobile: <FaChartPie fontSize={22} />,
    link: "/borrower",
  },
  {
    name: "Mis Préstamos",
    mobileName: "Préstamos",
    icon: <FaChartLine fontSize={22} style={{ marginRight: "8px" }} />,
    iconMobile: <FaChartLine fontSize={22} />,
    link: "/borrower/loans",
  },
];

export default function BorrowerLayaout({ children }) {
  const { user } = useAuthContext();

  return (
    <Providers>
      <Flex w="100%">
        <Container
          boxShadow={["0px 4px 51px rgba(0, 0, 0, 0.05)", "none", "none"]}
          maxW="100%"
          zIndex={[2, -1]}
          position={["fixed", "absolute"]}
          backgroundImage={"/banner.png"}
          width="100vw"
          height={["66px", "128px"]}
          backgroundSize="cover"
        />
        <Flex
          pb={["80px", "40px"]}
          w="100%"
          flexDirection={["column", "column", "row"]}
        >
          <Menu user={user} menuItems={BorrowerMenuItems} />
          <WhatsAppIcon
            documentNumber={user?.documentNumber}
            fullName={user?.fullName}
          />
          <Flex width="100%" px={[4, 4, 14]} pl={[4, 4, 0]}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Providers>
  );
}
