/* eslint-disable no-unused-vars */
import { Button } from '@Whil/styles/components/Button'
import colors from '@Whil/styles/global/colors'
import { Form, Formik, FormikState } from 'formik'
import { ChangeEvent, FC, useState } from 'react'
import Div from '../Div'
import Image from '../Image'
import Input from '../Input'
import Label from '../Label'
import P from '../P'

type arrProps = {
  name: string
  as: string
  id: string
  placeholder: string
  style: {}
}
interface IProps {
  buttonMessage?: string
  arr: arrProps[]
  submit: (
    values: { [x: string]: string | File },
    resetForm: (
      nextState?:
        | Partial<
            FormikState<{
              [x: string]: string
            }>
          >
        | undefined
    ) => void
  ) => void
  arrImages?: arrProps[]
}

const Formk: FC<IProps> = ({ arr, submit, buttonMessage, arrImages }) => {
  const [gallery, setGallery] = useState<{
    [x: string]: string | ArrayBuffer | null
  }>({})
  const extractFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    return file
  }

  const handleImage = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    name: string
  ) => {
    const image = extractFile(event)
    const reader = new FileReader()
    if (image) {
      reader.onloadend = (event) => {
        if (event.target) {
          setGallery({
            ...gallery,
            [name]: event.target.result,
          })
          setFieldValue(name, image)
        }
      }
      reader.readAsDataURL(image as Blob)
    }
  }
  return (
    <Formik
      initialValues={arr
        .map((arrItem) => {
          if (arrImages) {
            const imagesdata = arrImages
              ?.map((item) => {
                return {
                  [item.name]: '',
                }
              })
              .reduce((acc, curr) => {
                return { ...acc, ...curr }
              }, {})

            return {
              ...imagesdata,
              [arrItem.name]: '',
            }
          }
          return {
            [arrItem.name]: '',
          }
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {})}
      validate={(values) => {
        const errors: { [key: string]: string } = {}
        arr.forEach((item) => {
          if (!values[item.name]) {
            errors[item.name] = `${item.name} is required`
          }
        })
        arrImages?.forEach((item) => {
          if (!values[item.name]) {
            errors[item.name] = `${item.name} is required`
          }
        })
        return errors
      }}
      onSubmit={(values, { resetForm }) => {
        submit(values, resetForm)
      }}
    >
      {({ values, errors, touched, setFieldValue, handleBlur }) => (
        <Form>
          {arr.map((input) => (
            <label htmlFor={input.id} key={input.id}>
              {input.name}
              <Input
                key={input.id}
                name={input.name}
                as={input.as}
                id={input.id}
                placeholder={input.placeholder}
                styles={input.style}
              />
              {errors[input.name] && touched[input.name] && (
                <P styles={{ color: colors.danger, fontWeight: '600' }}>
                  {errors[input.name]}
                </P>
              )}
            </label>
          ))}
          {arrImages &&
            arrImages.map((item) => (
              <Div
                key={item.id}
                styles={{ boxshadow: 'a', alignitems: 'flex-start' }}
              >
                <P styles={{ margin: '10px 0' }}>{item.name}</P>
                {gallery[item.name] && (
                  <Image
                    src={gallery[item.name] || ''}
                    alt={item.name}
                    width={320}
                    height={320}
                    styles={{ margin: '50px', borderRadius: '10px' }}
                  />
                )}
                <input
                  key={`image_${item.id}`}
                  id={item.id}
                  name={item.name}
                  type="file"
                  onBlur={handleBlur}
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      handleImage(event, setFieldValue, item.name)
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <Label
                  to={item.id}
                  props={{ type: 'add', style: { margin: '10px 0' } }}
                >
                  {item.id}
                </Label>
                {errors[item.name] && touched[item.name] && (
                  <P styles={{ color: colors.danger, fontWeight: '600' }}>
                    {errors[item.name]}
                  </P>
                )}
              </Div>
            ))}
          <Button
            id={`btn_id=${buttonMessage || 'Submit'}`}
            props={{ type: 'submit', style: { margin: '10px 0' } }}
          >
            {buttonMessage || 'Submit'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Formk
