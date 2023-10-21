"use client";

import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Spinner,
  Box,
  createStandaloneToast,
  Tag,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  Tooltip,
  AccordionPanel,
  Grid,
  GridItem
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
      loanAmount: formatCurrency(item?.loan?.amount, "COP"),
      term: item?.loan?.term,
      loanStatus: getLoanStatusObj(item?.loan?.status)?.name,
      loanStatusColor: getLoanStatusObj(item?.loan?.status)?.bgColor,
      invested: formatCurrency(item?.amount, "COP"),
      participationRate:
        approximateToTwoDecimals(item?.participationRate * 100) + "%",
      annualInterestParticipationRate:
        approximateToTwoDecimals(item?.annualInterestParticipationRate * 100) +
        "%",
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

        <Grid templateColumns={['repeat(1, 1fr)','repeat(3, 1fr)']} gap={4} mt={8}>
          {!loading && participations.length > 0 &&
            participations.map((participation, index) => (
              <GridItem>
              <Accordion key={index} bgColor={"white"} _hover={{ bgColor: "none" }} pb={2} boxShadow={"lg"} borderRadius={12} allowToggle>
                <AccordionItem border={"none"} borderRadius={12} overflow={"hidden"}>
                  <AccordionButton _hover={{ bgColor: "none" }} bgColor={"white"}>
                    <Box mt={2} as="span" flex='1' textAlign='left'>
                      <Flex mb={4} justifyContent={"space-between"}>
                        <Text color="gray.700" fontSize={20} fontWeight={800}>{participation.loanConsecutive}</Text>
                        <Tag variant='solid' borderRadius='full' bgColor={participation.loanStatusColor} color={"white"}>
                          {participation.loanStatus}
                        </Tag>
                      </Flex>
                      <Flex mb={2} justifyContent={"space-between"}>
                        <Text color="primary.500" fontSize={16}>Inversión</Text>
                        <Text color="gray.700" fontSize={16}>{participation.invested}</Text>
                      </Flex>
                      <Flex mb={2} justifyContent={"space-between"}>
                        <Text color="primary.500" fontSize={16}>Cuotas</Text>
                        <Text color="gray.700" fontSize={16}>{participation.term}</Text>
                      </Flex>
                      <Flex mb={0} justifyContent={"space-between"}>
                        <Tooltip
                          label="El porcentaje de participación que tienes en el préstamo, basado en el monto que invertiste."
                          placement="auto"
                        >
                          <Flex alignItems={"center"}>
                            <Text color="primary.500" fontSize={16}>Participación</Text>
                            <AiOutlineInfoCircle color="#1F4E52" style={{ marginLeft: "4px" }} />
                          </Flex>
                        </Tooltip>
                        <Text color="gray.700" fontSize={16}>{participation.participationRate}</Text>
                      </Flex>
                    </Box>
                  </AccordionButton>
                  <AccordionPanel bgColor={"white"} py={0}>
                    <Box as="span" flex='1' textAlign='left'>
                      <Flex mb={2} justifyContent={"space-between"}>
                        <Tooltip
                          label="Dinero recuperado de la inversión que hiciste en el préstamo"
                          placement="auto"
                        >
                          <Flex alignItems={"center"}>
                            <Text color="primary.500" fontSize={16}>Recuperado</Text>
                            <AiOutlineInfoCircle color="#1F4E52" style={{ marginLeft: "4px" }} />
                          </Flex>
                        </Tooltip>
                        <Text color="gray.700" fontSize={16}>{participation.paidPrincipal}</Text>
                      </Flex>
                      <Flex mb={2} justifyContent={"space-between"}>
                        <Tooltip
                          label="Dinero generado por el interés del préstamo"
                          placement="auto"
                        >
                          <Flex alignItems={"center"}>
                            <Text color="primary.500" fontSize={16}>Ganancias</Text>
                            <AiOutlineInfoCircle color="#1F4E52" style={{ marginLeft: "4px" }} />
                          </Flex>
                        </Tooltip>
                        <Text color="gray.700" fontSize={16}>{participation.paidInterest}</Text>
                      </Flex>
                      <Flex mb={2} justifyContent={"space-between"}>
                        <Tooltip
                          label="Dinero que posiblemente generes con el interés del préstamo"
                          placement="auto"
                        >
                          <Flex alignItems={"center"}>
                            <Text color="primary.500" fontSize={16}>Ganancias esperadas</Text>
                            <AiOutlineInfoCircle color="#1F4E52" style={{ marginLeft: "4px" }} />
                          </Flex>
                        </Tooltip>
                        <Text color="gray.700" fontSize={16}>{participation.interest}</Text>
                      </Flex>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              </GridItem>
            ))}
        </Grid>
      </Flex>
    </>
  );
}
