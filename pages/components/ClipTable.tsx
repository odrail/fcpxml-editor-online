import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useAppSelector } from "../../app/hooks"
import { selectFcpxml } from "../../features/fcpxml/fcpxmlSlice"
import getAssetClipOrClip from "../../utils/getAssetClipOrClip"
import Row from "./ClipTable/Row"

type Title = {
  lang1: string,
  lang2: string
}
type Props = {
}

const extractTitles = (fcpxml: any): Title[] => {
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

const ClipTable = ({ }: Props) => {
  const fcpxml = useAppSelector(selectFcpxml);
  const [titles, setTitles] = useState<Title[]>([])

  useEffect(() => {
    setTitles(extractTitles(fcpxml));
  }, [fcpxml])

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {titles.map((title: any, index: number) => <Row key={index} index={index} title={title} />)}
          {
            titles.length === 0 &&
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>Nessun elemento trovato</td>
            </tr>
          }
        </tbody>
      </Table>
    </div >
  )
}

export default ClipTable