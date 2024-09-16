import { APIRequestContext } from '@playwright/test'
import axios, { AxiosRequestConfig } from 'axios'

import {
  StrapiCreateInput,
  StrapiEndpoint,
  StrapiLocale,
  StrapiModel,
  StrapiMutationResponse,
  StrapiUpdateInput,
} from '@fc/types'

import { API_URL, endpointsWithoutDataField } from '../urls'
import { generateFormData } from '../utils'

type Method = 'post' | 'put' | 'delete' | 'localize'

type MutationBody =
  | StrapiCreateInput
  | StrapiUpdateInput
  | { data: StrapiCreateInput | StrapiUpdateInput }
  | FormData

type MutationParams<D> = {
  body?: D
  id?: number
  locale?: StrapiLocale
  method: Method
  token: string
  endpoint: StrapiEndpoint
  queryParameters?: string
}

// T is the type of the model to be returned
// D is the type of the data to be sent
export const mutation = async <
  T extends StrapiModel,
  D extends StrapiCreateInput | StrapiUpdateInput = StrapiCreateInput,
>(
  {
    body,
    id,
    locale,
    method,
    token,
    endpoint,
    queryParameters,
  }: MutationParams<D>,
  fetcher?: APIRequestContext,
) => {
  let status: number
  let statusText: string
  let hasBodyFile = false
  const URL = fetcher
    ? process.env.CI === 'true'
      ? API_URL
      : 'http://localhost:1337'
    : API_URL

  //  Throw an error if the id is not provided
  if (method !== 'post' && !id) {
    throw new Error(`Id is required for ${method} method`)
  }

  const config: AxiosRequestConfig<D> = {
    baseURL: `${API_URL}/api`,
    ...(token && {
      headers: { Authorization: `Bearer ${token}` },
    }),
  }

  if (method === 'localize') {
    const url = `${endpoint}/${id}/localizations`

    if (fetcher) {
      const response = await fetcher.post(`${URL}/api/${url}`, {
        data: JSON.stringify({ ...body, locale }),
        ...(token && {
          headers: { Authorization: `Bearer ${token}` },
        }),
      })

      status = response.status()
      statusText = response.statusText()

      const data = await response.json()

      return { ...data, status, statusText } as StrapiMutationResponse<T>
    }

    // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
    const response = await axios.post<T>(
      url,
      { ...body, locale }, // TODO localization body doesn't seem to have data key. Double check this
      config,
    )

    status = response.status
    statusText = response.statusText

    return {
      ...response.data,
      status,
      statusText,
    } as unknown as StrapiMutationResponse<T>
  }

  const queryParams = queryParameters ? `?${queryParameters}` : ''

  const requestUrl = id
    ? `${endpoint}/${id}${queryParams}`
    : `${endpoint}${queryParams}`

  if (method === 'delete') {
    if (fetcher) {
      const response = await fetcher.delete(`${URL}/api/${requestUrl}`, {
        ...(token && {
          headers: { Authorization: `Bearer ${token}` },
        }),
      })

      status = response.status()
      statusText = response.statusText()

      const data = await response.json()

      return { ...data, status, statusText } as StrapiMutationResponse<T>
    }

    const response = await axios[method]<StrapiMutationResponse<T>>(
      requestUrl,
      config,
    )

    status = response.status
    statusText = response.statusText

    return { ...response.data, status, statusText } as StrapiMutationResponse<T>
  }

  //  Throw an error if the body is not provided
  if (!body) {
    throw new Error(`Body is required for ${method} method`)
  }

  const hasBodyDataField = !endpointsWithoutDataField.includes(endpoint)

  Object.entries(body).forEach(([key, value]) => {
    if (value instanceof Date) {
      const utcDate = new Date(
        value.getTime() - value.getTimezoneOffset() * 60000,
      ).toISOString()
      ;(body as any)[key] = utcDate
    }
  })

  let requestBody: MutationBody = hasBodyDataField
    ? ({ data: body } as { data: D })
    : body

  if (typeof window !== 'undefined') {
    hasBodyFile = Object.values(body).some(
      // This might not work in Node.js environments. File is Web API only
      value =>
        value instanceof File ||
        value instanceof Blob ||
        value?.some?.(
          (v: File | Blob) => v instanceof File || v instanceof Blob,
        ),
    )

    if (hasBodyFile) {
      requestBody = generateFormData<D>(body, hasBodyDataField, endpoint)
    }
  }

  try {
    if (fetcher) {
      console.info(`Test Request: ${URL}/api/${requestUrl}`)

      const response = await fetcher[method](`${URL}/api/${requestUrl}`, {
        data: requestBody,
        ...(token && {
          headers: { Authorization: `Bearer ${token}` },
        }),
      })

      status = response.status()
      statusText = response.statusText()

      const data = await response.json()

      return { ...data, status, statusText } as StrapiMutationResponse<T>
    }

    const response = await axios[method]<StrapiMutationResponse<T>>(
      requestUrl,
      requestBody,
      config,
    )

    return {
      ...response.data,
      status: 200,
      statusText: 'OK',
    } as StrapiMutationResponse<T>
  } catch (error: any) {
    console.error('Mutation error', error)

    // i dont know why but this way onError has first parameter
    if (error.response?.data?.error?.details?.i18nKey) {
      throw error.response?.data?.error?.details?.i18nKey
    }

    // but this way, mutate.onError doesn't have first parameter
    throw new Error(error.response?.data?.message || error.message)
  }
}
