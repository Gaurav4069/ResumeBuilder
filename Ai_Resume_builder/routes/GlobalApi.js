import axios from 'axios'

const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api/',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})

const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data)

const GetUserResumes = (userEmail) => {
    const encodedEmail = encodeURIComponent(userEmail);  // Encode the email to '+' in the email error
    return axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${encodedEmail}`);
  };
// GET /api/:pluralApiId?filters[field][operator]=value  to filter the data acc to user fields from strapi

const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data)

const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")

const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id)

export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
}