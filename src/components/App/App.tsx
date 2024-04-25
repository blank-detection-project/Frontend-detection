import React, {useState} from "react";
// import {Button} from "@/components/Button/Button.tsx";
import {FileInput} from "@/components/FileInput/FileInput.tsx";
import {FileCard} from "@/components/FileCard/FileCard.tsx";
import {DocumentReferenceIcon} from "@/components/Icons/DocumentReferenceIcon.tsx";
import {DocumentForChecksIcon} from "@/components/Icons/DocumentForChecksIcon.tsx";
import {Spinner} from "@/components/Spinner/Spinner.tsx";

export const App: React.FunctionComponent = () => {
  const [referenceDocuments, setReferenceDocuments] = useState<File[]>([])
  const [documentsForChecks, setDocumentsForChecks] = useState<File[]>([])

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
            multiple={true}
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
          <DocumentForChecksIcon/>
          <p className='text-4xl text-blue-800'>
            Загрузите документ на проверку
          </p>
          <p className='text-gray-600 text-center'>
            Это сканы, которые вы хотите сверить с эталонными
          </p>
          <FileInput
            multiple={true}
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
        </div>
      </div>
      <hr className='w-full my-6 text-gray-400'/>
      <div className='grid grid-cols-content'>
        <p className='text-gray-700'>
          Шаг 3 из 3
        </p>
        <div className='flex flex-col gap-y-4 items-center'>
          <div className='flex justify-center items-center'>
            <Spinner />
          </div>
          <p className='text-4xl text-blue-800'>
            Ожидайте, идет проверка файлов...
          </p>
          <p className='text-gray-600 text-center'>
            Не закрывайте эту страницу!
          </p>
        </div>
      </div>
    </div>
  )
}
