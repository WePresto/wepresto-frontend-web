"use client";
// import styles from './page.module.css'

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Flex,
  Stack,
  Image,
  Heading,
  Text,
  useBreakpointValue,
  Button,
  Link,
  background,
  Box,
  Container,
  SimpleGrid,
  HStack,
  VStack,
  Icon,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaCheck, FaExternalLinkAlt } from "react-icons/fa";
import ValidateUser from "@wepresto/components/ValidateUser";

import Feature from "./_components/Feature";
import SocialButton from "./_components/SocialButton";
import LogosShowcase from "@wepresto/components/LogosShowcase";

const slogans = [
  "Uniendo tecnología y financiamiento colaborativo para construir un futuro más próspero juntos.",
  "Transformando el poder de la comunidad en préstamos justos y accesibles",
  "Convierte tus sueños en realidad con nuestra tecnología de préstamos colectivos",
  "Juntos impulsamos tus sueños: Financia y crea con nuestra tecnología de crowdlending.",
];

const images = [
  {
    image:
      "https://images.pexels.com/photos/3658482/pexels-photo-3658482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    info: "Foto por Frank Meriño",
    url: "https://www.pexels.com/photo/person-holding-a-yellow-corn-3658482/",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601578605817-63f825110984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1517&q=80",
    info: "Foto por Luis Vidal",
    url: "https://unsplash.com/photos/FKE-fCOPKCw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
  },
  {
    image:
      "https://images.pexels.com/photos/3963167/pexels-photo-3963167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    info: "Foto por Frank Meriño",
    url: "https://www.pexels.com/photo/man-in-white-button-up-shirt-holding-green-bananas-3963167/",
  },
  {
    image:
      "https://images.pexels.com/photos/3963370/pexels-photo-3963370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    info: "Foto por Frank Meriño",
    url: "https://www.pexels.com/photo/man-in-polo-shirt-holding-yellow-fruit-3963370/",
  },
];

const features = [
  {
    id: 1,
    title: "Mínima experiencia crediticia",
    text: "Somos la alternativa para los no bancarizados.",
  },
  {
    id: 2,
    title: "Mejores cuotas de interés",
    text: "Olvídate del 15 o el 20% mensual. Tasas del 2% en adelante.",
  },
  {
    id: 3,
    title: "Paga en línea",
    text: "Paga por Nequi, así de fácil.",
  },
  {
    id: 4,
    title: "¿Tienes dinero? ¡Invierte!",
    text: "Puedes generar rentabilidad y ayudar a otros.",
  },
];

const stats = [
  { label: "Créditos activos", value: "24" },
  { label: "Interés promedio", value: "2.5%" },
  { label: "Plazos de pago", value: "6 meses" },
  { label: "Porcentaje de aprobación", value: "91%" },
];

