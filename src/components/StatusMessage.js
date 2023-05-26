import React from 'react'

function StatusMessage(props) {
    // If invalid city name searched then show error message.
    if (props.messageData) {
        return (
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">{props.messageData}</strong>
            </div>
        )
    }
}

export default StatusMessage
