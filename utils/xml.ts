import { XMLBuilder, XMLParser } from 'fast-xml-parser'

const alwaysArray = [
  'fcpxml.library.event.project.sequence.spine.asset-clip',
  'fcpxml.library.event.project.sequence.spine.clip'
];

const parser = new XMLParser({
  ignoreAttributes: false,
  processEntities: true,
  isArray: (name, jpath, isLeafNode, isAttribute): boolean => {
    return alwaysArray.indexOf(jpath) !== -1
}
});

const builder = new XMLBuilder({
  ignoreAttributes : false,
  format: true,
  suppressEmptyNode: true
});

export const parse = (xmlDataStr: string) => parser.parse(xmlDataStr)

export const build = (jsonObj: any) =>  builder.build(jsonObj)