import React from "react";

type ProfileStatusType = {
    status: string
}


export class ProfileStatus extends React.Component<ProfileStatusType> {
    state = {
        editMode: false
    }

    editModeActivate () {
        this.setState(
            {
                editMode: true
            }
        )
    }

    editModeDeactivate () {
        this.setState(
            {
                editMode: false
            }
        )
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.editModeActivate.bind(this)}>{this.props.status}</span>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <input onBlur={this.editModeDeactivate.bind(this)} value={this.props.status} />
                    </div>}
            </div>
        );
    }
}