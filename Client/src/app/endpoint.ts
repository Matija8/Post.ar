const url = 'http://localhost:8000';

export const Endpoint = Object.freeze({
  REGISTER: url + '/register',
  LOGIN: url + '/login',
  USER: url + '/user',
  LOGOUT: url + '/logout',
  DRAFTS: url + '/drafts',
  INBOX: url + '/inbox',
  SENT: url + '/sent',
  TRASH: url + '/trash',
  SEND: url + '/send',
  STARRED: url + '/starred',
  CHANGE_THEME: url + '/user/changeTheme'
});
