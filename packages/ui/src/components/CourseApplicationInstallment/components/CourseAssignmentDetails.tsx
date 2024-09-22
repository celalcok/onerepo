import { FC, useRef, useState } from 'react'

import { Link, Stack, Wrap, Text, Button, HStack, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useToast, Badge } from '@chakra-ui/react'
import { addDays } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AiOutlineFilePdf, AiOutlineFileZip, AiOutlineFileWord } from 'react-icons/ai'
import { FaFile } from 'react-icons/fa6'

import { useUpdateModelMutation } from '@fc/services'
import { ApprovalStatus, UploadFile } from '@fc/types'
import { formatDate } from '@fc/utils'

import { KeyValue } from '../../KeyValueView'
import { CourseApplicationDetailsProps } from '../CourseApplicationDetails'


export const CourseAssignmentDetails: FC<CourseApplicationDetailsProps> = ({
  course,
  application,
  onSave = () => { },
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const cancelRef = useRef(null)
  const [isActionReject, setIsActionReject] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const updateModelMutation = useUpdateModelMutation('course-applications')
  const toast = useToast()


  const filesSent =
    !!application.submittedAssignmentFiles &&
    !!application.submittedAssignmentFiles.length

  if (!course.requireApproval) return null

  const onAction = () => {
    updateModelMutation.mutate(
      {
        id: application.id,
        approvalStatus: (isActionReject ? 'rejected' : 'approved') satisfies ApprovalStatus,
      },
      {
        onSuccess: () => {
          onSave()
        },
        onError: () => {
          toast({
            title: t('update-failed'),
            description: t('course.applicant.details.explain.action.reject'),
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        },
      },
    )
    setIsOpen(false)
  }

  const FileButton: FC<{ file: UploadFile }> = ({ file }) => {
    const fileExtension = (file.name ?? '').split('.').pop()?.toLowerCase();
    const fileName = file.name?.length > 20 ? `${file.name.slice(0, 17)}...` : file.name ?? 'unnamed';
    const icon =
      fileExtension === 'pdf'
        ? <AiOutlineFilePdf />
        : fileExtension === 'zip' || fileExtension === 'rar'
          ? <AiOutlineFileZip />
          : fileExtension === 'doc' || fileExtension === 'docx'
            ? <AiOutlineFileWord />
            : <FaFile />;

    return (
      <Button
        as="a"
        href={file.url}
        target="_blank"
        rel="noreferrer noopener"
        leftIcon={icon}
        title={file.name}
      >
        {fileName}
      </Button>
    );
  };

  return (
    <Stack spacing={2} borderWidth={1} borderRadius={'lg'} p={4}>
      <KeyValue tKey="course.applicant.details.assignment-files">
        {filesSent ? (
          <Wrap spacing={2}>
            {application?.submittedAssignmentFiles?.map(file => (
              <FileButton key={file.name} file={file} />
            ))}
          </Wrap>
        ) : (
          <Text>{t('course.applicant.details.assignment-files.not-yet')}</Text>
        )}
      </KeyValue>

      {application.approvalStatus === 'pending' ? <>
        <KeyValue
          when={filesSent}
          tKey="course.applicant.details.assignment-files.date"
        >
          {formatDate(application.lastUpdateDate ?? 0, 'dd MMMM yyyy', locale)}
        </KeyValue>

        <KeyValue
          when={!filesSent}
          tKey="course.applicant.details.assignment-files.due-date"
        >
          {formatDate(
            addDays(
              application.createdAt ?? 0,
              course.assignmentSubmissionDeadline ?? 3,
            ),
            'dd MMMM yyyy',
            locale,
          )}
        </KeyValue>

        <KeyValue
          when={filesSent}
          tKey="course.applicant.details.assignment-files.action"
        >
          <HStack spacing={2}>
            <Button
              colorScheme='green'
              onClick={() => { setIsActionReject(false); setIsOpen(true) }}
            >
              {t('approve')}
            </Button>
            <Button
              colorScheme='red'
              onClick={() => { setIsActionReject(true); setIsOpen(true) }}
            >
              {t('reject')}
            </Button>
          </HStack>
        </KeyValue>
      </> :
        <KeyValue title="Kullanıcı durumu">
          <Badge
            colorScheme='green'
            variant='outline'
          >
            {application.approvalStatus}
          </Badge>
        </KeyValue>}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t(isActionReject ? 'reject' : 'approve')}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t('course.applicant.details.explain.warn')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                {t('cancel')}
              </Button>
              <Button
                colorScheme="red"
                onClick={onAction}
                ml={3}
              >
                {t(isActionReject ? 'reject' : 'approve')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  )
}
