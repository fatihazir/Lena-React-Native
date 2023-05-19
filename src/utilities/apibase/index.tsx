import { GetRequestModel } from "../../models/typescript/http"

class ApiBase {
    Get = async (requestProps: GetRequestModel) => {
        await fetch(requestProps.url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => response.json()).
            then((json) => {
                if (json.status == 0) {
                    requestProps.errorFunction(json.status_message)
                }
                else {
                    requestProps.successFunction(json)
                }
            }).catch((err) => {
                this.ExLog(err)
                requestProps.exceptionFunction(err.toString())
            })
    }

    ExLog = async (err: any) => {
        //for instance --> log to db etc.
    }
}

export default new ApiBase