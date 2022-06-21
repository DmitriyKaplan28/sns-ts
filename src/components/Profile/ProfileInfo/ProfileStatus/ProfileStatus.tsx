import React, {ChangeEvent} from "react";

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}


export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    editModeActivate = () => {
        this.setState(
            {
                editMode: true,
            }
        )
    }

    editModeDeactivate = () => {
        this.setState(
            {
                editMode: false
            }
        );
        this.props.updateUserStatus(this.state.status);
    }

    changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.editModeActivate}>{this.props.status || '----'}</span>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <input onChange={this.changeStatus} onBlur={this.editModeDeactivate} value={this.state.status}/>
                    </div>}
            </div>
        );
    }
}