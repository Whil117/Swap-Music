import OrganismBanner from '@Components/@organisms/OrganismBanner'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const Profile: FC<Props> = () => {
  const user = useSelector((state: SelectFor) => state.user)
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
