import React, { useContext } from "react";
import Selector from "../Selector";
import PlayerSelector from "../PlayerSelector/PlayerSelector";
import FaceoffEventDataSelector from "../FaceoffEventDataSelector";
import { RecordStateContext } from "../RecordState";
import ShotTypeSelector from "../ShotTypeSelector";
import ShotOutcomeSelector from "../ShotOutcomeSelector";
import PeriodStartEdit from "../PeriodStartEdit";
import FaceoffEnemySelector from "../FaceoffEnemySelector";
import EventEditPopup from "../EventEditPopup";
import ShotTargetPositionSelector from "../ShotTargetPositionSelector";
import ShotPrimaryAssistLocation from "../ShotPrimaryAssistLocation";
import ShotPrimaryAssistTimeDifferenceSelector from "../ShotPrimaryAssistTimeDifferenceSelector";
import GeneralSelector from "../GeneralSelector";

const GoliePositions = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
];
const Screens = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
];
const EventWorkflow = (props) => {
  const { imageSize, onSelect, matchId } = props;
  const { state } = useContext(RecordStateContext);
  const { mode } = state;
  console.log(mode);
  return (
    <>
      {mode === "PLAYER_SELECTOR_ADD" && (
        <PlayerSelector imageSize={imageSize} />
      )}
      {mode === "PLAYER_SELECTOR" && <PlayerSelector imageSize={imageSize} />}
      {mode === "SELECTOR" && (
        <Selector onSelect={onSelect} imageSize={imageSize} />
      )}
      {mode === "FACEOFF_EVENT_DATA_SELECTOR" && (
        <FaceoffEventDataSelector imageSize={imageSize} />
      )}
      {mode === "EDIT_SHOT_TYPE" && <ShotTypeSelector imageSize={imageSize} />}
      {mode === "FACEOFF_ENEMY_SELECTOR" && (
        <FaceoffEnemySelector imageSize={imageSize} />
      )}
      {mode === "EDIT_SHOT_OUTCOME" && (
        <ShotOutcomeSelector imageSize={imageSize} />
      )}
      {mode === "PERIOD_START_EDIT" && (
        <PeriodStartEdit imageSize={imageSize} matchId={matchId} />
      )}
      {mode === "EDITING_EVENT" && <EventEditPopup imageSize={imageSize} />}
      {mode === "SELECT_SHOT_TARGET_POSITION" && <ShotTargetPositionSelector />}
      {mode === "EDITING_PRIMARY_PASS_LOCATION" && (
        <ShotPrimaryAssistLocation />
      )}
      {mode === "EDITING_PRIMARY_PASS_TIME_DIFFERENCE" && (
        <ShotPrimaryAssistTimeDifferenceSelector imageSize={imageSize} />
      )}
      {mode === "SELECT_GOALIE_POSITION" && (
        <GeneralSelector
          label="Goalie position"
          choices={GoliePositions}
          type="GOALIE_POSITION_SELECTED"
          typeKey={'goaliePosition'}
          imageSize={imageSize}
        />
      )}
      {mode === "SELECT_SCREEN" && (
        <GeneralSelector
          label="Screen"
          typeKey={'screen'}
          choices={Screens}
          type="SCREEN_SELECTED"
          imageSize={imageSize}
        />
      )}
    </>
  );
};

export default EventWorkflow;
