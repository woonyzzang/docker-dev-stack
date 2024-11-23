// import https from 'https';

export default function ({app, $config, $cookies, $axios, redirect}, inject) {
  // const agent = new https.Agent({
  //   rejectUnauthorized: false
  // });

  // 커스텀 axios 인스턴스 주입
  const instance = $axios.create();

  // [D] XSRF (Cross-Site Request Forgery)
  // if (!Object.is($cookies.get('XSRF-TOKEN'), undefined)) {
  //   instance.defaults.xsrfCookieName = 'XSRF-TOKEN';
  //   instance.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
  //   instance.defaults.headers.common['X-XSRF-TOKEN'] = $cookies.get('XSRF-TOKEN');
  // }

  // API 환경별 호스트 설정
  if (process.server) {
    instance.setBaseURL($config.API_URL);
  } else if (process.client) {
    // instance.setBaseURL('/api');
    instance.setBaseURL((process.env.LOCAL_CA)
      ? '/api'
      : $config.API_URL_BROWSER
    );
  }

  // xhr 요청 인터셉터
  // instance.interceptors.request.use(
  //   (config) => {
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );

  // xhr 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      // [D] 점검중 일 경우
      if (response?.data?.maintenance && response?.data?.code === -9999) {
        // 페이지 강제 리로드
        app.router.go();

        return;
      }

      return response;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // xhr 요청/응답 에러
  instance.onError((err) => {
    // if (axios.isAxiosError(err)) {
    //   const {status, config} = err.response;
    //
    //   console.log('%%%%% response:: ', err.response);
    //   console.log('%%%%% config:: ', err.config);
    //
    //   // if (status === 401 && config.url) {
    //   //   console.log('토큰 만료');
    //   //
    //   //   return instance.request(config);
    //   // }
    // }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const weekNames = ['일', '월', '화', '수', '목', '금', '토'];
    const ap = hours < 12 ? '오전' : '오후';

    console.error(`[에러 로그]: ${year}.${month}.${date} ${weekNames[day]}요일 ${ap} ${hours}:${minutes}:${seconds} - ${err}`);

    return Promise.reject(err);
  });

  inject('api', instance);
}
