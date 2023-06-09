import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";


axios.defaults.baseURL = 'http://localhost:5053/'

const responsBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responsBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responsBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responsBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responsBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/api/activities/'),
    details: (id: string) => requests.get<Activity>(`/api/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/api/activities/', activity),
    update: (activity: Activity) => axios.put<void>(`/api/activities/${activity.id}`, activity),
    delet: (id: string) => requests.del<void>(`/api/activities?id=${id}`)
    /*delet: (id: string) => axios.delete<void>(`/api/activities/${id}`)*/
    /*http://localhost:5053/api/Activities?id=%7B1A244604-349F-481B-A1F9-07B74CCE03AE%7D*/
}

const agent = {
    Activities
}

export default agent;