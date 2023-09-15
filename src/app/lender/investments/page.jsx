"use client";

import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tooltip,
  Box,
  createStandaloneToast,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

import lenderService from "@wepresto/services/lender.service";

import useAuthContext from "@wepresto/context/auth-context";

import getErrorMessage from "@wepresto/utils/get-error-message";
import getLenderUid from "@wepresto/utils/get-lender-uid";

import ValidateUser from "@wepresto/components/ValidateUser";
import formatCurrency from "@wepresto/utils/format-currency";
import approximateToTwoDecimals from "@wepresto/utils/approximate-to-two-decimals";
import getLoanStatusObj from "@wepresto/utils/get-loan-status-obj";

const getRows = (items) => {
  return items.map((item) => {
    return {
      loanConsecutive: item?.loan?.consecutive,
      loanStatus: getLoanStatusObj(item?.loan?.status)?.name,
      invested: formatCurrency(item?.amount, "COP"),
      participationRate:
        approximateToTwoDecimals(item?.participationRate * 100) + "%",
      annualInterestParticipationRate:
        approximateToTwoDecimals(item?.annualInterestParticipationRate * 100) +
        "%",
      term: item?.loan?.term,
      paidPrincipal: formatCurrency(item?.loan?.paidPrincipal, "COP"),
      paidInterest: formatCurrency(item?.loan?.paidInterest),
      interest: formatCurrency(item?.loan?.interest),
    };
  });
};

export default function InvestmentsPage() {
  const { user } = useAuthContext();
  const { toast } = createStandaloneToast();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [participations, setParticipations] = useState([]);

  const fetchParticipations = async () => {
    try {
      const participations = await lenderService.getParticipations({
        lenderUid: getLenderUid(user),
      });

      setParticipations(getRows(participations));
    } catch (error) {
      toast({
        position: "bottom-right",
        title: "Hubo un error",
        description: getErrorMessage(error),
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchParticipations().finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ValidateUser type={"lender"} />
      <Flex
        mt={[32, 32, 40]}
        pb={[10, 10, 4]}
        flexDirection="column"
        w={"100%"}
      >
        <Heading key="1" as="h3" size="lg" fontWeight={800}>
          Mis inversiones
        </Heading>

        {loading && <Spinner mt={4} />}

        {!loading && (
          <Flex flexDirection="column" mt={6}>
            <Button
              id="apply-for-loan-button"
              colorScheme="primary"
              maxW={"fit-content"}
              onClick={() => router.push("/lender/opportunities")}
            >
              Invertir
            </Button>
          </Flex>
        )}

        {!loading && participations.length > 0 && (
          <Flex overflowX="auto">
            <Table
              style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
              variant="simple"
            >
              <Thead>
                <Tr bgColor="white">
                  <Th color="primary.600" borderLeftRadius={12}>
                    Prestamo
                  </Th>
                  <Th color="primary.600">Estado</Th>
                  <Th color="primary.600">Invertido</Th>
                  <Tooltip
                    label="El porcentaje de tu dinero que se usó para el préstamo. Si es del 100% es porque tú pusiste todo el dinero para ese préstamo."
                    placement="auto"
                  >
                    <Th color="primary.600" cursor="help" textAlign="right">
                      <Flex flexDir="row" alignItems="center">
                        Participación{" "}
                        <Box display={["none", "none", "flex"]}>
                          <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                        </Box>
                      </Flex>
                    </Th>
                  </Tooltip>
                  <Tooltip
                    label="El interés que generarás anualmente con este préstamo"
                    placement="auto"
                  >
                    <Th color="primary.600" cursor="help" textAlign="right">
                      <Flex flexDir="row" alignItems="center">
                        Interés anual{" "}
                        <Box display={["none", "none", "flex"]}>
                          <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                        </Box>
                      </Flex>
                    </Th>
                  </Tooltip>
                  <Th color="primary.600" textAlign="right">
                    Cuotas
                  </Th>
                  <Tooltip
                    label="Dinero recuperado de lo que invertiste en este préstamo"
                    placement="auto"
                  >
                    <Th color="primary.600" cursor="help" textAlign="right">
                      <Flex flexDir="row" alignItems="center">
                        Recuperado{" "}
                        <Box display={["none", "none", "flex"]}>
                          <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                        </Box>
                      </Flex>
                    </Th>
                  </Tooltip>
                  <Tooltip
                    label="Dinero generado por el interés de este préstamo"
                    placement="auto"
                  >
                    <Th color="primary.600" cursor="help" textAlign="right">
                      <Flex flexDir="row" alignItems="center">
                        Ganancias{" "}
                        <Box display={["none", "none", "flex"]}>
                          <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                        </Box>
                      </Flex>
                    </Th>
                  </Tooltip>
                  <Tooltip
                    label="Dinero que posiblemente generes con el interés de este préstamo"
                    placement="auto"
                  >
                    <Th
                      color="primary.600"
                      cursor="help"
                      textAlign="right"
                      borderRightRadius={12}
                    >
                      <Flex flexDir="row" alignItems="center">
                        Ganancias esperadas{" "}
                        <Box display={["none", "none", "flex"]}>
                          <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                        </Box>
                      </Flex>
                    </Th>
                  </Tooltip>
                </Tr>
              </Thead>
              <Tbody>
                {participations.map((participation, index) => (
                  <Tr key={index} bgColor="white">
                    <Td
                      color="brand.font"
                      borderLeftRadius={12}
                      textAlign="left"
                    >
                      {participation.loanConsecutive}
                    </Td>
                    <Td color="brand.font" textAlign="left">
                      {participation.loanStatus}
                    </Td>
                    <Td color="brand.font" textAlign="left">
                      {participation.invested}
                    </Td>
                    <Td color="brand.font" textAlign="left">
                      {participation.participationRate}
                    </Td>
                    <Td color="brand.font" textAlign="left">
                      {participation.annualInterestParticipationRate}
                    </Td>
                    <Td color="brand.font" textAlign="left">
                      {participation.term}
                    </Td>
                    <Td color="brand.font" textAlign="left">
                      {participation.paidPrincipal}
                    </Td>
                    <Td color="brand.font" textAlign="left">
                      {participation.paidInterest}
                    </Td>
                    <Td
                      color="brand.font"
                      textAlign="left"
                      borderRightRadius={12}
                    >
                      {participation.interest}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        )}
      </Flex>
    </>
  );
}
