import { Draft, PayloadAction } from "@reduxjs/toolkit";
import getAssetClipOrClip from "../../utils/getAssetClipOrClip";
import { FcpxmlState } from "./fcpxmlSlice";

export type ModificaTitoliRigaReducerPayload = {
  index: number,
  lang1: string,
  lang2: string
}

const replaceTitles = (titles: any[], payload: ModificaTitoliRigaReducerPayload): any[] => {
  return titles.map((t: any, index) => {
    return index != payload.index ? t : {
      ...t,
      text: t.text.map((text: any, i: number, array: any[]) => {
        return {
          'text-style': {
            ...text['text-style'],
            '#text': text['text-style']['#text'] = i == 0 ? payload.lang1 : payload.lang2
          }
        }
      })
    }
  })
}

const modificaTitoliRigaReducer = (state: Draft<FcpxmlState>, action: PayloadAction<ModificaTitoliRigaReducerPayload>): void => {
  console.log('action', action)
  const clip = state.fcpxml.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(state.fcpxml)]
    .map((assetClip: any) => ({
      ...assetClip,
      title: replaceTitles(assetClip.title, action.payload)
    }))
  state.fcpxml.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(state.fcpxml)] = clip
};

export default modificaTitoliRigaReducer
