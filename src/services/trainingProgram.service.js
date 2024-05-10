import axios from "axios";
import authHeader from './auth-header'

const API_URL = "http://localhost:9091/api/trainingProgram"; // Fixed port number and added a forward slash

class TrainingProgramService {
    getTrainingPrograms(){
        return axios.get(API_URL + '/list');
    }
}

export default new TrainingProgramService();