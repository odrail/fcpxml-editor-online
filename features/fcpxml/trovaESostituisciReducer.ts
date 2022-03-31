import { Draft, PayloadAction } from "@reduxjs/toolkit";
import getAssetClipOrClip from "../../utils/getAssetClipOrClip";
import { FcpxmlState } from "./fcpxmlSlice";

export type TrovaESostituisciReducerPayload = {
  trova: string,
  sostituisci: string
}

const replaceTitles = (titles: any[], payload: TrovaESostituisciReducerPayload): any[] => {
  return titles.map((t: any) => ({
    ...t,
    text: t.text.map((text: any, i: number, array: any[]) => ({
      'text-style': {
        ...text['text-style'],
        '#text': text['text-style']['#text'].replace(payload.trova, payload.sostituisci)
      }
    }))
  }))
}

const trovaESostituisciReducer = (state: Draft<FcpxmlState>, action: PayloadAction<TrovaESostituisciReducerPayload>): void => {
  const clip = state.fcpxml.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(state.fcpxml)]
    .map((assetClip: any) => ({
      ...assetClip,
      title: replaceTitles(assetClip.title, action.payload)
    }))
  state.fcpxml.fcpxml.library.event.project.sequence.spine[getAssetClipOrClip(state.fcpxml)] = clip
};

export default trovaESostituisciReducer
