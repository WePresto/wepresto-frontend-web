import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HStack,
  Text,
  ModalCloseButton,
  ModalBody,
  Box,
  Link,
  Stack,
  Flex,
  Divider,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaRegCopy } from "react-icons/fa";
import formatCurrency from "@wepresto/utils/format-currency";

const StepItem = ({ step, content, finalStep }) => (
  <Stack>
    <Stack direction="row">
      <Stack direction="column" alignItems="center" spacing={0}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          flexGrow={0}
          width={8}
          height={8}
          borderRadius="9999px"
          backgroundColor="primary.500"
          color="white"
        >
          {step}
        </Flex>
        {!finalStep && (
          <Divider
            orientation="vertical"
            opacity={1}
            height="100%"
            borderWidth="1px"
            borderColor="primary.500"
          />
        )}
      </Stack>
      <Stack direction="column" pb={8}>
        {content}
      </Stack>
    </Stack>
  </Stack>
);

const Guide = ({ loanConsecutive }) => {
  const toast = useToast();

  return (
    <>
      <StepItem
        step={1}
        content={
          <Text>
            Envia o recarga mediante Nequi a este número de celular:{" "}
            <Box as="strong" color="primary.500">
              3134086868
            </Box>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(3134086868);
                toast({
                  title: "Copiado!",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
              aria-label="Copiar"
              variant="ghost"
              height="23px"
              color="primary.350"
              icon={<FaRegCopy />}
            />. El monto debe de ser multiplo y mayor a {formatCurrency(10000)}
          </Text>
        }
      />
      <StepItem
        step={2}
        content={
          <Text>
            Una vez que hayas realizado la transacción, envíanos una captura el
            comprobante al siguiente número en WhatsApp:{" "}
            <Link
              fontWeight="medium"
              color="primary.500"
              target="_blank"
              href={`https://wa.me/+573134086868/?text=Hola, quiero compartir el comprobante de inversión para el prestamo ${loanConsecutive}`}
            >
              +57 3134086868
            </Link>{" "}
            indicando el identificador del préstamo:{" "}
            <Box as="strong" color="primary.500">
              {loanConsecutive}
            </Box>
          </Text>
        }
      />
      <StepItem
        step={3}
        content={
          <Text>
            Al recibir tu comprobante, nosotros validaremos tu inversión con la
            información que Nequi nos reporta.
          </Text>
        }
      />
      <StepItem
        step={4}
        content={
          <Text>
            Si todo esta orden, tu inversión será confirmada y podrás verla en{" "}
            <Link
              fontWeight="medium"
              color="primary.500"
              target="_blank"
              href={"/lender/investments"}
            >
              Inversiones
            </Link>
            .
          </Text>
        }
        finalStep
      />
    </>
  );
};

export default function HowToInvestModal({ isOpen, onClose, loanConsecutive }) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>¿Cómo invertir en un préstamo?</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Guide loanConsecutive={loanConsecutive} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
