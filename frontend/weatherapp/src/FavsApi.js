
import axios from "axios";



const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";


class FavsApi {

 
    static token;
    
    static async request(endpoint, data = {}, method = "get") {
        console.log("Current token ", FavsApi.token);
    
        console.log("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
       // Only add the Authorization header if the token is available
       const headers = FavsApi.token 
       ? { Authorization: `Bearer ${FavsApi.token}` } 
       : {};
    
    const params = (method === "get") ? data : {};
        
      try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }
    
      // Individual API routes
    
      /** Get the current user. */
    
      static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        console.log("getCurrentUser",res.user)
        return res.user;
      }
    
    
      /** Get list of locations (filtered by title if not undefined) */
    
      static async getFavs(location) {
        let res = await this.request("favorites", { location });
        return res.favorites;
      }
    

   
    
      /** Get token for login from username, password. */
    
      static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
      }

      /** Signup for site. */
    
      static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
      }
    
      /** Save user profile page. */
    
      static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
      }
      
      
      
      static async addFav(location, userId) {
        try {
            const data = { location, user_id: userId }; 
          const res = await this.request('favorites', data, 'post');
          return res.favLocations; // Adjust according to the actual response structure
        } catch (error) {
          console.error("Failed to add favorite location:", error);
          throw error; 
        }
      }
      
     

      static async getFavsByUserId(userId) {
        const endpoint = `favorites/${userId}`;
        const params = { user_id: userId }
        console.log("getFAv", params) // Include user_id in the query params if provided
        try {
            const res = await this.request(endpoint, {}, "get");
            console.log("result", res)
            return res.favLocation; // Make sure to adjust based on how your backend formats the response
        } catch (error) {
            console.error("Failed to fetch favorite locations:", error);
            throw error;
        }
    }
    static async deleteFav(id) {
      try {
        const res = await this.request(`favorites/${id}`, {}, 'delete');
        return res.deleted; // Assuming the backend returns { deleted: id }
      } catch (error) {
        console.error("Failed to delete favorite location:", error);
        throw error;
      }
    }
    
    
    }
   
    
    
    
    export default FavsApi;
    
