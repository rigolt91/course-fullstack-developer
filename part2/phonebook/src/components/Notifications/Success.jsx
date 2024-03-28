const Success = ({ message }) => {
    if(message === null) {
        return null
    }

    return (
        <div className="alert alert-success">{message}</div>
    )
}

export default Success