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
  const jsonObjClone = JSON.parse(JSON.stringify(jsonObj))
  const assetClips = jsonObjClone.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(jsonObjClone)]
    .map((assetClip: any) => ({
      ...assetClip,
      title: fixTitles(assetClip.title)
    })
    )

  jsonObjClone.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(jsonObjClone)] = assetClips
  const output = xml.build(jsonObjClone);

  return xml.parse(correggiCaratteriSpeciali(output))
}

function correggiCaratteriSpeciali(str: string): string {
  return str.replace(/&apos;/g, "'")
}

export default correggiTitoli