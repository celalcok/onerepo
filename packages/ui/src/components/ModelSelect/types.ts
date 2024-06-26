import { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'
import { WSelectProps } from '../WSelect/types'
import { StrapiCollectionEndpoint } from '@fc/types'

type ModelSelectBaseProps = Omit<WSelectProps<FieldValues>, 'options'> & {
  control: Control
  tooltip?: string
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export type ModelDynamicSelectProps = ModelSelectBaseProps & {
  endpoint: StrapiCollectionEndpoint
  populate?: string | string[]
}

export type ModelStaticSelectProps = ModelSelectBaseProps & {
  options: string[]
}

export type ModelSelectProps = ModelDynamicSelectProps | ModelStaticSelectProps

export type Option = { value: string | number; label: string }
