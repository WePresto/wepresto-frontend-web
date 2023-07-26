"use client";

import {
  ChakraProvider,
  Flex,
  Container,
  NumberInput,
  Heading,
  Image,
  Text,
  NumberInputField,
  Select,
  Spinner,
  Button,
  createStandaloneToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import theme from "@wepresto/app/theme";

import loanService from "@wepresto/services/loan.service";

import formatCurrency from "@wepresto/utils/format-currency";
import getErrorMessage from "@wepresto/utils/get-error-message";
import approximateToTwoDecimals from "@wepresto/utils/approximate-to-two-decimals";

const { toast } = createStandaloneToast();

const MIN_AMOUNT = 250000;
const MAX_AMOUNT = 5000000;
const INITIAL_AMOUNT = 500000;

export default function SimulateLoan() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(0);
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [simulatedLoan, setSimulatedLoan] = useState(undefined);

  const fetchTerms = async () => {
    try {
      const terms = await loanService.getLoanTerms();

      setTerms(terms);
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

  const fetchSimulation = async () => {
    setLoading(true);
    try {
      const data = {
        amount: amount,
        term: selectedTerm,
        alias: "Solicitud de préstamo",
      };
      const result = await loanService.loanSimulate(data);
      setSimulatedLoan(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms().finally(() => {
      setAmount(INITIAL_AMOUNT);
      setLoading(false);
    });
  }, []);

  const filterTerms = () => {
    return terms.filter(({ value }) => {
      if (amount <= MIN_AMOUNT) return false;
      if (amount <= 500000 && value <= 6) {
        return true;
      } else if (amount > 500000 && amount <= 1000000 && value <= 12) {
        return true;
      } else if (amount > 1000000 && amount <= 2000000 && value <= 18) {
        return true;
      } else if (amount > 2000000 && amount <= 5000000 && value <= 24) {
        return true;
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    setFilteredTerms(filterTerms());

    if (amount < MIN_AMOUNT) {
      return setErrorMessage(
        `El monto mínimo es ${formatCurrency(MIN_AMOUNT, "COP")}`,
      );
    } else if (amount > MAX_AMOUNT) {
      return setErrorMessage(
        `El monto máximo es ${formatCurrency(MAX_AMOUNT, "COP")}`,
      );
    } else if (amount % 10000 !== 0) {
      return setErrorMessage("El monto debe ser múltiplo de 10000");
    }

    return setErrorMessage(undefined);
  }, [amount]);

  const handleNumberInputOnChange = (value) => {
    if (!value) return setAmount(0);
    const parsedValue = typeof value === "string" ? parseInt(value) : value;
    setAmount(parsedValue);
    setSelectedTerm(0);
  };

  const handleSelectOnChange = (event) => {
    const parsedValue = event.target.value ? parseInt(event.target.value) : 0;
    setSelectedTerm(parsedValue);
  };

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
        <Flex
          height="fit-content"
          alignSelf="center"
          justifyContent="center"
          pt={["32px", "32px", 0]}
          pb={["80px", 0]}
          w="100%"
          flexDirection={"row"}
        >
          <Flex
            zIndex={4}
            boxShadow={"7px 0px 64px rgba(0, 0, 0, 0.04)"}
            height="fit-content"
            bgColor="white"
            borderRadius={24}
            px={8}
            py={[8, 8, 12]}
            width={["90%", "90%", "auto"]}
            minWidth={["90%", "90%", "1000px"]}
            flexDirection="column"
            alignItems="center"
          >
            <Image
              src="/logo.png"
              w="200px"
              alt="logo a color de WePresto"
              mb={6}
              _hover={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            />
            <Heading size="xl" fontWeight="400" mt={6} textAlign={"center"}>
              {!simulatedLoan && "¿Cuánto dinero necesitas?"}
            </Heading>
            {simulatedLoan ? (
              <Flex w="100%" flexDir="column" alignItems="center">
                <Flex flexDir={"column"} width="100%" alignItems={"center"}>
                  <Flex flexDirection={["column", "column", "row"]}>
                    <Flex
                      border={"1px"}
                      borderColor="primary.500"
                      p={4}
                      borderRadius={8}
                      mr={[0, 0, 12]}
                      mb={8}
                      width={["100%", "100%", "auto"]}
                      flexDir={"column"}
                      alignItems="center"
                    >
                      <Heading color="brand.font" fontWeight="400" size={"md"}>
                        Recibes:
                      </Heading>
                      <Text color="primary.500" fontSize={42} fontWeight="800">
                        {formatCurrency(simulatedLoan.requestedAmount)}
                      </Text>
                    </Flex>
                    <Flex
                      flexDirection="column"
                      border={"1px"}
                      borderColor="primary.500"
                      p={4}
                      borderRadius={8}
                      mb={8}
                      alignItems="center"
                    >
                      <Heading color="brand.font" fontWeight="400" size={"md"}>
                        Cuotas de:
                      </Heading>
                      <Text color="primary.500" fontSize={42} fontWeight="800">
                        {formatCurrency(
                          simulatedLoan.loanInstallments[0].amount,
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection={["column", "column", "row"]}
                    w={["auto", "100%"]}
                    justifyContent="space-around"
                  >
                    <Flex
                      mb={[2, 2, 0]}
                      flexDir={["row", "row", "column"]}
                      alignItems="center"
                    >
                      <Text color="primary.900" fontSize={18}>
                        T. plataforma:
                      </Text>
                      &nbsp;
                      <Text
                        color="primary.700"
                        fontSize={[18, 18, 22]}
                        fontWeight="800"
                      >
                        {formatCurrency(simulatedLoan.platformUsageFee)}
                      </Text>
                    </Flex>
                    <Flex
                      mb={[2, 2, 0]}
                      flexDir={["row", "row", "column"]}
                      alignItems="center"
                    >
                      <Text color="primary.900" fontSize={18}>
                        Interés anual:
                      </Text>
                      &nbsp;
                      <Text
                        color="primary.700"
                        fontSize={[18, 18, 22]}
                        fontWeight="800"
                      >
                        {(simulatedLoan?.annualInterestRate || 0) * 100}%
                      </Text>
                    </Flex>
                    <Flex
                      mb={[2, 2, 0]}
                      flexDir={["row", "row", "column"]}
                      alignItems="center"
                    >
                      <Text color="primary.900" fontSize={18}>
                        Interés mensual:
                      </Text>
                      &nbsp;
                      <Text
                        color="primary.700"
                        fontSize={[18, 18, 22]}
                        fontWeight="800"
                      >
                        {approximateToTwoDecimals(
                          ((simulatedLoan?.annualInterestRate || 0) * 100) / 12,
                        )}
                        %
                      </Text>
                    </Flex>
                    <Flex
                      mb={[2, 2, 0]}
                      flexDir={["row", "row", "column"]}
                      alignItems="center"
                    >
                      <Text color="primary.900" fontSize={18}>
                        Pago total:
                      </Text>
                      &nbsp;
                      <Text
                        color="primary.700"
                        fontSize={[18, 18, 22]}
                        fontWeight="800"
                      >
                        {formatCurrency(simulatedLoan.totalAmountToPay)}
                      </Text>
                    </Flex>
                    <Flex
                      mb={[2, 2, 0]}
                      flexDir={["row", "row", "column"]}
                      alignItems="center"
                    >
                      <Text color="primary.900" fontSize={18}>
                        Número de cuotas:
                      </Text>
                      &nbsp;
                      <Text
                        color="primary.700"
                        fontSize={[18, 18, 22]}
                        fontWeight="800"
                      >
                        {simulatedLoan.loanInstallments.length} cuotas
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection={["column", "column", "row"]}
                    w="100%"
                    justifyContent="space-between"
                  >
                    <Button
                      colorScheme={"primary"}
                      variant="outline"
                      mt={[12, 12, 20]}
                      mr={[0, 0, 4]}
                      width={["100%", "100%", "220px"]}
                      size="lg"
                      onClick={() => setSimulatedLoan(undefined)}
                    >
                      Volver a empezar
                    </Button>
                    <Button
                      as="a"
                      colorScheme={"primary"}
                      mt={[4, 4, 20]}
                      mr={[0, 0, 4]}
                      width={["100%", "100%", "220px"]}
                      size="lg"
                      href="/sign-up?type=borrower"
                    >
                      ¡Pedir préstamo!
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex
                  width="100%"
                  justifyContent={["flex-start", "flex-start", "center"]}
                  flexDirection={["column", "column", "row"]}
                  alignItems={["flex-start", "flex-start", "center"]}
                  mt={[14, 20]}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <Text fontSize={25} fontWeight="800" mt={[0, 0, -2]}>
                        Necesito:
                      </Text>

                      <NumberInput
                        clampValueOnBlur={false}
                        min={MIN_AMOUNT}
                        max={MAX_AMOUNT}
                        value={amount}
                        onChange={(valueString) =>
                          handleNumberInputOnChange(valueString)
                        }
                        mx={[0, 0, 3]}
                        my={[3, 3, 0]}
                        maxW={{
                          lg: "230px",
                          sm: "100%",
                        }}
                      >
                        <NumberInputField
                          py={8}
                          px={6}
                          fontSize={25}
                          fontWeight={600}
                        />
                        {errorMessage && (
                          <Text
                            position="absolute"
                            mb={4}
                            mt={2}
                            fontSize={12}
                            color="error.400"
                          >
                            {errorMessage}
                          </Text>
                        )}
                      </NumberInput>

                      <Text fontSize={25} fontWeight="800" mt={-2}>
                        para pagar en:
                      </Text>
                      {terms.length && (
                        <Select
                          mt={[3, 3, 0]}
                          ml={[0, 0, 3]}
                          h={66}
                          maxW={{
                            lg: "230px",
                            sm: "100%",
                          }}
                          value={selectedTerm}
                          fontSize={25}
                          fontWeight="800"
                          onChange={handleSelectOnChange}
                          disabled={filteredTerms.length === 0}
                        >
                          <option value={0}>Selecciona un plazo</option>
                          {filteredTerms.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.value} cuotas
                            </option>
                          ))}
                        </Select>
                      )}
                    </>
                  )}
                </Flex>
                <Button
                  isLoading={loading || !!errorMessage || !selectedTerm}
                  spinner={
                    loading ? <Spinner /> : <Text>Simular préstamo</Text>
                  }
                  colorScheme={"primary"}
                  alignSelf={"flex-end"}
                  mt={[14, 14, 20]}
                  mr={[0, 0, 4]}
                  width={["100%", "100%", "220px"]}
                  size="lg"
                  onClick={() => fetchSimulation()}
                >
                  Simular préstamo
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
