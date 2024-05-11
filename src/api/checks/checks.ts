import {instance} from "@/api/instance";
import {User} from "@/components/UserTable/types.ts";

export interface GetUserChecksPayload {
  file_student: File
  file_teacher: File
}

export async function getUserChecks(payload: GetUserChecksPayload): Promise<User> {
  const formData = new FormData();
  formData.append('file_teacher', payload.file_teacher, payload.file_teacher.name);
  formData.append('file_student', payload.file_student, payload.file_student.name);

  const {data} = await instance.post<User>(
    '/blank',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

  return data
}

export async function getUserExcelChecks(payload: GetUserChecksPayload): Promise<Blob> {
  const formData = new FormData();
  formData.append('file_teacher', payload.file_teacher, payload.file_teacher.name);
  formData.append('pdf_students', payload.file_student, payload.file_student.name);

  const {data} = await instance.post<Blob>(
    '/blanks_pdf',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    })

  return data
}