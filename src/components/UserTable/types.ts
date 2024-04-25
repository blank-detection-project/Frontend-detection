export interface User {
  name: string
  answersCount: number
  validAnswersCount: number
}

export interface UserTableProps {
  users: User[]
}