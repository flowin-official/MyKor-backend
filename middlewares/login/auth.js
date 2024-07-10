import jwt from 'jsonwebtoken';

const generateKakaoAccessToken = async (results) => {
  const secrectKey = process.env.ACCESS_TOKEN_SECRET_KEY;
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;

  const kakaoId = results.user.kakaoId;
  const userEmail = results.user.userEmail;

  const payload = { kakaoId: kakaoId, userEmail: userEmail };

  try {
    const accessToken = jwt.sign(payload, secrectKey, { expiresIn: expiresIn });
    results.kakaoAccessToken = accessToken;
  } catch (err) {
    results.result = false;
    results.error.push("Kakao Access token generate failed");
  }
};

const generateKakaoRefreshToken = async (results) => {
  const secrectKey = process.env.REFRESH_TOKEN_SECRET_KEY;
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;

  const kakaoId = results.user.kakaoId;
  const userEmail = results.user.userEmail;

  const payload = { kakaoId: kakaoId, userEmail: userEmail };

  try {
    const refreshToken = jwt.sign(payload, secrectKey, { expiresIn: expiresIn });
    results.kakaoRefreshToken = refreshToken;
  } catch (err) {
    results.result = false;
    results.error.push("Kakao Access token generate failed");
  }
};

const generateAppleAccessToken = async (results) => {

};

const generateAppleRefreshToken = async (results) => {

};

export { generateKakaoAccessToken, generateKakaoRefreshToken, generateAppleAccessToken, generateAppleRefreshToken };