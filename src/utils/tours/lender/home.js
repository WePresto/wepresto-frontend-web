import React from "react";
import { Heading, Text, Image, Flex } from "@chakra-ui/react";

export const homeSteps = [
    {
      content: <Flex flexDirection="column" alignItems="center">
        <Image alt="Logo de WePresto" src="/logo.png" width={150} mb={6} />
        <Heading as="h2" size="lg" mb={4}>¡Te damos la bienvenida!</Heading>
      <Text fontSize="lg">A continuación te explicaremos el funcionamiento básico de la plataforma</Text></Flex>,
      placement: "center",
      target: "body",
      styles: {
        options: {
          width: 500,
        },
      },
    },
    {
      content: <div><Heading as="h2" size="md" mb={4}>El resumen de tus inversiones</Heading>
      <Text fontSize="md">Al hacer click en esta tarjeta, podrás ver detalles sobre tus inversiones</Text></div>,
      spotlightPadding: 20,
      placement: "bottom",
      target: ".lenderCard",
    },
    {
      content: <div><Heading as="h2" size="md" mb={4}>Aquí vas al inicio</Heading>
      <Text fontSize="md">Al hacer click en este botón, irás a la página principal (en la que estás en estos momentos)</Text></div>,
      spotlightPadding: 20,
      placement: "right",
      target: ".Inicio",
    },
    {
      content: <div><Heading as="h2" size="md" mb={4}>Oportunidades disponibles</Heading>
      <Text fontSize="md">Al hacer click aquí, podrás ver el listado de oportunidades de inversión activas.</Text></div>,
      spotlightPadding: 20,
      placement: "right",
      target: ".Oportunidades",
    },
    {
      content: <div><Heading as="h2" size="md" mb={4}>Tus inversiones</Heading>
      <Text fontSize="md">Al hacer click aquí, podrás ver las inversiones que has realizado.</Text></div>,
      spotlightPadding: 20,
      placement: "right",
      target: ".Inversiones",
    },
    {
      content: <div><Heading as="h2" size="md" mb={4}>Retira tu dinero</Heading>
      <Text fontSize="md">Al hacer click aquí, podrás solicitar el retiro del dinero que tengas disponible.</Text></div>,
      spotlightPadding: 20,
      placement: "right",
      target: ".Retiros",
    },
    {
      content: <div><Heading as="h2" size="md" mb={4}>Ajustes</Heading>
      <Text fontSize="md">Aquí puedes ver detalles de tu cuenta como el correo, teléfono o dirección.</Text></div>,
      spotlightPadding: 20,
      placement: "right",
      target: ".Ajustes",
    },
    {
      content: <div><Heading as="h2" size="md" mb={4}>Cierra tu sesión</Heading>
      <Text fontSize="md">Al hacer click aquí, cerrarás tu sesión.</Text></div>,
      spotlightPadding: 20,
      placement: "right",
      target: ".CerrarSesion",
    },
    {
      content: <div><Heading as="h2" size="md" mb={4}>¿Necesitas comunicarte con nosotros?</Heading>
      <Text fontSize="md">Siempre puedes dar click aquí para escribirnos por WhatsApp.</Text></div>,
      spotlightPadding: 20,
      placement: "right",
      target: ".Whatsapp",
    },
  ];