export default function LandingPage() {
  const router = useRouter();

  const [slogan, setSlogan] = React.useState(slogans[0]);
  background;
  const [backgroundImage, setBackgroundImage] = React.useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const slogansIndex = Math.floor(Math.random() * slogans.length);
      setSlogan(slogans[slogansIndex]);

      const imagesIndex = Math.floor(Math.random() * images.length);
      setBackgroundImage(images[imagesIndex]);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBorrowerButtonClick = () => {
    router.push("/sign-in?type=borrower");
  };

  const handleLenderButtonClick = () => {
    router.push("/sign-in?type=lender");
  };

  return (
    <>
      <ValidateUser type={undefined} />
      <Stack
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
        width="100%"
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Image
            alt="bienvenido a wepresto"
            src={"/logo.png"}
            width={150}
            height={30}
            position="absolute"
            top={5}
            left={5}
          />
          <Stack mt={{ base: "60px", md: "0" }} spacing={6} w={"full"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                color="primary.900"
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "15%", md: "25%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "primary.600",
                  zIndex: -1,
                }}
              >
                Te prestamos facilito
              </Text>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                color={"gray.500"}
                marginTop={"1rem"}
              >
                {slogan}
              </Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                marginTop={"1rem"}
              >
                <Button
                  id="borrower-button"
                  onClick={handleBorrowerButtonClick}
                  rounded={"full"}
                  bg={"primary.600"}
                  color={"white"}
                  _hover={{
                    bg: "primary.700",
                    textDecoration: "none",
                  }}
                  _focusVisible={{
                    bg: "primary.700",
                    textDecoration: "none",
                  }}
                >
                  Necesito dinero
                </Button>
                <Button
                  id="lender-button"
                  onClick={handleLenderButtonClick}
                  rounded={"full"}
                  color={"primary.500"}
                  _hover={{
                    bg: "gray.200",
                    textDecoration: "none",
                  }}
                  _focusVisible={{
                    bg: "gray.200",
                    textDecoration: "none",
                  }}
                >
                  Quiero invertir
                </Button>
              </Stack>
            </Heading>
          </Stack>
        </Flex>
        <Flex
          alignItems={"flex-end"}
          bgSize="cover"
          bgPosition="center"
          flex={1}
          bgImage={backgroundImage.image}
        >
          <Text
            display={"flex"}
            justifyContent={{ lg: "flex-end", sm: "flex-start" }}
            m={4}
            width={{ base: "50dvw", md: "50dvw" }}
          >
            <Link
              fontSize={12}
              _hover={{
                opacity: ".8",
              }}
              _focusVisible={{
                opacity: ".8",
              }}
              bgColor={"gray.900"}
              opacity="0.5"
              color="white"
              py={2}
              px={3}
              borderRadius="8"
              display={"flex"}
              alignItems="center"
              isExternal
              href={backgroundImage.url}
            >
              {backgroundImage.info}&nbsp;&nbsp;
              <FaExternalLinkAlt />
            </Link>
          </Text>
        </Flex>
      </Stack>

      <Box py={20} px={4} bg="white">
        <Stack spacing={4} as={Container} maxW={"4xl"} textAlign={"center"}>
          <Heading fontSize={"3xl"}>Así te podemos ayudar</Heading>
          <Text color={"gray.600"} fontSize={"xl"}>
            WePresto te ofrece préstamos con intereses justos y plazos de pago a
            tu medida.
          </Text>
        </Stack>
        <Container maxW={"6xl"} mt={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {features.map((feature) => (
              <HStack key={feature.id} align={"top"}>
                <Box color={"green.400"} px={2}>
                  <Icon as={FaCheck} />
                </Box>
                <VStack align={"start"}>
                  <Text fontWeight={600}>{feature.title}</Text>
                  <Text color={"gray.600"}>{feature.text}</Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Flex
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          _dark={{
            bg: "gray.800",
          }}
        >
          <Box
            maxW="7xl"
            w={{
              md: "3xl",
              lg: "4xl",
            }}
            mx="auto"
            py={{
              base: 12,
              lg: 16,
            }}
            px={{
              base: 4,
              lg: 8,
            }}
            display={{
              lg: "flex",
            }}
            alignItems={{
              lg: "center",
            }}
            justifyContent={{
              lg: "space-between",
            }}
          >
            <chakra.h2
              fontSize={{
                base: "3xl",
                sm: "4xl",
              }}
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="shorter"
              color="gray.900"
              _dark={{
                color: "gray.100",
              }}
            >
              <chakra.span display="block">
                Suena interesante, ¿verdad?
              </chakra.span>
            </chakra.h2>
            <Stack
              direction={{
                base: "column",
                sm: "row",
              }}
              mt={{
                base: 8,
                lg: 0,
              }}
              flexShrink={{
                lg: 0,
              }}
            >
              <Link
                href="/simulators/loan"
                w={["full", "auto"]}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={5}
                py={3}
                border="solid transparent"
                fontWeight="bold"
                rounded="full"
                shadow="md"
                _light={{
                  color: "white",
                }}
                bg="primary.600"
                _dark={{
                  bg: "primary.500",
                }}
                _hover={{
                  bg: "primary.700",
                  _dark: {
                    bg: "primary.600",
                  },
                }}
              >
                Simula tu préstamo
              </Link>
            </Stack>
          </Box>
        </Box>
      </Flex>

      <LogosShowcase />

      <Box bg="primary.500" as="section" py={{ base: "10", md: "14" }}>
        <Stack
          mb={8}
          spacing={4}
          as={Container}
          maxW={"4xl"}
          textAlign={"center"}
        >
          <Heading color="white" fontSize={"3xl"}>
            Nuestras cifras
          </Heading>
        </Stack>
        <Container maxW={"6xl"}>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: "5", md: "6" }}>
            {stats.map(({ label, value }) => (
              <Box
                key={Math.random()}
                px={{ base: "4", md: "6" }}
                py={{ base: "5", md: "6" }}
                bg="white"
                borderRadius="lg"
                boxShadow="lg"
              >
                <Stack>
                  <Text textStyle="sm" color="fg.muted">
                    {label}
                  </Text>
                  <Heading size={{ base: "sm", md: "md" }}>{value}</Heading>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        spacing={0}
      >
        <Flex>
          <Image
            src="https://images.pexels.com/photos/3019836/pexels-photo-3019836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="happy man"
            fit="cover"
            w="full"
            h={{
              base: 64,
              md: "full",
            }}
            bg="gray.100"
            loading="lazy"
            opacity={0.4}
          />
        </Flex>
        <Flex
          bg="white"
          direction="column"
          alignItems="start"
          justifyContent="center"
          px={{
            base: 4,
            md: 8,
            lg: 20,
          }}
          py={24}
          zIndex={3}
        >
          <chakra.span
            color="brand.600"
            _dark={{
              color: "gray.300",
            }}
            fontSize="lg"
            textTransform="uppercase"
            fontWeight="extrabold"
          >
            Es el momento
          </chakra.span>
          <chakra.h1
            mb={4}
            fontSize={{
              base: "4xl",
              md: "4xl",
              lg: "5xl",
            }}
            fontWeight="bold"
            color="brand.600"
            _dark={{
              color: "gray.300",
            }}
            lineHeight="shorter"
            textShadow="2px 0 currentcolor"
          >
            Solicita tu préstamo ahora
          </chakra.h1>
          <chakra.p
            pr={{
              base: 0,
              lg: 16,
            }}
            mb={4}
            fontSize="lg"
            color="brand.600"
            _dark={{
              color: "gray.400",
            }}
            letterSpacing="wider"
          >
            Crea tu cuenta y realiza la solicitud. Aprobamos en dos días.
          </chakra.p>
          <Box display="inline-flex">
            <Button
              variant="solid"
              w={{
                base: "full",
                sm: "auto",
              }}
              onClick={handleBorrowerButtonClick}
              rounded={"full"}
              bg={"primary.600"}
              color={"white"}
              _hover={{
                bg: "primary.700",
                textDecoration: "none",
              }}
              _focusVisible={{
                bg: "primary.700",
                textDecoration: "none",
              }}
              size="lg"
            >
              Solicitar préstamo
            </Button>
          </Box>
        </Flex>
      </SimpleGrid>

      <Flex
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={[8, 21]}
        w="auto"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          shadow="xl"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          px={8}
          py={20}
          mx="auto"
        >
          <SimpleGrid
            alignItems="center"
            columns={{
              base: 1,
              lg: 2,
            }}
            spacingY={{
              base: 10,
              lg: 32,
            }}
            spacingX={{
              base: 10,
              lg: 24,
            }}
          >
            <Box>
              <chakra.h2
                mb={3}
                fontSize={{
                  base: "3xl",
                  md: "4xl",
                }}
                fontWeight="extrabold"
                textAlign={{
                  base: "center",
                  sm: "left",
                }}
                _light={{
                  color: "black",
                }}
                lineHeight="shorter"
                letterSpacing="tight"
              >
                Convierte en inversor
              </chakra.h2>
              <chakra.p
                mb={6}
                fontSize={{
                  base: "lg",
                  md: "xl",
                }}
                textAlign={{
                  base: "center",
                  sm: "left",
                }}
                color="gray.600"
                _dark={{
                  color: "gray.500",
                }}
              >
                ¿Tienes dinero y no sabes en qué invertirlo? En WePresto ves tu
                dinero crecer mensualmente.
              </chakra.p>
              <Button
                variant="solid"
                w={{
                  base: "full",
                  sm: "auto",
                }}
                onClick={handleLenderButtonClick}
                rounded={"full"}
                bg={"primary.600"}
                color={"white"}
                _hover={{
                  bg: "primary.700",
                  textDecoration: "none",
                }}
                _focusVisible={{
                  bg: "primary.700",
                  textDecoration: "none",
                }}
                size="lg"
              >
                ¡Quiero invertir!
              </Button>
            </Box>
            <VStack
              direction="column"
              flexGrow={1}
              spacing={5}
              alignItems="start"
            >
              <Feature>No hay cláusula de permanencia</Feature>
              <Feature>Retira cada mes sin problemas</Feature>
              <Feature>Reinvierte tus ganancias</Feature>
              <Feature>Hasta 28% de rentabilidad anual</Feature>
              <Feature>Ten control sobre cada una de tus inversiones</Feature>
              <Feature>Soporte 24/7</Feature>
            </VStack>
          </SimpleGrid>
        </Box>
      </Flex>

      <Box bg="white" color={useColorModeValue("gray.700", "gray.200")}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          spacing={4}
          justify={"center"}
          align={"center"}
        >
          <Image
            alt="bienvenido a wepresto"
            src={"/logo.png"}
            width={150}
            height={30}
          />
          <Stack direction={"row"} spacing={6}>
            <Link href={"#"}>Inicio</Link>
            <Link href={"/sign-in?type=borrower"}>Solicitar</Link>
            <Link href={"/sign-in?type=lender"}>Invertir</Link>
            <Link href={"mailto:tech@wepresto.com"}>Contacto</Link>
          </Stack>
        </Container>

        <Box
          borderTopWidth={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
          >
            <Text>© 2023 WePresto. Derechos reservados.</Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton
                label={"Instagram"}
                href={"https://instagram.com/wepresto"}
              >
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
}
