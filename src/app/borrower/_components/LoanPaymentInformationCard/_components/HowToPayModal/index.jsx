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
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
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

const PaymentGuide = ({
  consecutive,
  minimumPaymentAmount,
  maximumPaymentAmount,
}) => {
  const toast = useToast();

  let stepOne;

  if (minimumPaymentAmount && !maximumPaymentAmount) {
    stepOne = (
      <StepItem
        step={1}
        content={
          <Text>
            Haz una transferencia a través de Nequi por el monto de{" "}
            <Box as="strong" color="primary.500">
              {formatCurrency(minimumPaymentAmount, "COP")}
            </Box>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(minimumPaymentAmount);
                toast({
                  title: "¡Copiado!",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
              aria-label="Copiar número de celular"
              variant="ghost"
              height="23px"
              color="primary.350"
              icon={<FaRegCopy />}
            />
            a este número de celular:{" "}
            <Box as="strong" color="primary.500">
              3134086868
            </Box>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText("3134086868");
                toast({
                  title: "¡Copiado!",
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
            />
          </Text>
        }
      />
    );
  } else if (minimumPaymentAmount && maximumPaymentAmount) {
    stepOne = (
      <StepItem
        step={1}
        content={
          <Text>
            Haz una transferencia a través de Nequi por un monto mayor a{" "}
            <Box as="strong" color="primary.500">
              {formatCurrency(minimumPaymentAmount, "COP")}
            </Box>{" "}
            y menor a{" "}
            <Box as="strong" color="primary.500">
              {formatCurrency(maximumPaymentAmount, "COP")}
            </Box>{" "}
            a este número de celular:{" "}
            <Box as="strong" color="primary.500">
              3134086868
            </Box>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText("3134086868");
                toast({
                  title: "¡Copiado!",
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
            />
          </Text>
        }
      />
    );
  } else if (!minimumPaymentAmount && maximumPaymentAmount) {
    stepOne = (
      <StepItem
        step={1}
        content={
          <Text>
            Haz una transferencia a través de Nequi por el monto de{" "}
            <Box as="strong" color="primary.500">
              {formatCurrency(maximumPaymentAmount, "COP")}
            </Box>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(maximumPaymentAmount);
                toast({
                  title: "¡Copiado!",
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
            />{" "}
            a este número de celular:{" "}
            <Box as="strong" color="primary.500">
              3134086868
            </Box>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText("3134086868");
                toast({
                  title: "¡Copiado!",
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
            />
          </Text>
        }
      />
    );
  }

  return (
    <>
      {stepOne}
      <StepItem
        step={2}
        content={
          <Text>
            Si necesitas información sobre cómo realizar la transferencia,
            puedes hacer clic en el{" "}
            <Link
              color="primary.500"
              href="https://ayuda.nequi.com.co/hc/es/articles/115001419752-Quiero-enviar-plata-a-otro-Nequi"
              target="_blank"
            >
              enlace
            </Link>{" "}
            de ayuda.
          </Text>
        }
      />
      <StepItem
        step={3}
        content={
          <Text>
            Una vez que hayas completado la transacción, por favor envíanos el
            comprobante al siguiente número de WhatsApp:{" "}
            <Link
              fontWeight="medium"
              color="primary.500"
              target="_blank"
              href={
                `https://wa.me/+573134086868/?text=Hola, quisiera confirmar que ya he realizado un pago a mi préstamo ${consecutive}.`
              }
            >
              +57 3134086868
            </Link>{" "}
            indicando el identificador de tu préstamo: <Box as="strong" color="primary.500">{consecutive}</Box>
          </Text>
        }
      />
      <StepItem
        step={4}
        content={
          <Text>
            Nosotros validaremos tu pago una vez que hayamos recibido el
            comprobante.
          </Text>
        }
        finalStep
      />
    </>
  );
};

export default function HowToPayModal({
  isOpen,
  onClose,
  consecutive,
  minimumPaymentAmount,
  maximumPaymentAmount,
}) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>¿Cómo pagar mi préstamo?</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" color="primary.500">
                  Quiero pagar mi cuota
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <PaymentGuide
                  consecutive={consecutive}
                  minimumPaymentAmount={minimumPaymentAmount}
                  maximumPaymentAmount={undefined}
                />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" color="primary.500">
                    Quiero hacer un abono por otro valor
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <PaymentGuide
                  consecutive={consecutive}
                  minimumPaymentAmount={minimumPaymentAmount}
                  maximumPaymentAmount={maximumPaymentAmount}
                />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" color="primary.500">
                    Quiero pagar todo mi préstamo
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <PaymentGuide
                  consecutive={consecutive}
                  minimumPaymentAmount={undefined}
                  maximumPaymentAmount={maximumPaymentAmount}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
