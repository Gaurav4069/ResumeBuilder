import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const STRAPI_URL = 'http://localhost:1337';

const axiosClient = axios.create({
    baseURL: `${STRAPI_URL}/api/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const saveUserResume = async (resumeData) => {
  return await axios.post(`${STRAPI_URL}/data-templates`, { data: resumeData });
};

// Fetch media content based on its ID (or other identifier)
const fetchMedia = async (mediaId) => {
  try {
    const response = await axiosClient.get(`upload/files/${mediaId}`);
    const ch= response.data.data.attributes.url ? `${STRAPI_URL}${response.data.data.attributes.url}` : null;
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
    for (let template of templates) {
      const thumbnailId = template.thumbnail?.[0]?.id;
      const preview_imageId = template.preview_image?.[0]?.id;

      // Construct full URLs
      if (thumbnailId) {
        const thumbnailUrl = `${STRAPI_URL}${template.thumbnail[0].url}`;
        template.thumbnailUrl = thumbnailUrl; // Attach the thumbnail URL
      }
      if (preview_imageId) {
        const preview_imageUrl = `${STRAPI_URL}${template.preview_image[0].url}`;
        template.preview_imageUrl = preview_imageUrl; // Attach the preview image URL
      }
    }

    return templates;
  } catch (error) {
    console.error("Error fetching resume templates:", error);
    return [];
  }
};


// CRUD Operations for User Resumes
const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

const GetUserResumes = (userEmail) => {
    const encodedEmail = encodeURIComponent(userEmail); // Encode email to avoid issues
    return axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${encodedEmail}`);
};

const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);

const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`);

const DeleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,
    fetchTemplates,
    saveUserResume
};
