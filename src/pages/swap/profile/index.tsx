import OrganismBanner from '@Components/@organisms/OrganismBanner'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import Selector from '@Types/redux/reducers/user/types'

type Props = {}

const Profile: FC<Props> = (props) => {
  const user = useSelector(Selector)
  return (
    <AtomWrapper>
      <OrganismBanner
        title={user.me.display_name}
        id={user.me.id}
        name={user.me.display_name}
        image_url={user.me.images[0].url}
        type={user.me.type}
      />
    </AtomWrapper>
  )
}

export default Profile
