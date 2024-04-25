export interface FileInputProps {
  label?: string
  disabled?: boolean
  multiple?: boolean
  onInputFiles: (files: File[]) => void
}
