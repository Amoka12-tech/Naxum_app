import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

let apiRoute;

apiRoute = axios.create({ baseURL: 'http://naxum_admin_demo.test/api' });


// async function saveKey(key, value) {
//     await SecureStore.setItemAsync(key, value);
// };

apiRoute.interceptors.request.use(async (req) => {
    const userData = await SecureStore.getItemAsync('_user');
    
    if (userData) {
      const data = JSON.parse(userData);
      console.log("Data: ", data.token);
      req.headers =  {
        'Accept': 'application/json',
        'Authorization': `Bearer ${data.token}`
      }
    }
  
    return req;
  });

export default apiRoute;