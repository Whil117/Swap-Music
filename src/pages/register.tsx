import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AtomText from 'lib/AtomText'
import { css } from '@emotion/react'
const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        formik.handleSubmit()
        formik.validateForm()
      }}
    >
      <label htmlFor="name">First Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      <AtomText
        as="p"
        css={css`
          color: white;
        `}
      >
        {formik.errors.name}
      </AtomText>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <AtomText
        as="p"
        css={css`
          color: white;
        `}
      >
        {formik.errors.email}
      </AtomText>
      <button type="submit">Submit</button>
    </form>
  )
}
export default SignupForm
