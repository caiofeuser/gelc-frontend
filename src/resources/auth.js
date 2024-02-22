// chaves para o controle do localstorage
const TOKEN_KEY = '@gelc-auth-token';
const AUTH_USER_ID_KEY = '@gelc-auth-user-id';
const AUTH_USER_PERMISSION_KEY = '@gelc-auth-user-permissiom';

// verificar se o usuário está autenticado
export const isAuthenticated = ()=> localStorage.getItem(TOKEN_KEY) !== null;

// verificar se o usuário tem permissão exigida
export const isAuthorized = (permission) => {

	if(!permission) {
		return true;
	}

	let authenticatedUserPermission = localStorage.getItem(AUTH_USER_PERMISSION_KEY);

	if(authenticatedUserPermission === null) {
		return false;
	}

	if(permission==='max') {

		return authenticatedUserPermission === 'master';
	
	}else if(permission==='mid') {

		return authenticatedUserPermission === 'teacher' || authenticatedUserPermission === 'master'

	} else if(permission==='min') {

		return authenticatedUserPermission=== 'student' || authenticatedUserPermission === 'teacher' || authenticatedUserPermission === 'master'

	} else {

		return false;
	}

};

// retornar o token de acesso
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getAuthenticatedUserId = () => localStorage.getItem(AUTH_USER_ID_KEY);

export const getAuthenticatedUserPermission = () => localStorage.getItem(AUTH_USER_PERMISSION_KEY);


// realizar login
export const login = ({_id,permission,accessToken}) => {
  
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(AUTH_USER_ID_KEY, _id);
  localStorage.setItem(AUTH_USER_PERMISSION_KEY, permission);

};

// realizar logout
export const logout = () => {
  
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_ID_KEY);
  localStorage.removeItem(AUTH_USER_PERMISSION_KEY);


};