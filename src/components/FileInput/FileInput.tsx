import React, {DragEvent, ChangeEvent, useId, useRef, useState} from "react";
import {FileInputProps} from "./types.ts";
import {VALID_TYPES} from "./constants.ts";
import {DocumentGrayIcon} from "@/components/Icons";

export const FileInput: React.FunctionComponent<FileInputProps> = (props: FileInputProps) => {
  const id = useId()
  const dropZone = useRef<HTMLDivElement>(null)
  const [isDropZoneHover, setIsDropZoneHover] = useState<boolean>(false)

  const acceptTypes = VALID_TYPES.join(', ')
  const dropZoneClassName = [
    'w-full',
    'py-24',
    'flex',
    'justify-center',
    'flex-col',
    'items-center',
    isDropZoneHover ? 'bg-gray-300' : 'bg-white',
    'border',
    'border-dashed',
    'border-blue-600',
    'rounded-sm',
    'transition',
  ].join(' ')

  const {
    label = 'Выбрать файл',
    disabled = false,
    multiple = false,
    onInputFiles,
  } = props;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    onInputFiles([...files]);
  }

  const handleDragEnter = () => {
    if (disabled) {
      return
    }

    if (!dropZone.current) {
      return
    }

    setIsDropZoneHover(true)
  }

  const handleDragOver = (event: DragEvent) => {
    if (disabled) {
      return
    }

    event.preventDefault()
  }

  const handleDrop = (event: DragEvent) => {
    if (disabled) {
      return
    }

    event.preventDefault()
    const files = [...event.dataTransfer.files].filter((file) => VALID_TYPES.includes(file.type))
    setIsDropZoneHover(false)
    onInputFiles(files)
  }

  const handleDragLeave = (event: DragEvent) => {
    if (disabled) {
      return
    }

    if (!dropZone.current) {
      return
    }

    if (dropZone.current.contains(event.relatedTarget as Node)) {
      return
    }

    setIsDropZoneHover(false)
  }

  return (
    <article className='w-full flex flex-col gap-y-2'>
      <div
        ref={dropZone}
        className={dropZoneClassName}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <div className='flex flex-col items-center'>
          <DocumentGrayIcon />
          <p className='mt-3 text-xs text-gray-400'>
            Перетащите или выберите файл
          </p>
        </div>
        <label
          className='mt-4 px-5 py-2 text-blue-700 bg-blue-500 rounded-sm border-0 outline-0 cursor-pointer'
          htmlFor={id}
        >
          <input
            id={id}
            type='file'
            className='hidden'
            accept={acceptTypes}
            disabled={disabled}
            multiple={multiple}
            onChange={handleFileChange}
          />
          {label}
        </label>
      </div>
      <p className='text-sm text-gray-800 text-center'>
        Выберите или перетащите файл в форматах .png, .jpeg, .jpg
      </p>
    </article>
  )
}