import _ from 'lodash'
import firebase from '../../../common/firebase/firebase'

const db = firebase.firestore()

const addEventFirestore = async ({matchId,...event}) => {
  await db.collection(`teams/5d43f02a08d1d35013f5b38b/matches/${matchId}/events`).doc().set(event)
}

const useAddEvent = matchId => {
  const addEvent = event => {
    addEventFirestore({matchId,...event})
  };
  return addEvent;
};

export default useAddEvent;
