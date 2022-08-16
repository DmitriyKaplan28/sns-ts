import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatusFunctional = (props: ProfileStatusType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [])

    const editModeChange = () => {
        setEditMode(!editMode)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
        props.updateUserStatus(status)
    }

    return (
        <div>
            {!editMode && <div>
                <span onDoubleClick={editModeChange}>{props.status || '----'}</span>
            </div>}
            {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={editModeChange} value={status}/>
                </div>}
        </div>
    );

}