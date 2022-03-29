import { Table } from "react-bootstrap"
import { useAppSelector } from "../../app/hooks"
import { selectFcpxml } from "../../features/fcpxml/fcpxmlSlice"
import getAssetClipOrClip from "../../utils/getAssetClipOrClip"

type Props = {
}

const getTitles = (fcpxml: any) => {
  try {
    return fcpxml.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(fcpxml)]
      .reduce((acc: any, clip: any) => {
        clip.title.forEach((title: any) => {
          acc.push({
            lang1: title.text[0]['text-style']['#text'],
            lang2: title.text[1]['text-style']['#text']
          })
        })
        return acc
      }, [])

  } catch (error) {
    return []
  }
}

const ClipTable = ({}: Props) => {
  const fcpxml = useAppSelector(selectFcpxml);
  
  return (
    <div style={{
      overflowY: 'auto',
      maxHeight: '80vh'
    }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Lingua 1</th>
            <th>Lingua 2</th>
          </tr>
        </thead>
        <tbody>
          {getTitles(fcpxml).map((title: any, index: number) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{title.lang1}</td>
              <td>{title.lang2}</td>
            </tr>
          ))}
          {/* <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr> */}
          {
            getTitles(fcpxml).length === 0 &&
            <tr>
              <td colSpan={3}>Nessun elemento trovato</td>
            </tr>
          }
        </tbody>
      </Table>
    </div >
  )
}

export default ClipTable