import { username, password } from "../utils/config";

export const loginData = {
    invalidData: [
      {
        username: `${username}`,
        password: 'gagalaja'
      },
      {
        username: 'gagalaja',
        password: `${password}`      },
      {
        username: '',
        password: ''
      },
    ],
  };
