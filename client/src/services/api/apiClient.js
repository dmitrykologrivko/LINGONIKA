import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'KEI04yYP5JUVnMIWuWKOCvVBDmoY0PjVSaByFgAx3cD5wwpHo9liQ4Bz3UNoMe0O' // TODO: Temp solution
  }
});
