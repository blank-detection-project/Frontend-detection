import React from "react";
import {ButtonProps} from "./types.ts";

export const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const {
    label = 'кнопка',
    disabled = false,
    onClick,
  } = props

  return (
    <button
      className='px-5 py-2 text-blue-700 bg-blue-500 disabled:bg-gray-500 disabled:text-gray-800 rounded-sm border-0 outline-0'
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}