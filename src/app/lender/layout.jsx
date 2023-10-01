"use client";

import React, { useState } from "react";
import { Flex, Container } from "@chakra-ui/react";
import { FaChartPie, FaChartLine, FaSearchDollar } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";

import { Providers } from "../providers";

import useAuthContext from "@wepresto/context/auth-context";

import Menu from "@wepresto/components/Menu";
import WhatsAppIcon from "@wepresto/components/WhatsAppButton";
import Joyride, { STATUS } from "react-joyride";
import { homeSteps } from "@wepresto/utils/tours/lender/home";
import isFirstLogin from "@wepresto/utils/is-first-login";

const LenderMenuItems = [
  {
    name: "Inicio",
    icon: <FaChartPie fontSize={22} style={{ marginRight: "8px" }} />,
    iconMobile: <FaChartPie fontSize={22} />,
    link: "/lender",
  },
  {
    name: "Oportunidades",
    icon: <FaSearchDollar fontSize={22} style={{ marginRight: "8px" }} />,
    iconMobile: <FaSearchDollar fontSize={22} />,
    link: "/lender/opportunities",
  },
  {
    name: "Inversiones",
    icon: <FaChartLine fontSize={22} style={{ marginRight: "8px" }} />,
    iconMobile: <FaChartLine fontSize={22} />,
    link: "/lender/investments",
  },
  {
    name: "Retiros",
    icon: <BiMoneyWithdraw fontSize={22} style={{ marginRight: "8px" }} />,
    iconMobile: <BiMoneyWithdraw fontSize={22} />,
    link: "/lender/withdrawals",
  },
];

export default function BorrowerLayaout({ children }) {
  const { user } = useAuthContext();

  const [{ run, steps }, setState] = useState({
    run: isFirstLogin(user.createdAt),
    steps: homeSteps
  });

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }

  };

  return (
    <Providers>
      <Flex w="100%">
      <Joyride
        callback={handleJoyrideCallback}
        locale={{ back: "Atrás", close: "Cerrar", last: "Finalizar", next: "Siguiente", open: "Abrir", skip: "Salir" }}
        continuous
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#1F4E52",
          },
        }}
      />
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
          <Menu user={user} menuItems={LenderMenuItems} />
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
