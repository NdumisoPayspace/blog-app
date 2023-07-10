import http from "../http-common";

class Api {
    register(username, email, password){
        return http.post('/register', {
            username: username,
            email: email,
            password: password,
        })
    }

    login(username, password){
        return http.post('/login', {
            username: username,
            password: password,
        })
    }

    getPosts(){
        return http.get('/api/BlogPost/')
    }

    getMyPosts(){
        return http.get('/api/BlogPost/myPosts', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    getPost(Id){
        return http.get(`/api/BlogPost/${Id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    addPost(data){
        return http.post('/api/BlogPost', data, 
        {  headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }})
    }

    deletePost(Id){
        return http.delete(`/api/BlogPost/${Id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    editPost(data){
        return http.put('/api/BlogPost', data, {  
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
    }

    getUser(Id){
        return http.get(`/api/User/${Id}`)
    }
}

export default new Api();