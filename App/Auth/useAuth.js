import {useContext} from 'react';
import AuthContext from './Context';
import auth from '@react-native-firebase/auth';

export default (useAuth = () => {
  const {user, setuser} = useContext(AuthContext);

  const login = token => {
    setuser(token);
  };

  const register = token => {
    setuser(token);
  };

  const logout = () => {
    auth().signOut();
    setuser('');
  };

  return {user, setuser, login, logout, register};
});
