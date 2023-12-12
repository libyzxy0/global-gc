async function verifyGoogleAccessToken(access_token) {
  const tokenInfoUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`;

  try {
    const tokenInfoResponse = await fetch(tokenInfoUrl);
    const tokenInfoData = await tokenInfoResponse.json();

    if (!tokenInfoResponse.ok) {
      console.error('Token verification failed:', tokenInfoData.error_description);
      return {
        success: false,
        data: {}
      };
    }

    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const userInfoResponse = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!userInfoResponse.ok) {
      console.error('Failed to retrieve user info:', userInfoResponse.statusText);
      return {
        success: false,
        data: {}
      };
    }

    const userInfoData = await userInfoResponse.json();

    const data = {
      id: tokenInfoData.sub,
      profileImage: userInfoData.picture,
      ...tokenInfoData,
      ...userInfoData
    };

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return {
      success: false,
      data: {}
    };
  }
}

export default async function useGoogleAuth(token) {
  try {
    const response = await verifyGoogleAccessToken(token);
    console.log("Auth", response)
    return {
      success: response.success, 
      data: response.data
    }
  } catch (error) {
    console.error("Failed auth", error);
    return {
      success: false,
      data: {}
    }
  }
}