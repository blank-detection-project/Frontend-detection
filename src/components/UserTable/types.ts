export interface User {
  name: string
  allAnswers: number
  correctAnswers: number
}

export interface UserTableProps {
  users: User[]
}