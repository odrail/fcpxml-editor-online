import { CSSProperties } from "react"
import { Button } from "react-bootstrap"
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
    <Button
      style={style}
      onClick={handleClick}
      variant="warning"
    >
      Correggi Titoli
    </Button>
  )
}

export default FixTitlesButton