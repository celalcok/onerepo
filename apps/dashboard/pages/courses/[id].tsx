import { useEffect, useMemo, useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  MenuItem,
  Stack,
  Text,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Course, CourseApplication, Sort, StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { CourseApplicationDetails } from '@fc/ui/components/CourseApplicationInstallment'
import { DataTable } from '@fc/ui/components/DataTable'
import { ModelEditForm } from '@fc/ui/components/ModelEditForm'
import { ModelEditModal } from '@fc/ui/components/ModelEditModal'
import { PageHeader } from '@fc/ui/components/PageHeader'
import { useColumns } from '@fc/ui/hooks/useColumns'

const CoursePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation()

  const { locale, query } = useRouter()

  const columns = useColumns<CourseApplication>()

  const [selectedApplicationId, setSelectedApplicationId] = useState<number>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [sort, setSort] = useState<Sort>()

  const handleSearch = (search?: string) => {
    setSearchTerm(search || undefined)
  }

  const id = Number(query.id as string)

  const applicationsQuery = useStrapiRequest<CourseApplication>({
    endpoint: 'course-applications',
    filters: {
      course: { id: { $eq: id } },
      ...(searchTerm && {
        $or: [
          { name: { $containsi: searchTerm } },
          { email: { $containsi: searchTerm } },
        ],
      }),
    },
    sort,
    page: currentPage || 1,
    pageSize: 100,
    locale,
  })
  useUpdateEffect(() => {
    applicationsQuery.refetch()
  }, [locale, searchTerm, sort])

  const applications = useMemo(
    () => applicationsQuery?.data?.data || [],
    [applicationsQuery?.data?.data],
  )
  const pageCount = applicationsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = applicationsQuery?.data?.meta?.pagination?.total || 0
  const applicantId = Number(query.applicantId as string)

  useEffect(() => {
    if (applications.some(app => app.id === applicantId)) {
      setSelectedApplicationId(applicantId)
    }
  }, [applicantId, applications])

  const { data, isLoading, refetch } = useStrapiRequest<Course>({
    endpoint: 'courses',
    id,
  })

  const course = data?.data

  const handleRowClick = (index: number, id: number) => {
    setSelectedApplicationId(id)
  }

  useEffect(() => {
    if (selectedApplicationId) {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedApplicationId])

  const handleClose = () => {
    onClose()
    setSelectedApplicationId(undefined)
  }

  return (
    <AdminLayout
      seo={{ title: t('course') }}
      isLoading={isLoading}
      hasBackButton
    >
      {selectedApplicationId && (
        <ModelEditModal<CourseApplication>
          title={'Application'}
          endpoint="course-applications"
          id={selectedApplicationId}
          isOpen={isOpen}
          onClose={handleClose}
          onSuccess={refetch}
          size={'5xl'}
        >
          <CourseApplicationDetails
            course={course!}
            application={
              applications.find(
                application => application.id === selectedApplicationId,
              )!
            }
            onSave={applicationsQuery.refetch}
          />
        </ModelEditModal>
      )}
      <Stack spacing={8} p={6}>
        <Accordion
          size={'lg'}
          allowToggle
          allowMultiple={false}
          defaultIndex={0}
          borderColor="transparent"
          defaultValue={1}
        >
          <AccordionItem _notLast={{ mb: 2 }} overflow={'auto'}>
            <AccordionButton
              justifyContent="space-between"
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>{course?.[`title_${locale}`]}</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel
              mt={4}
              bg={'white'}
              rounded={'md'}
              overflow={'auto'}
            >
              {course && (
                <ModelEditForm<Course>
                  endpoint="courses"
                  model={course}
                  onSuccess={refetch}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              justifyContent="space-between"
              _activeStep={{ bg: 'gray.200' }}
              cursor="pointer"
              fontSize="lg"
              bg={'white'}
              rounded={'md'}
              fontWeight={600}
              shadow={'sm'}
            >
              <Text>Applications</Text>
              <AccordionIcon ml={'auto'} />
            </AccordionButton>
            <AccordionPanel mt={4} bg={'white'} rounded={'md'}>
              <PageHeader
                onSearch={handleSearch}
                sortMenu={[
                  <MenuItem key="asc" icon={<FaArrowUp />}>
                    Name Asc
                  </MenuItem>,
                  <MenuItem key="desc" icon={<FaArrowDown />}>
                    Name Desc
                  </MenuItem>,
                ]}
              />

              <DataTable<CourseApplication>
                columns={columns['course-applications']!}
                currentPage={currentPage}
                data={applications}
                onClickRow={handleRowClick}
                onSort={setSort}
                pageCount={pageCount}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
                totalCount={totalCount}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default CoursePage
