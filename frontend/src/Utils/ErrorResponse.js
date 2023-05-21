export default function setMessage(error) {
    return (
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
    )
}