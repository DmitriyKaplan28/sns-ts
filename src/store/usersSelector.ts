import {AppStateType} from "./redux-store";
import {createSelector} from "reselect";

//простой селектор
export const getUsersPage = (state: AppStateType) => {
	return state.usersPage;
};

//селектор для выполнения сложных операций после простого селектора, например - map, filter
export const getUsersPageSuperSelector = createSelector(getUsersPage, (usersPage) => {
	return usersPage;
});