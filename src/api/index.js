import axios from 'axios';

// 1. HTTP Request, Response, token 등 관련된 기본 설정
const config = {
    baseUrl: 'https://api.hnpwa.com/v0',
}

// 2. API 함수들을 정리
function fetchList(pageName) {
    console.log(pageName);
    return axios.get(`${config.baseUrl}/${pageName}/1.json`)
}
// async await의 예외처리를 api 호출 시 적용
async function fetchUserInfo(username) {
    try {
        return await axios.get(`${config.baseUrl}/user/${username}.json`)
    } catch (error) {
        console.log(error);
    }
}

async function fetchItem(id) {
    try {
        return await axios.get(`${config.baseUrl}/item/${id}.json`);
    } catch (error) {
        console.log(error);
    }
}
export {
    fetchUserInfo,
    fetchItem,
    fetchList,
}