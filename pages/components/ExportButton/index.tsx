import FileSaver from "file-saver";
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../../app/hooks";
import { selectFcpxml } from "../../../features/fcpxml/fcpxmlSlice";
import { selectFileName } from "../../../features/fileName/fileNameSlice";
import * as xml from '../../../utils/xml'

type Props = {}

const ExportButton = ({ }: Props) => {
  const fcpxml = useAppSelector(selectFcpxml);
  const fileName = useAppSelector(selectFileName);

  const handleClick = () => {
    if (!fileName) return
    const output: string = xml.build(fcpxml)
    const blob = new Blob([output], { type: "application/xml;charset=utf-8" });
    FileSaver.saveAs(blob, fileName);
  }

  return (
    <Button
      onClick={handleClick}
      variant="success"
      style={{ marginLeft: '15px' }}
    >
      Esporta fcpxml
    </Button>
  )
}

export default ExportButton