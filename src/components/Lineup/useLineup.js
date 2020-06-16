import { usePlayerDnD } from "../../common/hooks/usePlayerDnD";
import * as R from "ramda";
import reduceReducers from "reduce-reducers";

const groupByLines = R.groupBy((item) => {
  const { row, position } = item;
  const isDefender = position && position.split("_")[1] === "DEFENDER";
  const positionString = isDefender ? "DEFENDER" : "ATTACKER";
  return `${row}_${positionString}`;
});

const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  keyMapper = ({ droppableId }) => droppableId
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[keyMapper(droppableSource)] = sourceClone;
  result[keyMapper(droppableDestination)] = destClone;

  return result;
};
const moveReducer = (state, action) => {
  const lineNum = ({ droppableId }) => droppableId.split("-")[1];
  if (action.type === "MOVE") {
    const { lines } = state;
    const { source, destination } = action;

    const sourceArray = lines[lineNum(source)];
    const destArray = lines[lineNum(destination)];
    const result = move(sourceArray, destArray, source, destination, lineNum);

    return {
      ...state,
      lines: {
        ...state.lines,
        ...result,
      },
    };
  }
  return state;
};
const reducer = (state, action) => {
  switch (action.type) {
    case "playersFetched":
      const lines = R.compose(groupByLines)(action.players);
      return { lines };
    default:
      return state;
  }
};

export const useLineup = (props) => {
  const { state, dispatch, onDragEnd } = usePlayerDnD(
    {
      lines: {},
    },
    reduceReducers({}, reducer, moveReducer)
  );
  const { lines } = state;
  console.log(lines);
  return { lines, onDragEnd };
};
