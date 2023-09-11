"use client";

import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  createStandaloneToast,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import loanService from "@wepresto/services/loan.service";

import getErrorMessage from "@wepresto/utils/get-error-message";

import ValidateUser from "@wepresto/components/ValidateUser";
import OpportunitiesTable from "./_components/OpportunitiesTable";

export default function OpportunitiesPage() {
  const { toast } = createStandaloneToast();

  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const loans = await loanService.getLoansNeedingFunding();
      setLoans(loans);
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
    fetchLoans().finally(() => setLoading(false));
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
          Oportunidades de inversión
        </Heading>

        {loading && <Spinner mt={4} />}

        {!loading && loans.length > 0 && <OpportunitiesTable data={loans} />}

        {!loading && loans.length < 1 && (
          <Alert status="info" marginTop={4} width={"fit-content"} borderRadius={"md"}>
            <AlertIcon />
            No hay oportunidades de inversión disponibles en este momento.
          </Alert>
        )}
      </Flex>
    </>
  );
}
