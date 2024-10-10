import { formatBytes } from '@/utils/format-bytes'
import { CheckCircle2, Trash2, UploadCloud } from 'lucide-react'
import { tv, VariantProps } from 'tailwind-variants'
import { Button } from './ui/button'

const fileItemVariants = tv({
  slots: {
    container:
      'group flex items-start gap-4 rounded-lg border border-zinc-200 p-4 shadow-sm',
    icon: 'rounded-full border-4 bg-muted p-2 text-foreground',
    deleteButton: '',
  },

  variants: {
    state: {
      progress: { container: '' },
      complete: { container: 'border-muted-foreground' },
      error: {
        container:
          'bg-pink-25 border-pink-300 dark:bg-pink-500/5 dark:border-pink-500/30',
        icon: 'border-pink-50 bg-pink-100 text-pink-600 dark:bg-pink-500/5 dark:border-pink-500/30 dark:text-pink-400',
        deleteButton:
          'text-pink-700 hover:text-pink-900 dark:text-pink-400 dark:hover:text-pink-300',
      },
    },
  },

  defaultVariants: {
    state: 'progress',
  },
})

interface FileItemProps extends VariantProps<typeof fileItemVariants> {
  name: string
  size: number
  handleDeleteFile: () => void
}

export function FileItem({
  name,
  size,
  state,
  handleDeleteFile,
}: FileItemProps) {
  const { container, icon, deleteButton } = fileItemVariants({ state })

  return (
    <div className={container()}>
      <div className={icon()}>
        <UploadCloud className="size-4" />
      </div>

      {state === 'error' ? (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col">
            <span className="text-error-700 text-sm font-medium">
              Upload failed, please try again.
            </span>
            <span className="text-error-600 text-sm">{name}</span>
          </div>

          <button
            type="button"
            className="text-error-700 hover:text-error-900 text-sm font-semibold"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-start gap-1">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-700">{name}</span>
            <span className="text-sm text-zinc-500">{formatBytes(size)}</span>
          </div>

          <div className="flex w-full items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-muted">
              <div
                className="h-2 w-4/5 rounded-full bg-primary"
                style={{ width: state === 'complete' ? '100%' : '80%' }}
              />
            </div>
            <span className="text-sm font-medium text-zinc-700">
              {state === 'complete' ? '100%' : '80%'}
            </span>
          </div>
        </div>
      )}

      {state === 'complete' ? (
        <CheckCircle2 className="size-4 fill-foreground text-white" />
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={deleteButton()}
          onClick={handleDeleteFile}
        >
          <Trash2 className="size-4" />
        </Button>
      )}
    </div>
  )
}
