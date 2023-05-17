interface BaseRequestModel {
    url: string,
    successFunction: Function,
    errorFunction: Function,
    exceptionFunction: (e: Error) => void
}

export interface GetRequestModel extends BaseRequestModel { }

// export interface PostRequestModel extends BaseRequestModel {
//     body: object,
// }
//post, update etc.