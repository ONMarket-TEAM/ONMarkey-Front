import api from './index';

export const authAPI = {
  // 로그인
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const result = response.data;

      if (result.accessToken) {
        return {
          success: true,
          message: '로그인 성공',
          data: result,
        };
      } else {
        return {
          success: false,
          message: '로그인에 실패했습니다.',
          data: null,
        };
      }
    } catch (error) {
      let errorMessage = '로그인에 실패했습니다.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
      } else if (error.response?.status >= 500) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }

      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
  },
};
