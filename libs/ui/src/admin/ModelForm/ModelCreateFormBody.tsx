import {
  AspectRatio,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Textarea,
  useBoolean,
} from '@chakra-ui/react'
import { capitalize } from 'lodash'

import { Post, StrapiModel, StrapiUrl } from '@wsvvrijheid/types'

import { ModelImage } from './ModelImage'
import { ModelSelect } from './ModelSelect'
import { ModelCreateFormBodyProps } from './types'
import { FormItem, MdFormItem } from '../../components'

export const ModelCreateFormBody = <T extends StrapiModel>({
  fields,
  activeOption,
  formProps,
  model,
}: ModelCreateFormBodyProps<T>) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    control,
  } = formProps

  const disabledStyle = {
    borderColor: 'transparent',
    _hover: { borderColor: 'transparent' },
    color: 'gray.500',
  }
  const postModel = model as unknown as Post
  const [isChangingImage, setIsChangingImage] = useBoolean(
    postModel?.image ? false : true,
  )

  return (
    <>
      {fields.map((field, index) => {
        const label = field.label || capitalize(field.name as string)
        const isActive =
          !activeOption || !field.group || field?.group?.value === activeOption
        const videoUrl = watch(field.name as string)

        const getVideoUrl = () => {
          if (!videoUrl) {
            return
          }
          const videoLink = videoUrl.split('/')
          const videoId = videoLink[3]
          const newVideoUrl = `https://www.youtube.com/embed/${videoId}`

          return newVideoUrl
        }

        if (field.type === 'mediaUrl') {
          return (
            <Box key={index} {...(!isActive && { display: 'none' })}>
              <FormItem
                key={index}
                name={field.name as string}
                label={label}
                errors={errors}
                register={register}
                _disabled={disabledStyle}
              />

              <Box mt={5}>
                {getVideoUrl() && (
                  <AspectRatio maxW="560px" ratio={1}>
                    <iframe src={getVideoUrl()} title="video" allowFullScreen />
                  </AspectRatio>
                )}
              </Box>
            </Box>
          )
        }

        if (field.type === 'file') {
          return (
            <FormControl
              isInvalid={Boolean(errors?.[field.name])}
              key={index}
              isRequired={field.isRequired}
              zIndex={0}
              {...(!isActive && { display: 'none' })}
            >
              <FormLabel>{label}</FormLabel>
              <ModelImage
                isEditing={!!postModel?.video?.url}
                model={model as T}
                setValue={setValue}
                name={field.name as string}
                isChangingImage={isChangingImage}
                setIsChangingImage={setIsChangingImage}
              />
              <FormErrorMessage>
                {errors?.[field.name]?.message as string}
              </FormErrorMessage>
            </FormControl>
          )
        }

        if (field.type === 'select') {
          return (
            <ModelSelect
              key={index}
              url={field.url as StrapiUrl}
              isMulti={field.isMulti}
              isRequired={field.isRequired}
              name={field.name as string}
              label={label}
              errors={errors}
              control={control}
              zIndex={1}
              {...(!isActive && { display: 'none' })}
            />
          )
        }

        if (field.type === 'markdown') {
          return (
            <MdFormItem
              key={index}
              name={field.name as string}
              label={label}
              isRequired={field.isRequired}
              errors={errors}
              control={control}
              _disabled={disabledStyle}
              {...(!isActive && { display: 'none' })}
            />
          )
        }

        if (field.type === 'number-input') {
          return (
            <Flex
              align={'center'}
              mb={1}
              {...(!isActive && { display: 'none' })}
            >
              <FormControl>
                <FormLabel mb={0} fontSize="sm" fontWeight={600}>
                  {label}
                </FormLabel>
                <NumberInput
                  maxW={120}
                  onChange={value => setValue(field.name as string, value)}
                  size="lg"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <FormErrorMessage>
                  {errors[field?.name as string]?.message as string}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          )
        }
        if (field.type === 'boolean') {
          return (
            <FormControl
              key={index}
              isRequired={field.isRequired}
              {...(!isActive && { display: 'none' })}
            >
              <FormLabel fontWeight={600} fontSize={'sm'}>
                {label}
              </FormLabel>
              <Switch
                colorScheme={'primary'}
                size={'lg'}
                onChange={e => {
                  setValue(field.name as string, e.target.checked)
                }}
              />

              <FormErrorMessage>
                {errors[field.name as string]?.message as string}
              </FormErrorMessage>
            </FormControl>
          )
        }
        const inputType =
          field.type === 'date'
            ? 'date'
            : field.type === 'datetime-local'
            ? 'datetime-local'
            : 'text'

        return (
          <FormItem
            {...(field.type === 'textarea' && { as: Textarea })}
            key={index}
            name={field.name as string}
            type={inputType}
            label={label}
            isRequired={field.isRequired}
            errors={errors}
            register={register}
            _disabled={disabledStyle}
            {...(!isActive && { display: 'none' })}
          />
        )
      })}
    </>
  )
}
