import React, {useState} from "react";
import {FileInput} from "@/components/FileInput/FileInput.tsx";
import {FileCard} from "@/components/FileCard/FileCard.tsx";
import {Spinner} from "@/components/Spinner/Spinner.tsx";
import {User} from "@/components/UserTable/types.ts";
import {UserTable} from "@/components/UserTable/UserTable.tsx";
import {Button} from "@/components/Button/Button.tsx";
import {
  DocumentReferenceIcon,
  DocumentForChecksIcon,
  DocumentCheckedIcon,
  DocumentErrorIcon,
} from "@/components/Icons";
import {getUserChecks} from "@/api/checks/checks.ts";

export const App: React.FunctionComponent = () => {
  const [referenceDocuments, setReferenceDocuments] = useState<File[]>([])
  const [documentsForChecks, setDocumentsForChecks] = useState<File[]>([])
  const [users, setUsers] = useState<User[]>([])

  const [isUploadingDocuments, setIsUploadingDocuments] = useState(true)
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)

  const isCheckDocumentButtonDisabled = !referenceDocuments.length || !documentsForChecks.length

  const onChangeReferenceDocuments = (files: File[]) => {
    setReferenceDocuments((prevState) => [...prevState, ...files])
  }

  const onRemoveReferenceDocument = (index: number) => {
    setReferenceDocuments(referenceDocuments.filter((_, i) => i !== index))
  }

  const onChangeDocumentsForChecks = (files: File[]) => {
    setDocumentsForChecks((prevState) => [...prevState, ...files])
  }

  const onRemoveDocumentForChecks = (index: number) => {
    setDocumentsForChecks(documentsForChecks.filter((_, i) => i !== index))
  }

  const onCheckDocuments = async () => {
    setIsUploadingDocuments(false)
    setIsPending(true)

    try {
      const user = await getUserChecks({
        file_teacher: referenceDocuments[0],
        file_student: documentsForChecks[0],
      })
      setUsers([user])
    } catch (e) {
      setIsError(true)
    }

    setIsPending(false)
  }

  const onStartCheck = () => {
    setReferenceDocuments([])
    setDocumentsForChecks([])
    setIsUploadingDocuments(true)

    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className='mx-auto'>
      <div className='grid grid-cols-content'>
        <p className='text-gray-700'>
          Шаг 1 из 3
        </p>
        <div className='flex flex-col gap-y-4 items-center'>
          <DocumentReferenceIcon/>
          <p className='text-4xl text-blue-800'>
            Загрузите эталонный документ
          </p>
          <p className='text-gray-600 text-center'>
            Это сканы, с помощью которых система будет сверять ответы. Проверьте загружаемые файлы на правильность
            ответов
          </p>
          <FileInput
            multiple={false}
            onInputFiles={onChangeReferenceDocuments}
          />
          {
            !!referenceDocuments.length &&
            <div className='w-full flex flex-col gap-y-6 mt-8'>
              {referenceDocuments.map((file, i) => {
                return (
                  <FileCard
                    key={i}
                    file={file}
                    onRemove={() => onRemoveReferenceDocument(i)}
                  />
                )
              })}
            </div>
          }
        </div>
      </div>
      <hr className='w-full my-6 text-gray-400'/>
      <div className='grid grid-cols-content'>
        <p className='text-gray-700'>
          Шаг 2 из 3
        </p>
        <div className='flex flex-col gap-y-4 items-center'>
          <DocumentForChecksIcon />
          <p className='text-4xl text-blue-800'>
            Загрузите сканы на проверку
          </p>
          <p className='text-gray-600 text-center'>
            Это сканы, которые вы хотите сверить с эталонными
          </p>
          <FileInput
            multiple={false}
            onInputFiles={onChangeDocumentsForChecks}
          />
          {
            !!documentsForChecks.length &&
            <div className='w-full flex flex-col gap-y-6 mt-8'>
              {documentsForChecks.map((file, i) => {
                return (
                  <FileCard
                    key={i}
                    file={file}
                    onRemove={() => onRemoveDocumentForChecks(i)}
                  />
                )
              })}
            </div>
          }
          {
            isUploadingDocuments &&
            <div className='mt-4 justify-center'>
              <Button
                label='Начать проверку'
                disabled={isCheckDocumentButtonDisabled}
                onClick={onCheckDocuments}
              />
            </div>
          }
        </div>
      </div>
      {
        !isUploadingDocuments &&
        <>
          <hr className='w-full my-6 text-gray-400'/>
          <div className='grid grid-cols-content'>
            <p className='text-gray-700'>
              Шаг 3 из 3
            </p>
            <div className='flex flex-col gap-y-4 items-center'>
              <div className='flex justify-center items-center'>
                {isPending ? <Spinner /> : isError ? <DocumentErrorIcon /> : <DocumentCheckedIcon />}
              </div>
              <p className='text-4xl text-blue-800'>
                {isPending ? 'Ожидайте, идет проверка файлов...' : isError ? 'Файл не проверен!' : 'Файл проверен!'}
              </p>
              {
                isPending &&
                <p className='text-gray-600 text-center'>
                  Не закрывайте эту страницу!
                </p>
              }
              {!isPending && <UserTable users={users}/>}
              {
                !isPending &&
                <Button
                  label='Начать новую проверку'
                  onClick={onStartCheck}
                />
              }
            </div>
          </div>
        </>
      }
    </div>
  )
}
