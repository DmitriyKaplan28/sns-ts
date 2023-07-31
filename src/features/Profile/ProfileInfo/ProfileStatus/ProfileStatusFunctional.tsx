import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatusFunctional = ({
                                            status,
                                            updateUserStatus
                                        }: ProfileStatusType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [profileStatus, setProfileStatus] = useState<string>(status)

    useEffect(() => {
        setProfileStatus(status)
    }, [status])

    const editModeChange = () => {
        setEditMode(!editMode)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileStatus(e.currentTarget.value)
        updateUserStatus(profileStatus)
    }

    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={editModeChange}>{status || '----'}</span>
            </div>}
            {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={editModeChange}
                           value={profileStatus}/>
                </div>}
        </div>
    );
}