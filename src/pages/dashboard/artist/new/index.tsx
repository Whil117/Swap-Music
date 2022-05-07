import { css } from '@emotion/react'
import { useFormik } from 'formik'
import Atomdragandrop from 'lib/Atomdragandrop'
import AtomInput from 'lib/AtomInput'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'

import * as Yup from 'yup'

const NewArtist: NextPageFCProps = () => {
  const formik = useFormik({
    initialValues: {
      coverpage: '',
      name: '',
      about: '',
      musical_genre: '',
    },
    validationSchema: Yup.object({
      coverpage: Yup.mixed().required('Coverpage is required'),
      name: Yup.string().required('Name is required'),
      about: Yup.string().required('About is required'),
      musical_genre: Yup.string().test(
        'string',
        'Selecciona un estado',
        (value) => value !== 'DEFAULT'
      ),
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
        {formpart1.map((item) => (
          <AtomInput
            {...item}
            key={item.id + item.key}
            formik={formik}
            css={css`
              width: 100%;
              height: 35px;
              border-radius: 5px;
            `}
          />
        ))}
        <AtomInput
          id="musical_genre"
          formik={formik}
          options={typesMusicGenre}
          // value="DEFAULT"
          type="select"
          label="Musical Genre"
        />
        <AtomInput
          id="about"
          type="textarea"
          label="About"
          formik={formik}
          css={css`
            border-radius: 5px;
            height: 100px;
            width: 300px;
            resize: none;
          `}
        />
      </AtomWrapper>
    </AtomWrapper>
  )
}

const typesMusicGenre = [
  {
    value: 'kpop',
    label: 'K-Pop',
    id: 'kpop',
  },
  {
    value: 'jpop',
    label: 'J-Pop',
    id: 'jpop',
  },
  {
    value: 'pop',
    label: 'Pop',
    id: 'pop',
  },
  {
    value: 'rock',
    label: 'Rock',
    id: 'rock',
  },
  {
    value: 'hiphop',
    label: 'Hip-Hop',
    id: 'hiphop',
  },
  {
    value: 'indie',
    label: 'Indie',
    id: 'indie',
  },
  {
    value: 'metal',
    label: 'Metal',
    id: 'metal',
  },
  {
    value: 'electronic',
    label: 'Electronic',
    id: 'electronic',
  },
  {
    value: 'folk',
    label: 'Folk',
    id: 'folk',
  },
  {
    value: 'reggae',
    label: 'Reggae',
    id: 'reggae',
  },
  {
    value: 'dance',
    label: 'Dance',
    id: 'dance',
  },
]

const formpart1 = [
  {
    key: 1,
    id: 'name',
    label: 'Name',
    placeholder: 'Name',
    type: 'text',
  },
]

NewArtist.Layout = 'dashboard'

export default NewArtist
