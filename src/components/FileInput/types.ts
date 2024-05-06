export interface FileInputProps {
  label?: string
  disabled?: boolean
  multiple?: boolean
  types?: 'images' | 'pdf'
  onInputFiles: (files: File[]) => void
}
