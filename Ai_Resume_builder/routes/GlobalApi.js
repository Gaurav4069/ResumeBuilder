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



// Fetch media content based on its ID (or other identifier)
const fetchMedia = async (mediaId) => {
  try {
    const response = await axiosClient.get(`upload/files/${mediaId}`);
    const ch= response.data.data.attributes.url ? `${baseUrl}${response.data.data.attributes.url}` : null;
    console.log("gaur",ch);
    return ch;
  } catch (error) {
    console.error("Error fetching media:", error);
    return null;
  }
}
const fetchTemplates = async () => {
  try {
    const response = await axiosClient.get("resume-templates", {
      params: {
        populate: {
          thumbnail: {
            fields: ['url']
          },
          preview_image: {
            fields: ['url']
          }
        }
      },
    });
    const templates = response.data.data;

    // Fetch the media URLs for the thumbnail and preview image
    const baseUrl = "http://localhost:1337"; // Ensure base URL is correctly set
    for (let template of templates) {
      const thumbnailId = template.thumbnail?.[0]?.id;
      const preview_imageId = template.preview_image?.[0]?.id;

      // Construct full URLs
      if (thumbnailId) {
        const thumbnailUrl = `${baseUrl}${template.thumbnail[0].url}`;
        template.thumbnailUrl = thumbnailUrl; // Attach the thumbnail URL
      }
      if (preview_imageId) {
        const preview_imageUrl = `${baseUrl}${template.preview_image[0].url}`;
        template.preview_imageUrl = preview_imageUrl; // Attach the preview image URL
      }
    }

    return templates;
  } catch (error) {
    console.error("Error fetching resume templates:", error);
    return [];
  }
};



export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,

    fetchTemplates,
    fetchMedia
}