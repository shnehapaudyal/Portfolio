import axios from 'axios'
import { links } from '../config'
export const fetchRepo = (setRepo) => {
    axios.get(`${links.repoUrl}`)
        .then((response) => {
            setRepo(response.data)
        }, (error) => {
            console.log(error)
        });
}