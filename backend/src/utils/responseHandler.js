export function CreateSuccessRes(res, data, statusCode) {
    return res.status(statusCode).send({
        success: true,
        data: data
    })
}