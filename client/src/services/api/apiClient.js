import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'wYOFvWvxkDzoSZMUB4n2fCXIviqqFvex4BqPNuSJDWsxPAC4KjDCKgo6tBlHOBOK' // TODO: Temp solution
  }
});
