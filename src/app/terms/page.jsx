"use client";

import React from "react";

import { Flex, Heading, Text } from "@chakra-ui/react";


export default function TermsPage() {

  return (
    <Flex
      height={"100%"}
      margin={0}
      justifyContent={"center"}
      alignItems={"center"}
      marginTop={"3rem"}
    >
      <Flex
        bgColor="white"
        justifyContent="center"
        p={8}
        borderRadius={[12, 22]}
        zIndex={4}
        maxWidth={["90%", "80%"]}
      >
        <Flex
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "gray.100",
              borderRadius: "10px",
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.500",
              borderRadius: "24px",
            },
          }}
          overflowY="scroll"
          maxHeight={"80dvh"}
          px={[5, 16]}
          py={[3, 10]}
          bgColor="white"
          flexDirection="column"
        >
          <Heading as="h1" size="xl" mb={8}>
            Términos y condiciones de WePresto para Colombia
          </Heading>
          <Text fontSize="lg" mb={4}>
            Bienvenido a WePresto, una plataforma en línea de crowdlending (prestamos 
            colaborativos) donde las personas pueden solicitar préstamos y los 
            inversionistas pueden financiarlos. Antes de utilizar nuestra plataforma, 
            le pedimos que lea atentamente estos términos y condiciones, ya que al registrarse
            o utilizar nuestros servicios, acepta cumplir con ellos. Si no está
            de acuerdo con estos términos y condiciones, no utilice nuestros
            servicios.
          </Text>
          <Text fontSize="lg" mb={4}>
            <strong>1. Decisión Financiera Responsabilidad</strong>
            <br />
            No somos responsables por las decisiones financieras que los
            usuarios tomen en la plataforma. Cada usuario es responsable de
            evaluar la viabilidad de su solicitud de préstamo o de su inversión.
          </Text>
          <Text fontSize="lg" mb={4}>
            <strong>2. Desembolso de préstamos</strong>
            <br />
            Nos reservamos el derecho a desembolsar préstamos dependiendo de
            diferentes factores, como el historial crediticio, la capacidad de
            endeudamiento, entre otros. No garantizamos que su solicitud de
            préstamo sea aprobada y desembolsada.
          </Text>
          <Text fontSize="lg" mb={4}>
            <strong>3. Valores Sugeridos</strong>
            <br />
            Los valores que se muestran en la plataforma son sugeridos y pueden
            cambiar en cualquier momento sin previo aviso. No garantizamos que
            los valores sugeridos sean precisos o estén actualizados en todo
            momento.
          </Text>
          <Text fontSize="lg" mb={4}>
            <strong>4. Firmar un Pagaré</strong>
            <br />
            Al solicitar un préstamo, la persona debe firmar un pagaré en el que
            se compromete a pagar oportunamente su deuda. El no cumplimiento de
            este compromiso puede resultar en la acción legal y el reporte a las
            centrales de riesgo crediticio.
          </Text>
          <Text fontSize="lg" mb={4}>
            <strong>5. Manejo de Cookies y Almacenamiento de Datos</strong>
            <br />
            Utilizamos cookies y otros dispositivos de seguimiento para mejorar
            su experiencia en nuestra plataforma. Al utilizar nuestra
            plataforma, acepta nuestro uso de cookies y otros dispositivos de
            seguimiento de acuerdo con nuestra política de privacidad, la cual
            se encuentra disponible en nuestro sitio web.
            <br />
            Nosotros almacenamos y protegemos sus datos personales de acuerdo
            con nuestra política de privacidad, la cual se encuentra disponible
            en nuestro sitio web.
          </Text>
          <Text fontSize="lg" mb={4}>
            <strong>6. Modificaciones a los Términos y Condiciones</strong>
            <br />
            Nos reservamos el derecho a modificar estos términos y condiciones
            en cualquier momento y sin previo aviso. Las modificaciones se harán
            efectivas a partir del momento en que se publiquen en nuestra
            plataforma. Es su responsabilidad revisar regularmente nuestros
            términos y condiciones para estar informado sobre cualquier cambio.
          </Text>
          <Text fontSize="lg" mb={4}>
            <strong>7. Ley Aplicable</strong>
            <br />
            Estos términos y condiciones se rigen por la ley colombiana y
            cualquier disputa o reclamo relacionado con ellos se resolverá en
            los tribunales colombianos competentes.
          </Text>
          <Text fontSize="lg" mb={4}>
            Si tiene alguna pregunta o inquietud sobre estos términos y
            condiciones, puede ponerse en contacto con nosotros a través de
            nuestro sitio web.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
