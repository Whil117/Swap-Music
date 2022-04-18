import { css } from '@emotion/react'
import { useFormik } from 'formik'
import Atomdragandrop from 'lib/Atomdragandrop'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'
import * as Yup from 'yup'

const NewArtist: NextPageFCProps = () => {
  const formik = useFormik({
    initialValues: {
      coverpage: '',
    },
    validationSchema: Yup.object({
      coverpage: Yup.mixed().required('Coverpage is required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <AtomWrapper>
      <AtomWrapper
        width="1440px"
        css={css`
          padding: 0px 30px;
        `}
      >
        <AtomText as="h1">New Artist</AtomText>
        <Atomdragandrop
          id="coverpage"
          type="file"
          formik={formik}
          label="Select an image"
        />
      </AtomWrapper>
    </AtomWrapper>
  )
}
NewArtist.Layout = 'dashboard'

export default NewArtist
