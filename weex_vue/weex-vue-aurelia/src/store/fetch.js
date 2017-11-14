const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')
const baseURL = 'https://hacker-news.firebaseio.com/v0'
const workworldBaseURL = 'http://im.yiyao365.cn/handle'
const slsjBaseURL = 'http://slsj.yy365.cn/'
const repBaseURL = 'http://daily.romens.cn/Handler/DailyAPIHandler.ashx?action='
const apiURL = {
    yiyaoUrl: 'http://im.yiyao365.cn/',
    jsBaseurl: 'http://weex.yy365.cn/',
    syUrl: 'http://im.yiyao365.cn/yyzs/',
    slsjUrl: 'http://slsj.yy365.cn/',
    // slsjGetFileTemplate: '/getFileTemplate',
    // slsjGetFileTemplate: 'resource/getFileTemplate',
    getNotices: '/handle',
    slsjGetTemplate: 'Resource/getFileTemplate',
    slsjEdit: 'Contact',

    rep: '/DailyAPIHandler.ashx',
    apply: ''
};

export function fetch(path) {
    // console.log(path);
    return new Promise((resolve, reject) => {
        stream.fetch({
            method: 'GET',
            url: path,
            type: 'json',
            // headers: {'Content-Type': 'application/json'}
        }, (response) => {
            // console.log('----------> post response: ' + JSON.stringify(response))
            if (response.status == 200) {
                resolve(response.data)
            }
            else {
                reject(response)
            }
        }, () => {
        })
    })
}

export function fetchByPost(path, body) {
    // console.log('----------> fetchByPost: ' + path)
    // console.log('----------> fetchByPost: ' + body)
    return new Promise((resolve, reject) => {
        stream.fetch({
            method: 'POST',
            url: path,
            type: 'json',
            body: body
        }, (response) => {
            // modal.alert({'message':JSON.stringify(response),'doation':1})
            // console.log('----------> post response: ' + response)
            // console.log('----------> post response: ' + JSON.stringify(response))
            if (response.status == 200 && response.ok) {
                resolve(response.data)
            } else {
                if (response.data != null) {
                    modal.toast({message: response.data, duration: 0.3})
                } else {
                    modal.toast({message: '请求失败', duration: 0.3})
                }
                reject(response)
            }
        }, () => {
        })
    })
}
export function fetchByPostWithHeader(path, body,header) {
    return new Promise((resolve, reject) => {
        stream.fetch({
            method: 'POST',
            url: path,
            headers: header,
            type: 'json',
            body: body
        }, (response) => {
            // console.log('----------> post response: ' + response)
            // console.log('----------> post response: ' + JSON.stringify(response))
            if (response.status == 200 && response.ok) {
                resolve(response.data)
            } else {
                if (response.data != null) {
                    modal.toast({message: response.data, duration: 0.3})
                } else {
                    modal.toast({message: '请求失败', duration: 0.3})
                }
                reject(response)
            }
        }, () => {
        })
    })
}

//
// export function fetchIdsByType(type) {
//     var path = `${baseURL}/${type}stories.json`
//     return fetch(path)
// }
//
// export function fetchItem(id) {
//     var path = `${baseURL}/item/${id}.json`
//     return fetch(path)
// }
//
// export function fetchItems(ids) {
//     return Promise.all(ids.map(id => fetchItem(id)))
// }
//
// export function fetchUser(id) {
//     var path = `${baseURL}/user/${id}.json`
//     return fetch(path)
// }

/** -----------------notice------------------*/
export function fetchNotices() {
    var body = 'QueryType=GetNotice&Params=%7B%7D&UserGuid=ODg4ODg4fEA1NzllZjJlMGVlNWY2fEA2YTkxYTg0MmU1ZDkwNzBhNDNkZDlkYzM5ZDljNTY1OQ--'
    // return fetchByPost(apiURL.getNotices, body)
    return fetchByPost(workworldBaseURL, body)
}

export function fetchNoticeItem() {
    var body = 'QueryType=getNoticeInfoFromGuId&UserGuid=ODg4ODg4fEA1NzllZjJlMGVlNWY2fEA2YTkxYTg0MmU1ZDkwNzBhNDNkZDlkYzM5ZDljNTY1OQ--&Params={"GUID":"58edc59264e881491977618"}';
    // return fetchByPost(apiURL.getNotices, body)
    return fetchByPost(workworldBaseURL, body)
}

/** -----------------SLSJ------------------*/
export function fetchSlsjTemp() {
    return fetch(apiURL.slsjUrl + apiURL.slsjGetTemplate)
    // return fetch(`${slsjBaseURL}Resource/getFileTemplate`)
}

export function fetchSlsjNew(body) {
    return fetchByPost(apiURL.slsjUrl + apiURL.slsjEdit, body)
    // return fetch(`${slsjBaseURL}Resource/getFileTemplate`)
}