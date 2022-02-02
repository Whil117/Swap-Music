import Styles from '@Whil/types/styles'

interface ImageProps {
  src: string | ArrayBuffer | null | StaticImport
  alt: string
  width: number
  height: number
  styles?: Styles
}
export default ImageProps
