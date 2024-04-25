import React from 'react'
import {User, UserTableProps} from "./types.ts";

export const UserTable: React.FunctionComponent<UserTableProps> = (props: UserTableProps) => {
  const {
    users
  } = props

  const getUserMark = (user: User) => {
    return (user.validAnswersCount / user.answersCount).toFixed(2)
  }

  return (
    <table className='w-full'>
      <thead className='w-full bg-blue-700 text-white rounded-s'>
        <tr className='w-full grid grid-cols-4 p-2 gap-x-3'>
          <th className='flex items-center'>ФИО</th>
          <th className='flex items-center'>Всего ответов</th>
          <th className='flex items-center'>Правильных ответов</th>
          <th className='flex items-center'>Оценка</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            return (
              <tr
                className='w-full grid grid-cols-4 p-2 gap-x-3'
                key={index}
              >
                <th className='text-left'>{user.name}</th>
                <th className='text-left'>{user.answersCount}</th>
                <th className='text-left'>{user.validAnswersCount}</th>
                <th className='text-left'>{getUserMark(user)}</th>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}