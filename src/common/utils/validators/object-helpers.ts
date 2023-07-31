import {UserType} from "../../../store/usersReducer";

export const updateObjectInArray = (items: UserType[], itemId: number, objUserPropName: keyof UserType,
                                    newUserObjProps: { followed: boolean }): UserType[] => {
    return items.map(i => {
            if (i[objUserPropName] === itemId) {
                return {...i, ...newUserObjProps}
            }
            return i;
        }
    )
}