import React from "react";
import firebase from '../common/firebase/firebase'

const isAuthenticated = () => firebase.auth().currentUser
const NavBar = () => {

	const logout = () => firebase.auth().signOut()

	return (
		<div>
			{!isAuthenticated && (
				<button > Log in </button>
			)}
			{isAuthenticated && <button onClick={() => logout()}>Log out</button>}
		</div>
	);
};

export default NavBar;