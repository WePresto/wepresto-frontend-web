import React from "react";
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  Text,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import environment from "@wepresto/environment";

import formatCurrency from "@wepresto/utils/format-currency";
import approximateToTwoDecimals from "@wepresto/utils/approximate-to-two-decimals";
import formatDate from "@wepresto/utils/format-date";
import getLoanStatusObj from "@wepresto/utils/get-loan-status-obj";

import Chip from "./_components/Chip";

export default function LoanInformationCard({ data }) {
  const router = useRouter();

  const handleLoanDetailsButtonClick = () => {
    router.push(`/borrower/loans/${data?.uid}`);
  };

  return (
    <Flex
      boxShadow={"0px 4px 51px rgba(0, 0, 0, 0.05)"}
      borderRadius={[8, 22]}
      mt={[4, 4, 8]}
      bgColor="white"
      minW={["100%", "100%", "400px"]}
      w={["100%", "100%", "800px"]}
      flexDirection="column"
    >
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton
            color="primary.350"
            px={8}
            py={4}
            pb={[6, 6, 4]}
            borderRadius={[8, 22]}
            justifyContent="space-between"
          >
            <Flex
            id="jeje"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Flex flexDir="column">
                <Flex
                  alignItems={["flex-start", "flex-start", "center"]}
                  flexDir={["column", "column", "row"]}
                >
                  <Text fontSize={25} color="brand.font">
                    {formatCurrency(data.amount, "COP")}
                  </Text>
                  <Chip
                    text={getLoanStatusObj(data.status).name}
                    color={getLoanStatusObj(data.status).color}
                    bgColor={getLoanStatusObj(data.status).bgColor}
                  />
                </Flex>
                <Flex display={["none", "none", "flex"]} fontSize={14}>
                  <Flex alignItems="center">
                    <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                      Identificador:
                    </Text>
                    <Text fontWeight="600" color="primary.900" ml={2} mr={4}>
                      {data?.consecutive}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                      Tasa EA:
                    </Text>
                    <Text fontWeight="600" color="primary.900" ml={2} mr={4}>
                      {data?.annualInterestRate
                        ? `${data?.annualInterestRate * 100}%`
                        : "N/A"}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                      Tasa EM:
                    </Text>
                    <Text fontWeight="600" color="primary.900" ml={2} mr={4}>
                      {data?.annualInterestRate
                        ? approximateToTwoDecimals(
                            ((data?.annualInterestRate || 0) * 100) / 12,
                          )
                        : "N/A"}
                      %
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                      Término:
                    </Text>
                    <Text fontWeight="600" color="primary.900" ml={2}>
                      {data?.term ? `${data?.term} cuotas` : "N/A"}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <AccordionIcon w={8} h={8} />
            </Flex>
          </AccordionButton>
          <AccordionPanel
            bgColor="gray.150"
            minW={["100%", "100%", "630px"]}
            w={["100%", "100%", "100%"]}
            pb={4}
            borderBottomRadius={[8, 22]}
          >
            <Flex
              fontSize={14}
              my={4}
              mx={4}
              flexDirection={["column", "column", "row"]}
            >
              <Flex alignItems="center" display={["flex", "flex", "none"]}>
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Identificador:
                </Text>
                <Text fontWeight="600" color="primary.900" ml={2} mr={4}>
                  {data?.consecutive}
                </Text>
              </Flex>
              <Flex alignItems="center" display={["flex", "flex", "none"]}>
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Tasa EA:
                </Text>
                <Text fontWeight="600" color="primary.900" ml={2} mr={4}>
                  {data?.annualInterestRate
                    ? `${data?.annualInterestRate * 100}%`
                    : "N/A"}
                </Text>
              </Flex>
              <Flex alignItems="center" display={["flex", "flex", "none"]}>
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Tasa EM:
                </Text>
                <Text fontWeight="600" color="primary.900" ml={2} mr={4}>
                  {data?.annualInterestRate
                    ? approximateToTwoDecimals(
                        ((data?.annualInterestRate || 0) * 100) / 12,
                      )
                    : "N/A"}
                  %
                </Text>
              </Flex>
              <Flex alignItems="center" display={["flex", "flex", "none"]}>
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Término:
                </Text>
                <Text fontWeight="600" color="primary.900" ml={2}>
                  {data?.term ? `${data?.term} cuotas` : "N/A"}
                </Text>
              </Flex>
              <Flex alignItems="center" display={["flex", "flex", "none"]}>
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  I. Mora:
                </Text>
                <Text ml={2} mr={4} fontWeight="600" color="primary.900">
                  {data?.annualInterestOverdueRate
                    ? approximateToTwoDecimals(
                        ((data?.annualInterestOverdueRate || 0) * 100) / 12,
                      )
                    : "N/A"}
                  %
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Solicitado:
                </Text>
                <Text ml={2} mr={4} fontWeight="600" color="primary.900">
                  {data?.createdAt
                    ? formatDate(new Date(data.createdAt), "UTC")
                    : "N/A"}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  Desembolso:
                </Text>
                <Text ml={2} mr={4} fontWeight="600" color="primary.900">
                  {data?.startDate
                    ? formatDate(new Date(data.startDate), "UTC")
                    : "N/A"}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text my={[1, 1, 2]} fontWeight="400" color="primary.700">
                  T. plataforma:
                </Text>
                <Text ml={2} mr={4} fontWeight="600" color="primary.900">
                  {data?.platformFee
                    ? formatCurrency(data?.platformFee)
                    : "N/A"}
                </Text>
              </Flex>
            </Flex>
            {data.status === environment.DISBURSED_LOAN_STATUS && (
              <Flex
                fontSize={14}
                my={4}
                mx={4}
                flexDirection={["column", "column", "row"]}
              >
                <Button
                  id="loan-details-button"
                  bgColor="primary.700"
                  color="white"
                  _hover={{
                    bg: "primary.500",
                    textDecoration: "none",
                  }}
                  _focusVisible={{
                    bg: "primary.500",
                    textDecoration: "none",
                  }}
                  onClick={handleLoanDetailsButtonClick}
                >
                  Detalles
                </Button>
              </Flex>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
