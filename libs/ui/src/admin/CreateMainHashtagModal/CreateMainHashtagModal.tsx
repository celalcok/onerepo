import { FC, useRef, useState } from 'react'

import {
  Button,
  ButtonGroup,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  HStack,
  Textarea,
  useDisclosure,
  Text,
  useToast,
  Input,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { getTranslation, useCreateMainHashtag } from '@wsvvrijheid/services'
import { HashtagCreateInput, StrapiLocale } from '@wsvvrijheid/types'
import { useForm } from 'react-hook-form'
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import * as yup from 'yup'

import { FormItem, FilePicker } from '../../components'
import { MentionListItem } from '../../post-maker/Mention'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { CreateMainHashtagSuccessAlert } from './CreateMainHashtagSuccessAlert'
import {
  CreateMainHashtagFormFieldValues,
  CreateMainHashtagModalProps,
  //   Mention,
} from './types'
const schema = () =>
  yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    hashtag: yup.string().required('Hashtag is required'),
    extrahashtag: yup.string(),
    mention: yup.string(),
  })

export const CreateMainHashtagModal: FC<CreateMainHashtagModalProps> = ({
  queryKey,
  mentions,
}) => {
  const [images, setImages] = useState<Blob[]>([])
  //const [mention, setMentions] = useState<Mention>([])
  console.log('mentions', mentions)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()

  const [locale, setLocale] = useState<StrapiLocale>('en')

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateMainHashtagFormFieldValues>({
    resolver: yupResolver(schema()),
    mode: 'all',
  })

  const { mutate, isLoading } = useCreateMainHashtag(locale, queryKey)
  const [date, setDate] = useState<string>('')
  const toast = useToast()
  const createMainHashtag = async (
    data: CreateMainHashtagFormFieldValues & { image: Blob },
  ) => {
    const slug = slugify(data.title)
    const content = data?.content
    const hashtag = data?.hashtag

    const formBody: HashtagCreateInput & CreateMainHashtagFormFieldValues = {
      ...data,
      slug,
      locale,
      publishedAt: null,
      content,
      date,
      hashtag,
    }

    mutate(formBody, {
      onSuccess: () => {
        formDisclosure.onClose()
        successDisclosure.onOpen()
        resetForm()
        resetFileUploader()
        const translateData = getTranslationEntry(
          data.title,
          data.description,
          data.content,
          locale,
        )
        console.log('translateData', translateData)
      },
      onError: error => {
        toast({
          title: 'Error',
          description: `Something went wrong ${error?.response?.data.error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
    const translateData = await getTranslationEntry(
      data.title,
      data.description,
      data.content,
      locale,
    )
    console.log('translateData', translateData.contentTranslate)
  }
  const handleCreateMainHashtag = async (
    data: CreateMainHashtagFormFieldValues,
  ) => {
    createMainHashtag({ ...data, image: images[0] })
  }

  const resetFileUploader = () => {
    setImages([])
  }

  const closeForm = () => {
    resetFileUploader()
    resetForm()
    formDisclosure.onClose()
  }

  return (
    <>
      {/* SUCCESS ALERT */}
      <CreateMainHashtagSuccessAlert
        isOpen={successDisclosure.isOpen}
        onClose={successDisclosure.onClose}
        ref={cancelRef}
      />

      <Button
        leftIcon={<IoMdAdd />}
        colorScheme="primary"
        onClick={formDisclosure.onOpen}
        my={3}
      >
        Create Main Hashtag
      </Button>

      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={formDisclosure.isOpen}
        onClose={closeForm}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={'primary.500'}>Create Main Hashtag</ModalHeader>
          <ModalCloseButton />
          <ModalBody pos="relative" py={6}>
            {/* LOADING */}
            {isLoading && (
              <Center
                zIndex={1}
                pos="absolute"
                top={0}
                left={0}
                boxSize="full"
                bg="whiteAlpha.900"
              >
                <Spinner size="xl" colorScheme="blue" />
              </Center>
            )}

            {/* CREATE FORM */}
            <HStack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(handleCreateMainHashtag)}
            >
              <Stack>
                <FormItem
                  name="title"
                  label="Title"
                  isRequired
                  errors={errors}
                  register={register}
                />
                <FormItem
                  name="description"
                  label="Description"
                  as={Textarea}
                  isRequired
                  errors={errors}
                  register={register}
                />
                <FormItem
                  name="content"
                  label="Content"
                  as={Textarea}
                  isRequired
                  errors={errors}
                  register={register}
                />
                <HStack>
                  <Stack>
                    <Text
                      aria-required
                      mb={1}
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Locale
                    </Text>
                    <LanguageSwitcher
                      defaultLocale={locale as StrapiLocale}
                      onLanguageSwitch={setLocale}
                    />
                  </Stack>
                  <Stack>
                    <Text
                      aria-required
                      mb={1}
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Date
                    </Text>
                    <Input
                      placeholder="Select Date and Time"
                      size="md"
                      type="datetime-local"
                      onChange={event => setDate(event.target.value)}
                    />
                  </Stack>
                </HStack>
                <HStack>
                  <FormItem
                    name="hashtag"
                    label="Hashtag"
                    isRequired
                    errors={errors}
                    register={register}
                  />
                  <FormItem
                    name="extra hashtag"
                    label="Extra hashtag"
                    errors={errors}
                    register={register}
                  />
                </HStack>
              </Stack>
              <Stack>
                <Stack>
                  <FilePicker setFiles={setImages} />
                </Stack>
                <Stack>
                  <FormItem
                    name="mentions"
                    label="Mentions"
                    isRequired
                    errors={errors}
                    register={register}
                  />
                </Stack>
                {/*Mentions mention list should be here */}
                <MentionListItem
                  data={mentions.data}
                  onAddItem={''}
                  onRemoveItem={''}
                />
                {/*================ */}
                <ButtonGroup alignSelf="end">
                  <Button
                    type="submit"
                    colorScheme="primary"
                    leftIcon={<IoMdCheckmark />}
                  >
                    save
                  </Button>
                  <Button
                    // isDisabled={!images || images.length === 0 || !isValid}
                    onClick={'Publish'}
                    colorScheme="blue"
                    leftIcon={<IoMdCheckmark />}
                  >
                    Publish
                  </Button>
                  <Button
                    onClick={closeForm}
                    mr={3}
                    ref={cancelRef}
                    leftIcon={<IoMdClose />}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Stack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export const getTranslationEntry = async (
  title: string,
  description: string,
  content: string,
  locale: StrapiLocale,
) => {
  const responseTitle = await getTranslation(title, locale)
  const responseContent = await getTranslation(content, locale)
  const responseDescripton = await getTranslation(description, locale)
  const titleTranslate = responseTitle.text
  const contentTranslate = responseContent.text
  const descriptionTranslate = responseDescripton.text
  return { titleTranslate, contentTranslate, descriptionTranslate }
}
