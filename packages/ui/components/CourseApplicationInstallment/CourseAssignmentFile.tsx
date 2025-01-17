import { FC } from 'react'

import { Button } from '@chakra-ui/react'
import {
  AiOutlineFilePdf,
  AiOutlineFileZip,
  AiOutlineFileWord,
} from 'react-icons/ai'
import { FaFile, FaImage } from 'react-icons/fa6'

import { ASSETS_FALLBACK_URL, ASSETS_URL } from '@fc/config/constants'
import { UploadFile } from '@fc/types'

export const CourseAssignmentFileButton: FC<{ file: UploadFile }> = ({
  file,
}) => {
  const fileExtension = (file.name ?? '').split('.').pop()?.toLowerCase()
  const fileName =
    file.name?.length > 20
      ? `${file.name.slice(0, 17)}...`
      : (file.name ?? 'unnamed')
  const icon =
    fileExtension === 'pdf' ? (
      <AiOutlineFilePdf />
    ) : fileExtension === 'zip' || fileExtension === 'rar' ? (
      <AiOutlineFileZip />
    ) : fileExtension === 'doc' || fileExtension === 'docx' ? (
      <AiOutlineFileWord />
    ) : file.mime?.startsWith('image/') ? (
      <FaImage />
    ) : (
      <FaFile />
    )

  return (
    <Button
      as="a"
      href={
        (process.env.NODE_ENV === 'development'
          ? ASSETS_FALLBACK_URL
          : ASSETS_URL) + file.url
      }
      target="_blank"
      variant="outline"
      rel="noreferrer noopener"
      leftIcon={icon}
      title={file.name}
    >
      {fileName}
    </Button>
  )
}
