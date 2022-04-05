import { Draft } from "@reduxjs/toolkit";
import correggiTitoli from "../../utils/correggi-titoli";
import { FcpxmlState } from "./fcpxmlSlice";

const correggiTitoliReducer = (state: Draft<FcpxmlState>) => {
  state.fcpxml = correggiTitoli(state.fcpxml)
}

export default correggiTitoliReducer;