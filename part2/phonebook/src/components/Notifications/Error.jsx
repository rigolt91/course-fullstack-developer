const Error = ({ message }) => {
    if(message === null) {
        return null
    }

    return (
        <div className="alert alert-error">{message}</div>
    )
}

export default Error