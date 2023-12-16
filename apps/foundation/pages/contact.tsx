import {
  Box,
  Button,
  Divider,
  Heading,
  Link,
  SimpleGrid,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { GetStaticPropsContext } from 'next'
import { NextSeoProps } from 'next-seo'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'

import { EMAIL_SENDER, socialLinks } from '@wsvvrijheid/config'
import { PUBLIC_TOKEN } from '@wsvvrijheid/config'
import { strapiRequest } from '@wsvvrijheid/lib'
import { sendEmail } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { EmailCreateInput, Foundation, StrapiLocale } from '@wsvvrijheid/types'
import {
  ContactForm,
  ContactFormFieldValues,
  Container,
  SocialButtons,
} from '@wsvvrijheid/ui'

import { Layout } from '../components'

interface ContactProps {
  seo: NextSeoProps
  foundations: Foundation | []
}

const Contact = ({ seo, foundations }: ContactProps): JSX.Element => {
  console.log('in contact', foundations?.data)

  const newFoundation = foundations?.data || []
  const {
    isError,
    isPending,
    isSuccess,
    mutate: sendForm,
  } = useMutation({
    mutationKey: ['contact'],
    mutationFn: async (data: EmailCreateInput) => {
      return sendEmail(data, PUBLIC_TOKEN as string)
    },
  })

  const handleSubmit = async (data: ContactFormFieldValues) => {
    const emailData = {
      subject: `Form from ${data.fullname} (${data.email})`,
      text: data.message,
      from: EMAIL_SENDER,
    }

    return sendForm(emailData)
  }

  return (
    <Layout seo={seo}>
      <Box minH="inherit" fontWeight={500}>
        <Container minH="inherit">
          <SimpleGrid
            my={{ base: 8, lg: 0 }}
            gap={8}
            alignContent="center"
            columns={{ base: 1, lg: 2 }}
            minH="inherit"
          >
            <VStack
              bgGradient={'linear(to-b, primary.400, primary.500)'}
              color="primary.50"
              borderRadius="lg"
              p={{ base: 8, lg: 12 }}
              textAlign="center"
              justify="space-evenly"
              spacing={8}
            >
              <Heading fontWeight={900} as="h2" size="lg" color="primary.50">
                STICHTING <br /> WEES DE STEM VOOR VRIJHEID
              </Heading>
              <Divider borderColor="whiteAlpha.400" />

              {newFoundation?.map(foundation => {
                return (
                  <Wrap spacing={4} justify="center" key={foundation?.id}>
                    <Button
                      as={Link}
                      isExternal
                      variant="link"
                      color="primary.50"
                      _hover={{ color: 'primary.100' }}
                      leftIcon={
                        <Box as={MdPhone} color="primary.50" size="20px" />
                      }
                      href={`tel:${foundation?.contact?.phone}`}
                    >
                      {foundation?.contact?.phone}
                    </Button>

                    <Button
                      as={Link}
                      isExternal
                      variant="link"
                      color="primary.50"
                      _hover={{ color: 'primary.50' }}
                      leftIcon={
                        <Box as={MdEmail} color="primary.100" size="20px" />
                      }
                      href={`mailto:${foundation?.contact?.email}`}
                    >
                      {foundation?.contact?.email}
                    </Button>
                    <Button
                      as={Link}
                      isExternal
                      variant="link"
                      color="primary.50"
                      _hover={{ color: 'primary.100' }}
                      leftIcon={
                        <Box as={MdLocationOn} color="primary.50" size="20px" />
                      }
                      href="https://goo.gl/maps/E9HaayQnXmphUWtN8"
                      textAlign="left"
                    >
                      {foundation?.contact?.address}
                    </Button>
                  </Wrap>
                )
              })}

              <SocialButtons items={socialLinks.wsvvrijheid} />
            </VStack>
            <ContactForm
              onSubmitHandler={handleSubmit}
              isLoading={isPending}
              isSuccess={isSuccess}
              isError={isError}
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const foundations = await strapiRequest<Foundation>({
    endpoint: 'foundations',
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      foundations,
    },
  }
}

export default Contact
