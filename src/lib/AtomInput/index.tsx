/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { FormikValues } from 'formik'
import { motion } from 'framer-motion'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import lodash from 'lodash'
import { ChangeEvent, Ref } from 'react'

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
  options?: {
    value: string
    label: string
    id: string
  }[]
  defaultText?: string
  css?: SerializedStyles
  ref?: Ref<any>
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

const AtomInput = (props: Props) => {
  return (
    <>
      {props.type === 'select' ? (
        <>
          <AtomText
            as="label"
            htmlFor={props.id}
            css={css`
              font-size: 12px;
              font-weight: 600;
              margin: 0px 0px 0px 0px;
              display: flex;
              flex-direction: column;
            `}
          >
            {props.label}
          </AtomText>
          <AtomWrapper
            as="select"
            value={
              props.formik && props.id
                ? lodash.get(props.formik?.values, props.id)
                : props.formik &&
                  props.id &&
                  lodash.get(props.formik?.values, props.id) === ''
                ? 'DEFAULT'
                : props.value
            }
            onChange={
              props.formik ? props.formik?.handleChange : props.onChange
            }
            onBlur={(e) => {
              props.formik?.handleBlur(e)
              props.onBlur?.(e)
            }}
            {...props}
          >
            <AtomWrapper as="option" value="DEFAULT" disabled>
              {props.defaultText ?? 'Selecciona una opción'}
            </AtomWrapper>
            {props.options &&
              props.options.length > 0 &&
              props.options?.map((item) => (
                <AtomWrapper as="option" key={item.id} value={item.value}>
                  {item.label}
                </AtomWrapper>
              ))}
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
            <></>
          )}
        </>
      ) : props.type === 'textarea' ? (
        <>
          <AtomText
            as="label"
            htmlFor={props.id}
            css={css`
              font-size: 12px;
              font-weight: 600;
              margin: 0px 0px 0px 0px;
              display: flex;
              flex-direction: column;
            `}
          >
            {props.label}

            <AtomWrapper
              as="textarea"
              {...props}
              value={lodash.get(props.formik?.values, props.id) ?? props.value}
              onChange={props.onChange ?? props.formik?.handleChange}
              onBlur={(e) => {
                props.formik?.handleBlur(e)
                props.onBlur?.(e)
              }}
            ></AtomWrapper>
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
              <></>
            )}
          </AtomText>
        </>
      ) : (
        <>
          {props.label && (
            <AtomText
              as="label"
              htmlFor={props.id}
              css={css`
                font-size: 12px;
                font-weight: 600;
                margin: 0px 0px 0px 0px;
                padding: 0px 0px 0px 5px;
              `}
            >
              {props.label}
            </AtomText>
          )}
          <AtomInputStyled
            {...props}
            value={lodash.get(props.formik?.values, props.id) ?? props.value}
            onChange={props.onChange ?? props.formik?.handleChange}
            onBlur={(e) => {
              props.formik?.handleBlur(e)
              props.onBlur?.(e)
            }}
          />
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
            <></>
          )}
        </>
      )}
    </>
  )
}

export default AtomInput
