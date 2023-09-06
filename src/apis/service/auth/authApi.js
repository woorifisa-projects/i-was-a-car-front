import { instance } from '@/apis/index.js';

// 로그인 검증
const authAPI = async () => {
  const { data } = await instance.get('/members/auth');
  return data;
};

// 로그인
const loginAPI = async (body) => {
  const { data } = await instance.post('/members/login', body);
  return data;
};

// 로그아웃
const logoutAPI = async () => {
  const { status: data } = await instance.get('/members/logout');
  return data;
};

// 회원가입
const signupAPI = async (body) => {
  const { data } = await instance.post('/members/signup', body);
  return data;
};

// 회원수정
const updateMemberAPI = async (body) => {
  const { data } = await instance.put('/members', body);
  return data;
};

// 회원탈퇴
const deleteMemberAPI = async () => {
  const data = await instance.delete('/members');
  return data;
};

// 이메일 인증번호 발송
const sendEmailCodeAPI = async (body) => {
  const { data } = await instance.post('/auth/email', body);
  return data;
};

// 이메일 인증번호 검증
const verifyEmailCodeAPI = async (body) => {
  const { data } = await instance.post('/auth/email-confirm', body);
  return data;
};

export {
  authAPI,
  loginAPI,
  logoutAPI,
  signupAPI,
  updateMemberAPI,
  deleteMemberAPI,
  sendEmailCodeAPI,
  verifyEmailCodeAPI,
};
