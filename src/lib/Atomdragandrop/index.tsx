/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { Formik, FormikValues } from 'formik'
import { motion } from 'framer-motion'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import lodash from 'lodash'
import { ChangeEvent, useEffect, useState } from 'react'

type Props = {
  id: string
  label?: string
  placeholder?: string
  min?: string
  max?: string
  type?: string
  value?: string | number
  onBlur?: (e: any) => void
  onChange?: (e: ChangeEvent<any>) => void
  formik?: FormikValues
  disabled?: boolean
  css?: SerializedStyles
}

const AtomInputStyled = styled(motion.input)<Props>`
  font-size: 12px;
  font-weight: 600;
  margin: 0px 0px 0px 0px;
  padding: 0px;
  color: #1a1a1a;
  ::placeholder {
    color: #202124;
    opacity: 0.5;
  }
  background-color: #ffffff;
  height: 35px;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid #f2f2f2;

  ${(props) => props?.css}
`
export type Image = {
  target: {
    files: FileList | null
  }
}
const extractFile = (event: Image) => {
  const file = event.target.files && event.target.files[0]
  return file
}

const Atomdragandrop = (props: Props) => {
  const [preview, setPreview] = useState('')

  const handleImage = (event: Image) => {
    const image = extractFile(event)
    const types = ['image/png', 'image/jpeg', 'image/jpg']
    if (image && types.includes(image.type)) {
      const reader = new FileReader()
      reader.onloadend = (event) => {
        if (event.target) {
          setPreview(URL.createObjectURL(image))
        }
      }
      reader.readAsDataURL(image)
    }
  }

  return (
    <>
      <AtomWrapper
        as="div"
        htmlFor={props.id}
        css={css`
          background-color: #fafafa;
          background-image: url(${preview ? preview : ''});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          height: 300px;
          border-radius: 5px;

          ${props.css}
        `}
      >
        {!preview && (
          <AtomText
            as="p"
            css={css`
              color: black;
            `}
          >
            {props.label}
          </AtomText>
        )}
        <AtomInputStyled
          {...props}
          onChange={(e) => {
            handleImage(e)
            props?.formik?.setFieldValue(props.id, e.target.files[0])
            props?.formik?.handleChange(e)
          }}
          onBlur={(e) => {
            props.formik?.handleBlur(e)
            props.onBlur?.(e)
          }}
          css={css`
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: pointer;
            opacity: 0;
          `}
        />
      </AtomWrapper>
      {props.formik ? (
        (lodash.get(props.formik?.values, props.id) !== `` ||
          lodash.get(props.formik?.touched, props.id)) &&
        lodash.get(props.formik?.errors, props.id) ? (
          <AtomText
            as="p"
            css={css`
              color: red;
              font-size: 12px;
            `}
          >
            {lodash.get(props.formik?.errors, props.id)}
          </AtomText>
        ) : (
          <AtomText as="p"></AtomText>
        )
      ) : (
        <>DSFSADF</>
      )}
    </>
  )
}

export default Atomdragandrop
