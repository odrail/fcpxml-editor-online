import { CSSProperties } from "react"
import { Button } from "react-bootstrap"
import { useAppDispatch } from "../../../app/hooks"
import { correggiTitoli } from "../../../features/fcpxml/fcpxmlSlice"

type Props = {
  style?: CSSProperties
}

const FixTitlesButton = ({ style }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(correggiTitoli())
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