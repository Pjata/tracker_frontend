import React, { useRef, useContext } from "react";
import styled from "styled-components";
import Events, { getColorForEvent } from "./Events";
import useOnClickOutside from "../common/hooks/useOnClickOutside";
import { RecordStateContext } from "./RecordState";

const Root = styled.div`
  width: 100%;
  height: ${props => `${props.height - 15}px`};
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  box-sizing: content-box;
  padding: 8px;
`;

const Choice = styled.div`
  background-color: ${props => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 20px;
  text-transform: uppercase;
  user-select: none;
`;

const EventsForSelection = [
  {
    event: { ...Events.FACEOFF }
  },
  {
    event: {
      ...Events.SHOOT,
      eventData: {
        shotOutcome: "SHOT_ON_GOAL"
      }
    },
    name: "Shot on Goal"
  },
  {
    event: {
      ...Events.SHOOT,
      eventData: {
        shotOutcome: "BLOCKED"
      }
    },
    name: "Missed/Blocked shot"
  },
  {
    event: {
      ...Events.SAVE
    }
  },
  {
    event: {
      ...Events.SHOT_AGAINST,
      eventData: {
        shotOutcome: "MISSED_THE_GOAL"
      }
    },
    name: "Missed/Blocked shot against"
  },
  {
    event: {
      ...Events.BLOCK
    }
  },
  {
    event: {
      ...Events.HIT
    }
  },
  {
    event: {
      ...Events.PENALTY
    }
  },
  {
    event: {
      ...Events.GOAL_AGAINST
    }
  }
];

const Selector = ({ setMode, imageSize, onSelect }) => {
  const { dispatch } = useContext(RecordStateContext);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    dispatch({
      type: "OUTSIDE_CLICK"
    });
  });
  const onSelectEvent = event => () => {
    dispatch({
      type: "EVENT_SELECTED",
      data: event
    });
  };
  const ChoiceComp = ({ eventSelection }) => {
    const {event} = eventSelection
    const name = eventSelection.name || event.name
    return (
      <Choice color={getColorForEvent(event)} onClick={onSelectEvent(event)}>
        {name}
      </Choice>
    );
  };
  const eventComps = EventsForSelection
    .map((eventSelection,i)=> <ChoiceComp key={i} eventSelection={eventSelection} />);

  return (
    <Root ref={ref} height={imageSize.height}>
      {eventComps}
    </Root>
  );
};

export default Selector;
