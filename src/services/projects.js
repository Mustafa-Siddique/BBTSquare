import httpCommon from "../http-common";

class ProjectDataService{
    getAll(){
        return httpCommon.get("/projects");
    }

    get(id){
        return httpCommon.get(`/project?id=${id}`);
    }

    createProject(formData){
        return httpCommon.post('/createproject', formData);
    }

    createInterest(interestData){
        return httpCommon.post('/createinterest', interestData);
    }

    deleteInterest(id){
        return httpCommon.delete(`/interest?id=${id}`);
    }
}

export default new ProjectDataService();