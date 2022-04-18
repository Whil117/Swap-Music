/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import { Formik, FormikValues } from 'formik'
import Atomdragandrop from 'lib/Atomdragandrop'
import AtomInput from 'lib/AtomInput'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, useEffect, useState } from 'react'

type Props = {
  formik: FormikValues
}

export type Image = {
  target: {
    files: FileList | null
  }
}

const Atomcoverpage: FC<Props> = (props) => {
  return (
    <AtomWrapper width="100%">
      <AtomText as="h2">Cover page</AtomText>
      <Atomdragandrop type="file" id="coverpage" formik={props.formik} />
    </AtomWrapper>
  )
}

export default Atomcoverpage
