import { CSSProperties } from "react"
import { Button } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectFcpxml, setFcpxml } from "../../../features/fcpxml/fcpxmlSlice"
import correggiTitoli from "../../../utils/correggi-titoli"

type Props = {
  style?: CSSProperties
}

const FixTitlesButton = ({ style }: Props) => {
  const fcpxml = useAppSelector(selectFcpxml);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const output: any = correggiTitoli(fcpxml)
    dispatch(setFcpxml(output))
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