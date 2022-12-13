import { FC, useRef, useState } from 'react'

import {
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useCreateMainHashtag, useGetMentions } from '@wsvvrijheid/services'
import { HashtagCreateInput, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { IoMdAdd, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import * as yup from 'yup'

import { FilePicker, FormItem, WSelect } from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'
import {
  CreateMainHashtagFormFieldValues,
  CreateMainHashtagModalProps,
} from './types'

export const CreateMainHashtagModal: FC<CreateMainHashtagModalProps> = ({
  queryKey,
  showEditModal,
}) => {
  const [images, setImages] = useState<File[]>([])
  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()

  const { locale } = useRouter()

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    hashtag: yup.string().required('Hashtag is required'),
    hashtagExtra: yup.string(),
    mention: yup.string(),
  })

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm<CreateMainHashtagFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  useFormPersist(`create-main-hashtag-${locale}`, {
    watch,
    setValue,
    ...(typeof window !== 'undefined' && { storage: window.sessionStorage }),
  })

  const { mutate, isLoading } = useCreateMainHashtag(queryKey)
  const toast = useToast()
  const currentMentions = useGetMentions()

  const createMainHashtag = async (
    data: CreateMainHashtagFormFieldValues & { image: File },
  ) => {
    const slug = slugify(data.title)
    const mentions = data.mentions?.map(mention => Number(mention.value)) || []

    const formBody: HashtagCreateInput = {
      ...data,
      slug,
      locale: locale as StrapiLocale,
      publishedAt: null,
      mentions,
    }

    mutate(formBody, {
      onSuccess: async newHashtag => {
        formDisclosure.onClose()
        resetForm()
        resetFileUploader()
      },
      onError: error => {
        toast({
          title: 'Error',
          description: `Something went wrong ${
            (error as any)?.response?.data.error.message
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
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
        closeOnOverlayClick={false}
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
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={8}
              as="form"
              onSubmit={handleSubmit(handleCreateMainHashtag)}
            >
              <Stack flex={1} spacing={4}>
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
                  <FormControl isRequired>
                    <FormLabel>Locale</FormLabel>
                    <LanguageSwitcher />
                  </FormControl>

                  <FormItem
                    isRequired
                    label="Date"
                    register={register}
                    errors={errors}
                    name="date"
                    type="datetime-local"
                  />
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
                    name="hashtagExtra"
                    label="Extra hashtag"
                    errors={errors}
                    register={register}
                  />
                </HStack>
              </Stack>
              <Stack flex={1} spacing={4}>
                <WSelect
                  isMulti
                  name="mentions"
                  label="Mentions"
                  control={control}
                  errors={errors}
                  options={
                    currentMentions?.data?.map(c => ({
                      value: `${c.id}`,
                      label: `@${c.username}`,
                    })) || []
                  }
                />

                <FilePicker setFiles={setImages} />

                <Spacer />

                <ButtonGroup alignSelf="end">
                  <Button
                    type="submit"
                    colorScheme="primary"
                    leftIcon={<IoMdCheckmark />}
                  >
                    Save
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
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}