import { CSSProperties } from "react"
import correggiTitoli from "../../../utils/correggi-titoli"

type Props = {
  style?: CSSProperties,
  fcpxml: any,
  onClick?: Function
}

const FixTitlesButton = ({ style, fcpxml, onClick }: Props) => {
  const handleClick = () => {
    const output: any = correggiTitoli(fcpxml)
    console.log('output', output)
    onClick && onClick(output)
  }
  return (
    <button
      style={style}
      onClick={handleClick}
    >
      Correggi Titoli
    </button>
  )
}

export default FixTitlesButton