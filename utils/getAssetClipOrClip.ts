const getAssetClipOrClip = (jsonObj: any): string => {
  return jsonObj.fcpxml.library.event.project.sequence.spine['asset-clip'] ? 'asset-clip' : 'clip'
}

export default getAssetClipOrClip