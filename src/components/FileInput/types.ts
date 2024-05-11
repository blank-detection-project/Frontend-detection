export interface FileInputProps {
  label?: string
  disabled?: boolean
  multiple?: boolean
  types?: string[]
  onInputFiles: (files: File[]) => void
}
