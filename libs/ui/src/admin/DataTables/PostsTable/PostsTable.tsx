import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import { QueryKey } from '@tanstack/react-query'
import {
  useDeleteModel,
  useApproveModel,
  usePublishModel,
  useUnpublishModel,
} from '@wsvvrijheid/services'
import { Localize, Post } from '@wsvvrijheid/types'

import { WConfirm, WConfirmProps } from '../../../components'
import { PostDetailModal } from '../../PostDetailModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type PostsTableProps = Omit<DataTableProps<Post>, 'columns'> & {
  queryKey?: QueryKey
}

export const PostsTable: FC<PostsTableProps> = ({
  queryKey,
  data: posts,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const confirmDisclosure = useDisclosure()
  const selectedPost =
    typeof selectedIndex === 'number' ? posts?.[selectedIndex] : null
  const openEditModal = useDisclosure()
  const [confirmState, setConfirmState] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>()

  const handleClickRow = (index: number, id: number) => {
    setSelectedIndex(index)
    openEditModal.onOpen()
  }

  const deletePostMutation = useDeleteModel('api/posts', queryKey)
  const approvePostMutation = useApproveModel(
    'api/posts',
    ['title', 'description', 'content'],
    queryKey,
  )
  const publishPostMutation = usePublishModel('api/posts', queryKey)
  const unpublishPostMutation = useUnpublishModel('api/posts', queryKey)
  //delete post =================
  const handleDelete = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      isWarning: true,
      title: 'Delete post',
      description: 'Are you sure you want to delete this post?',
      buttonText: 'Delete',
      onConfirm: async () => {
        await deletePostMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const handleApprove = (id: number) => {
    confirmDisclosure.onOpen()

    setConfirmState({
      title: 'Approve post',
      description: 'Are you sure you want to approve this post?',
      buttonText: 'Approve',
      onConfirm: async () => {
        await approvePostMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const onPublish = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Publish post',
      description: `Are you sure you want to publish this post ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        await publishPostMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }

  const onUnPublish = (id: number) => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Un Publish Post',
      description: `Are you sure you want to unpublish this post ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        await unpublishPostMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const getLocalizePosts = (post: Post) => {
    const firstTranslation = post?.localizations?.[0] || ({} as Post)
    const secondTranslation = post?.localizations?.[1] || ({} as Post)

    const postBody = {
      [post.locale]: post,
      [firstTranslation.locale]: firstTranslation,
      [secondTranslation.locale]: firstTranslation,
    } as Localize<Post>
    return postBody
  }

  return (
    <>
      {confirmState && <WConfirm {...confirmState} />}
      {selectedPost && openEditModal.isOpen && (
        <PostDetailModal
          localizePost={getLocalizePosts(selectedPost)}
          isOpen={openEditModal.isOpen}
          onClose={openEditModal.onClose}
          onDelete={handleDelete}
          onPublish={onPublish}
          onApprove={handleApprove}
          unPublish={onUnPublish}
        />
      )}
      <DataTable
        data={posts}
        columns={columns}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={onSort}
        onClickRow={handleClickRow}
      />
    </>
  )
}