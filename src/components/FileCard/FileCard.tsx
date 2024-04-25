import React from "react";
import {XIcon} from "@/components/Icons";
import {FileCardProps} from "@/components/FileCard/types.ts";

export const FileCard: React.FunctionComponent<FileCardProps> = (props: FileCardProps) => {
  const {
    file,
    onRemove,
  } = props;

  const normalizeImageURL = URL.createObjectURL(file)

  const getFileSize = (fileSize: number) => {
    const sizeInKb = fileSize / 1024;

    if (sizeInKb > 1024) {
      return `${(sizeInKb / 1024).toFixed(2)}МБ`;
    } else {
      return `${sizeInKb.toFixed(2)}КБ`;
    }
  }

  return (
    <article className='w-full flex justify-between align-center'>
      <div className='flex align-center gap-x-3'>
        <div className='w-20 h-20'>
          <img src={normalizeImageURL} alt={file.name} className='w-full h-full' />
        </div>
        <div className='flex flex-col justify-between items-start'>
          <span className='text-xl text-blue-800'>
            {file.name}
          </span>
          <span className='text-gray-800'>
            {getFileSize(file.size)}
          </span>
        </div>
      </div>
      <button
        className='outline-0 border-0'
        onClick={() => onRemove(file)}
      >
        <XIcon />
      </button>
    </article>
  )
}