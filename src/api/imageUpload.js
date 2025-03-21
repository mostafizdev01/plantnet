import axios from "axios";

export const imageUpload = async imageData => {
    
    const formData = new FormData() // create a new empty object
    formData.append('image', imageData) //Example:====>> key---> image: value "image" ===>> and push the data form formData.
    
    // send image data to imgbb ================>>>>

    const { data } = await axios.post(`
      https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, formData) /// post the imgbb api.

      return data.data.display_url;
      
}