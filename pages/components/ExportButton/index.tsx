import FileSaver from "file-saver";
import * as xml from '../../../utils/xml'

type Props = {
  fcpxml?: any,
  fileName: string
}

const ExportButton = ({ fcpxml, fileName }: Props) => {
  const handleClick = () => {
    const output: string = xml.build(fcpxml)
    var blob = new Blob([output], { type: "application/xml;charset=utf-8" });
    FileSaver.saveAs(blob, fileName);
  }

  return (
    <button onClick={handleClick}>Esporta fcpxml</button>
  )
}

export default ExportButton