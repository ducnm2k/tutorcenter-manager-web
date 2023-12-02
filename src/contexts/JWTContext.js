import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession, sign } from '../utils/jwt';
// import { verify, sign } from '../utils/jwt';
// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          // const response = await axios.get('/api/account/my-account');
          const authProfile = await axios.get('/api/user/authProfile');
          const dataUser = authProfile.data.data;
          // console.log(dataUser);
          const user = {
            id: dataUser.id,
            displayName: dataUser.fullName,
            email: 'demo@minimals.cc',
            // password: 'demo1234',
            photoURL: '/static/mock-images/avatars/avatar_default.jpg',
            // phoneNumber: '+40 777666555',
            // country: 'United States',
            // address: '90210 Broadway Blvd',
            // state: 'California',
            // city: 'San Francisco',
            // zipCode: '94116',
            // about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
            role: dataUser.role,
            isPublic: true
          }

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/authenticate', {
      email,
      password
    });
    // const { accessToken, user } = response.data;
    const accessToken = response.data.data.access_token;
    const refreshToken = response.data.data.refresh_token;
    setSession(accessToken, refreshToken);

    const authProfile = await axios.get('/api/user/authProfile');
    const dataUser = authProfile.data.data;
    const user = {
      id: dataUser.id,
      displayName: dataUser.fullname,
      email,
      // password: '1',
      // photoURL: '/static/mock-images/avatars/avatar_default.jpg',
      // phoneNumber: '+40 777666555',
      // country: 'United States',
      // address: '90210 Broadway Blvd',
      // state: 'California',
      // city: 'San Francisco',
      // zipCode: '94116',
      // about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
      role: dataUser.role,
      isPublic: true
    }
    const JWT_SECRET = 'minimal-secret-key';
    const JWT_EXPIRES_IN = '5 days';
    // const accessToken=sign({ userId: user.id }, JWT_SECRET, {
    //   expiresIn: JWT_EXPIRES_IN
    // });
    // setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => { };

  const updateProfile = () => { };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
