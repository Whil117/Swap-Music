import { stepsId } from '@Components/@atoms/AtomBarScroll'
import Step1 from '@Components/library/step1'
import Step3 from '@Components/library/step3'
import Step4 from '@Components/library/step4'
import { css } from '@emotion/react'
import { atom, useAtom } from 'jotai'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'

const steps = atom({
  Playlists: {
    title: 'Playlists',
    component: <Step1 />,
  },
  // Podcasts: {
  //   title: 'Podcasts',
  //   component: <Step2 />,
  // },
  Artists: {
    title: 'Artists',
    component: <Step3 />,
  },
  Albums: {
    title: 'Albums',
    component: <Step4 />,
  },
})

type Steps = { [key: string]: { title: string; component: JSX.Element } }

const Library: NextPageFCProps = () => {
  const [step] = useAtom<Steps>(steps)
  const [stepById] = useAtom(stepsId)
  return (
    <AtomWrapper
      width="100%"
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <AtomWrapper
        padding="0px 90px"
        alignItems="center"
        maxWidth="1440px"
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          @media (max-width: 980px) {
            padding: 0px 15px;
          }
        `}
      >
        {step[stepById]?.component}
      </AtomWrapper>
    </AtomWrapper>
  )
}

export async function getServerSideProps() {
  Library.Layout = 'swap'
  return {
    props: {},
  }
}

Library.Layout = 'swap'

export default Library
