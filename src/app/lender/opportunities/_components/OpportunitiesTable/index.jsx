import React, { useState } from "react";
import {
  Flex,
  Table,
  Thead,
  Tr,
  Tooltip,
  Th,
  Box,
  Tbody,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import formatCurrency from "@wepresto/utils/format-currency";
import approximateToTwoDecimals from "@wepresto/utils/approximate-to-two-decimals";

import HowToInvestModal from "./_components/HowToInvestModal";

const getRows = (items) => {
  return items.map((item) => {
    return {
      consecutive: item?.consecutive,
      amount: formatCurrency(item?.amount, "COP"),
      annualInterestRate: item?.annualInterestRate * 100 + "%",
      annualInterestOverdueRate: item?.annualInterestOverdueRate * 100 + "%",
      term: item?.term + " meses",
      fundedAmount: formatCurrency(item?.fundedAmount, "COP"),
      remainingAmount: formatCurrency(item?.remainingAmount, "COP"),
      fundedPercentage:
        approximateToTwoDecimals(item?.fundedPercentage * 100) + "%",
    };
  });
};

export default function OpportunitiesTable({ data = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loanConsecutive, setLoanConsecutive] = useState(undefined);

  const handleInvestmentButtonClick = ({ loanConsecutive }) => {
    setLoanConsecutive(loanConsecutive);
    onOpen();
  };

  return (
    <>
      <Flex
        overflowX="auto"
        display="grid"
        gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
      >
        <Table
          style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
          variant="simple"
        >
          <Thead whiteSpace={"nowrap"}>
            <Tr bgColor="white">
              <Th color="primary.600" borderLeftRadius={12}>
                Préstamo
              </Th>
              <Tooltip label="Monto solicitado para retirar" placement="auto">
                <Th color="primary.600" cursor="help" textAlign="center">
                  <Flex flexDir="row" alignItems="center">
                    Monto{" "}
                    <Box display={["none", "none", "flex"]}>
                      <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                    </Box>
                  </Flex>
                </Th>
              </Tooltip>
              <Tooltip label="Tasa de interes anual" placement="auto">
                <Th color="primary.600" cursor="help" textAlign="center">
                  <Flex flexDir="row" alignItems="center">
                    Interés anual{" "}
                    <Box display={["none", "none", "flex"]}>
                      <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                    </Box>
                  </Flex>
                </Th>
              </Tooltip>
              <Tooltip
                label="Tasa de interes por mora anual (Aplica solo en caso de presentarse mora)"
                placement="auto"
              >
                <Th color="primary.600" cursor="help" textAlign="center">
                  <Flex flexDir="row" alignItems="center">
                    Interés mora{" "}
                    <Box display={["none", "none", "flex"]}>
                      <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                    </Box>
                  </Flex>
                </Th>
              </Tooltip>
              <Tooltip label="Número de coutas" placement="auto">
                <Th color="primary.600" cursor="help" textAlign="center">
                  <Flex flexDir="row" alignItems="center">
                    Plazo{" "}
                    <Box display={["none", "none", "flex"]}>
                      <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                    </Box>
                  </Flex>
                </Th>
              </Tooltip>
              <Tooltip label="Monto restante por recaudar" placement="auto">
                <Th color="primary.600" cursor="help" textAlign="center">
                  <Flex flexDir="row" alignItems="center">
                    Por recaudar{" "}
                    <Box display={["none", "none", "flex"]}>
                      <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                    </Box>
                  </Flex>
                </Th>
              </Tooltip>
              <Tooltip label="Porcentaje de recaudo" placement="auto">
                <Th color="primary.600" cursor="help" textAlign="center">
                  <Flex flexDir="row" alignItems="center">
                    Porcentaje recaudado{" "}
                    <Box display={["none", "none", "flex"]}>
                      <AiOutlineInfoCircle style={{ marginLeft: "4px" }} />
                    </Box>
                  </Flex>
                </Th>
              </Tooltip>
              <Th
                color="primary.600"
                cursor="help"
                textAlign="center"
                borderRightRadius={12}
              >
                Invertir
              </Th>
            </Tr>
          </Thead>
          <Tbody whiteSpace={"nowrap"}>
            {getRows(data).map((item, index) => (
              <Tr key={index} bgColor="white">
                <Td borderLeftRadius={12} textAlign="center">
                  {item.consecutive}
                </Td>
                <Td textAlign="center">{item.amount}</Td>
                <Td textAlign="center">{item.annualInterestRate}</Td>
                <Td textAlign="center">{item.annualInterestOverdueRate}</Td>
                <Td textAlign="center">{item.term}</Td>
                <Td textAlign="center">{item.remainingAmount}</Td>
                <Td textAlign="center">{item.fundedPercentage}</Td>
                <Td textAlign="center" borderRightRadius={12}>
                  <Button
                    colorScheme="primary"
                    maxW={"fit-content"}
                    onClick={() =>
                      handleInvestmentButtonClick({ loanConsecutive: item.consecutive })
                    }
                  >
                    ¡Quiero invertir!
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <HowToInvestModal isOpen={isOpen} onClose={onClose} loanConsecutive={loanConsecutive} />
    </>
  );
}
