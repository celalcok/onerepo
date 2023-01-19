import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  Textarea,
  useBoolean,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Mention, Post, TimelineTweet } from '@wsvvrijheid/types'
import { useForm } from 'react-hook-form'
import { FiArrowUpRight } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'
import stringSimilarity from 'string-similarity'
import * as yup from 'yup'

import { CreateTweetFormProps } from './types'
import { ModelCreateModal, TweetText } from '../../admin'
import { ModelSelect } from '../../admin/ModelForm/ModelSelect'
import { postFields, postSchema } from '../../data'
import { useFileFromUrl } from '../../hooks'
import { FormItem } from '../FormItem'

const schema = yup.object({
  text: yup.string().required('Title is required'),
  media: yup.mixed(),
  mentions: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
  ),
})

type FormFieldValues = yup.InferType<typeof schema>

export const CreateTweetForm: React.FC<CreateTweetFormProps> = ({
  onSubmit,
  isOpen,
  onClose,
  originalTweet,
  isNews,
}) => {
  const TWEET_LENGTH = 280
  const SIMILARITY_LIMIT = 60

  const [isChangingImage, setIsChangingImage] = useBoolean(false)
  const [similarity, setSimilarity] = useState(0)

  const imageFile = useFileFromUrl(originalTweet?.media?.url)

  if (isNews) {
    originalTweet = { text: originalTweet.text } as TimelineTweet
  }
  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      text: '',
      mentions: [],
    },
  })

  const [text] = watch(['text'])

  useEffect(() => {
    if (imageFile) {
      setValue('media', imageFile)
    }
  }, [imageFile, setValue])

  const newPost = {
    description: text,
    content: text,
    image: { url: originalTweet?.media?.url },
  } as Post

  useEffect(() => {
    const similarity =
      stringSimilarity.compareTwoStrings(
        text.toLowerCase(),
        originalTweet.text.toLowerCase(),
      ) * 100
    setSimilarity(similarity)
  }, [text, originalTweet.text, setValue])

  const onSubmitHandler = async (data: FormFieldValues) => {
    const mentions = data.mentions?.map(mention => mention.value) || []

    await onSubmit?.(
      data?.text,
      originalTweet,
      mentions as unknown as number[],
      data.media,
    )
    reset()
  }

  const closeModal = () => {
    reset()
    onClose()
  }

  return (
    <Box>
      <Modal
        size="4xl"
        onClose={closeModal}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent p={{ base: 2, lg: 4 }}>
          <ModalCloseButton />
          <ModalHeader>
            <Text color={'primary.500'} fontWeight={'bold'} w={'full'}>
              Create Tweet
            </Text>
          </ModalHeader>
          <ModalBody>
            <Stack
              spacing={4}
              as="form"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <Stack>
                <FormLabel fontWeight={600}>Original Tweet</FormLabel>
                <TweetText
                  isVertical={false}
                  tweet={originalTweet}
                  isChangingImage={isChangingImage}
                  setIsChangingImage={setIsChangingImage}
                  setValue={setValue}
                />
                <FormItem<FormFieldValues>
                  as={Textarea}
                  name="text"
                  label="New Tweet"
                  register={register}
                  errors={errors}
                  isRequired
                />

                <ModelSelect<Mention>
                  isMulti
                  url="api/mentions"
                  control={control as any}
                  fields={['username', 'data']}
                  name="mentions"
                  label="Mention"
                  errors={errors}
                />
                {/* TODO 
                ADD HASHTAG
                */}
                {/* plagiarism ................*/}
                <Stack>
                  <HStack>
                    <Text fontSize="md" fontWeight={600}>
                      Plagiarism
                    </Text>
                    <Text
                      color={text?.length >= TWEET_LENGTH ? 'red' : 'black'}
                    >
                      {text?.length}/280
                    </Text>
                  </HStack>

                  <Progress
                    colorScheme={
                      similarity > SIMILARITY_LIMIT ? 'red' : 'green'
                    }
                    size="lg"
                    value={similarity}
                  />
                  <Text fontSize="xs" color={'gray.500'} w={'full'}>
                    *The Lower is better
                  </Text>
                </Stack>
              </Stack>
              <ButtonGroup alignSelf="end">
                <Button
                  bg={'transparent'}
                  mr={3}
                  leftIcon={<GrFormClose />}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="primary"
                  leftIcon={<FiArrowUpRight />}
                  disabled={similarity > SIMILARITY_LIMIT}
                >
                  Recommend
                </Button>
                <ModelCreateModal<Post>
                  title="Create Post"
                  url="api/posts"
                  schema={postSchema}
                  fields={postFields}
                  model={newPost}
                >
                  Create Post
                </ModelCreateModal>
              </ButtonGroup>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
