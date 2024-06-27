import { FC } from 'react'

import { Icon, IconProps } from '@chakra-ui/react'

import { StrapiLocale } from '@fc/types'

const Tr: FC<IconProps> = props => {
  return (
    <Icon viewBox="0 0 32 32" {...props}>
      <path
        d="M16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31Z"
        fill="#ED4C5C"
      />
      <path
        d="M20.65 19.5L20.7 16.8L18 16L20.7 15.2L20.65 12.5L22.3 14.65L25 13.85L23.35 16L25 18.15L22.3 17.35L20.65 19.5Z"
        fill="white"
      />
      <path
        d="M16.6 22C13.3 22 10.65 19.3 10.65 16C10.65 12.7 13.3 10 16.6 10C17.85 10 19 10.4 20 11.05C18.65 9.5 16.65 8.5 14.4 8.5C10.3 8.5 7 11.85 7 16C7 20.15 10.3 23.5 14.4 23.5C16.65 23.5 18.65 22.5 20 20.95C19.05 21.6 17.9 22 16.6 22Z"
        fill="white"
      />
    </Icon>
  )
}

const Nl: FC<IconProps> = props => {
  return (
    <Icon viewBox="0 0 32 32" {...props}>
      <path
        d="M16.0001 1C9.4501 1 3.9001 5.15 1.8501 11H30.1501C28.1001 5.15 22.5501 1 16.0001 1Z"
        fill="#ED4C5C"
      />
      <path
        d="M16.0001 31C22.5501 31 28.1001 26.85 30.1501 21H1.8501C3.9001 26.85 9.4501 31 16.0001 31Z"
        fill="#428BC1"
      />
      <path
        d="M1.85 11C1.3 12.55 1 14.25 1 16C1 17.75 1.3 19.45 1.85 21H30.15C30.7 19.45 31 17.75 31 16C31 14.25 30.7 12.55 30.15 11H1.85Z"
        fill="white"
      />
    </Icon>
  )
}

const En: FC<IconProps> = props => {
  return (
    <Icon viewBox="0 0 32 32" {...props}>
      <path
        d="M11.0001 30.15V23.25L5.8501 27.05C7.3001 28.4 9.0501 29.45 11.0001 30.15M21.0001 30.15C22.9501 29.45 24.7001 28.4 26.1501 27.05L21.0001 23.2V30.15M1.8501 21C2.0001 21.5 2.2001 21.95 2.4501 22.45L4.4001 21H1.8501ZM27.6001 21L29.5501 22.45C29.7501 22 29.9501 21.5 30.1501 21H27.6001Z"
        fill="#2A5F9E"
      />
      <path
        d="M11.7498 19H1.2998C1.4498 19.7 1.6498 20.35 1.8498 21H4.3998L2.4498 22.45C2.8498 23.3 3.2998 24.05 3.8498 24.8L8.9998 21H10.9998V22L5.1498 26.3L5.8498 27L10.9998 23.25V30.15C11.6498 30.4 12.2998 30.55 12.9998 30.7V19H11.7498ZM30.6998 19H18.9998V30.7C19.6998 30.55 20.3498 30.35 20.9998 30.15V23.25L26.1498 27C26.8498 26.35 27.4498 25.65 28.0498 24.9L22.6998 21H26.0998L29.1498 23.25C29.2998 23 29.4498 22.7 29.5498 22.45L27.5998 21H30.1498C30.3498 20.35 30.5498 19.7 30.6998 19"
        fill="white"
      />
      <path
        d="M3.8501 24.8C4.2501 25.35 4.6501 25.85 5.1001 26.35L11.0001 22.05V21.05H9.0001L3.8501 24.8ZM22.7501 21L28.1001 24.9C28.3001 24.65 28.4501 24.4 28.6501 24.15C28.7001 24.1 28.7001 24.05 28.7501 24.05C28.9001 23.8 29.1001 23.5 29.2501 23.25L26.1001 21H22.7501Z"
        fill="#ED4C5C"
      />
      <path
        d="M21.0001 1.8501V8.7501L26.1501 4.9501C24.7001 3.6001 22.9501 2.5501 21.0001 1.8501ZM11.0001 1.8501C9.0501 2.5501 7.3001 3.6001 5.8501 4.9501L11.0001 8.8001V1.8501ZM30.1501 11.0001C30.0001 10.5001 29.8001 10.0501 29.5501 9.5501L27.6001 11.0001H30.1501M4.4001 11.0001L2.4501 9.5501C2.2501 10.0501 2.0501 10.5001 1.8501 11.0001H4.4001Z"
        fill="#2A5F9E"
      />
      <path
        d="M20.2498 12.9998H30.6498C30.4998 12.2998 30.2998 11.6498 30.0998 10.9998H27.5498L29.4998 9.5498C29.0998 8.6998 28.6498 7.9498 28.0998 7.1998L22.9998 10.9998H20.9998V9.9998L26.8498 5.6998L26.1498 4.9998L20.9998 8.7498V1.8498C20.3498 1.5998 19.6998 1.4498 18.9998 1.2998V12.9998H20.2498ZM1.2998 12.9998H12.9998V1.2998C12.2998 1.4498 11.6498 1.6498 10.9998 1.8498V8.7498L5.8498 4.9998C5.1498 5.6498 4.5498 6.3498 3.9498 7.0998L9.2998 10.9998H5.89981L2.8498 8.7498C2.6998 8.9998 2.5498 9.2998 2.4498 9.5498L4.3998 10.9998H1.8498C1.6498 11.6498 1.4498 12.2998 1.2998 12.9998Z"
        fill="white"
      />
      <path
        d="M28.1498 7.1999C27.7498 6.6499 27.3498 6.1499 26.8998 5.6499L20.9998 9.9499V10.9499H22.9998L28.1498 7.1999M9.2498 10.9999L3.9498 7.0999C3.7498 7.3499 3.5998 7.5999 3.3998 7.8499C3.3498 7.8999 3.3498 7.9499 3.2998 7.9499C3.1498 8.1999 2.9498 8.4999 2.7998 8.7499L5.8498 10.9999H9.2498Z"
        fill="#ED4C5C"
      />
      <path
        d="M30.7 13H19V1.3C18.05 1.1 17.05 1 16 1C14.95 1 13.95 1.1 13 1.3V13H1.3C1.1 13.95 1 14.95 1 16C1 17.05 1.1 18.05 1.3 19H13V30.7C13.95 30.9 14.95 31 16 31C17.05 31 18.05 30.9 19 30.7V19H30.7C30.9 18.05 31 17.05 31 16C31 14.95 30.9 13.95 30.7 13Z"
        fill="#ED4C5C"
      />
    </Icon>
  )
}

export const Flag: FC<{ locale: StrapiLocale } & IconProps> = ({
  locale,
  ...props
}) => {
  if (locale === 'tr') {
    return <Tr {...props} />
  }

  if (locale === 'nl') {
    return <Nl {...props} />
  }

  return <En {...props} />
}
