import getAssetClipOrClip from './getAssetClipOrClip'
import * as xml from './xml'

const fixTitles = (titles: any[]): any[] => {
  return titles.map((t: any) => ({
    ...t,
    '@_name': `${t.text[0]['text-style']['#text'].split('\n')[0]} - ${t['@_name']}`,
    text: t.text.map((text: any, i: number, array: any[]) => ({
      'text-style': {
        ...text['text-style'],
        '#text': array[0]['text-style']['#text'].split('\n')[i] || text['text-style']['#text']
      }
    }))
  }))
}

function correggiTitoli(jsonObj: any): any {
  const assetClips = jsonObj.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(jsonObj)]
    .map((assetClip: any) => ({
      ...assetClip,
      title: fixTitles(assetClip.title)
    })
    )

  jsonObj.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(jsonObj)] = assetClips
  const output = xml.build(jsonObj);

  return xml.parse(correggiCaratteriSpeciali(output))

}

function correggiCaratteriSpeciali(str: string): string {
  return str.replace(/&apos;/g, "'")
}

export default correggiTitoli