import { ComponentProps } from 'react'

import { Box, BoxProps, forwardRef } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import MdEditor from 'react-markdown-editor-lite'

const hiddenButtons = [
  'underline',
  'strikethrough',
  'wrap',
  'code-inline',
  'code-block',
  'table',
  'clear',
]

const hiddenButtonClasses = hiddenButtons
  .map(type => `.button-type-${type}`)
  .join(', ')

type MarkdownEditorProps = BoxProps & ComponentProps<typeof MdEditor>

const MarkdownEditor = forwardRef<MarkdownEditorProps, any>((props, ref) => {
  const disabledStyles = props.isDisabled
    ? {
        '.rc-md-navigation': { display: 'none' },
        '.sec-md': { display: 'none' },
        '.sec-html': { border: 'none' },
        '.section-container': { p: '0 !important' },
        '.custom-html-style': {
          color: 'gray.500',
          '& p': { fontSize: 'md', m: 0 },
        },
        borderColor: 'transparent',
        _hover: { borderColor: 'transparent' },
        color: 'gray.500',
        userSelect: 'none',
      }
    : {}

  return (
    <Box
      sx={{
        '.rc-md-editor': {
          ...disabledStyles,
          '&.full': {
            zIndex: 'modal',
          },
          bg: '#f5f5f5',
          [hiddenButtonClasses]: {
            display: 'none !important',
          },
        },
      }}
      flex={1}
    >
      <Box
        ref={ref}
        as={MdEditor}
        h={'full'}
        renderHTML={(text: string) => <ReactMarkdown children={text} />}
        {...props}
      />
    </Box>
  )
})

export default MarkdownEditor
