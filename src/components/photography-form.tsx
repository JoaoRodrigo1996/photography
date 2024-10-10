'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { CloudUpload, Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from './ui/button'
import { FileItem } from './file-item'

import { getPreSignedURL } from '../actions/get-pre-signed-url'
import { createPost } from '@/actions/create-post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

interface PostProps {
  id: string
  description: string
  mediaId: string
}

export function PhotographyForm() {
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync: createPostFn } = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.setQueryData(['posts'], (posts: PostProps[]) => {
        return posts ? [...posts, newPost] : [newPost]
      })
    },
  })

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFiles = files[0]

    setFile(selectedFiles)
  }

  function handleDeleteFile() {
    setFile(null)
  }

  async function handleCreatePhotography(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsLoading(true)
      let mediaId: string | undefined

      if (!file) {
        return
      }

      const checkSum = await computeSHA256(file)

      const signedURL = await getPreSignedURL(file.type, file.size, checkSum)

      if (signedURL.failure !== undefined) {
        return 'Not allowed'
      }

      const { url } = signedURL.success
      mediaId = signedURL.success.mediaId

      await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      await createPostFn({ description, mediaId })

      toast.success('Foto publicada com sucesso!')
    } catch (error) {
      toast.error('Erro ao publicar')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleCreatePhotography}
      className="flex flex-col space-y-4"
    >
      <fieldset className="space-y-2">
        <label
          htmlFor="photo"
          className="group flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed px-6 py-4 text-center shadow-sm"
        >
          <div className="border-6 rounded-full border-muted-foreground bg-muted p-2 group-hover:border-foreground">
            <CloudUpload className="size-6 text-muted-foreground hover:text-foreground" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm">
              <span className="font-semibold text-primary">
                Click aqui para fazer upload
              </span>
              <br />
              ou arraste um arquivo
            </span>
            <span className="text-xs">PNG, JPEG e SVG</span>
          </div>
        </label>
        <Input
          id="photo"
          type="file"
          accept="image/png image/jpeg image/webp image/jpg video/mp4 video/webm"
          className="sr-only"
          onChange={handleFileSelected}
        />
      </fieldset>

      {file && (
        <FileItem
          name={file.name}
          size={file.size}
          state="progress"
          handleDeleteFile={handleDeleteFile}
        />
      )}

      <fieldset className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Deixe aqui uma descrição para a sua foto..."
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
      </fieldset>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Publicar'}
      </Button>
    </form>
  )
}
