const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')
const baseURL = 'https://hacker-news.firebaseio.com/v0'
const workworldBaseURL = 'http://im.yiyao365.cn/handle'
const slsjBaseURL = 'http://slsj.yy365.cn/'
const repBaseURL='http://daily.romens.cn/Handler/DailyAPIHandler.ashx?action='
const apiURL = {
    yiyaoUrl: 'http://im.yiyao365.cn/',
    jsBaseurl: 'http://weex.yy365.cn/',
    getBlackFile: '/getFileTemplate',
    getNotices: '/handle',
    // getBlackFile: 'http://slsj.yy365.cn/Resource/getFileTemplate',
    baseUrl: 'http://slsj.yy365.cn/Contact',

    rep:'/DailyAPIHandler.ashx',
    apply:''
};

export function fetch(path) {
    return new Promise((resolve, reject) => {
        stream.fetch({
            method: 'GET',
            url: path,
            type: 'json',
            // headers: {'Content-Type': 'application/json'}
        }, (response) => {
            // modal.toast({'message':JSON.stringify(response),'doation':1})
            // console.log('----------> get response: ' + response)
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
    console.log('----------> fetchByPost: ' + path)
    return new Promise((resolve, reject) => {
        stream.fetch({
            method: 'POST',
            url: path,
            type: 'json',
            body: body
        }, (response) => {
            // modal.alert({'message':JSON.stringify(response),'doation':1})
            // console.log('----------> post response: ' + response)
            console.log('----------> post response: ' + JSON.stringify(response))
            if (response.status == 200) {
                resolve(response.data)
            } else {
                reject(response)
            }
        }, () => {
        })
    })
}


export function fetchIdsByType(type) {
    var path = `${baseURL}/${type}stories.json`
    return fetch(path)
}

export function fetchItem(id) {
    var path = `${baseURL}/item/${id}.json`
    return fetch(path)
}

export function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
    var path = `${baseURL}/user/${id}.json`
    return fetch(path)
}

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
export function fetchSlsjNew() {
    return fetch(apiURL.getBlackFile)
    // return fetch(`${slsjBaseURL}Resource/getFileTemplate`)
}

/** -----------------REP------------------*/
export function fetchRep(body) {
    // var body = 'params={"code":"8b107c27c2b84630b5d12cad65d6e13b","startDate":"2017-03-01","endDate":"2017-06-26","type":1,"cros":""}'
    return fetchByPost(apiURL.rep+'?action=GetReports', body)
    // return fetchByPost(repBaseURL, body)
}

/** -----------------APPLY------------------*/
export function fetchApply(body) {
    // modal.alert({message:body,duration:1})
    // return fetchByPost(apiURL.getNotices,body)
    return fetchByPost(apiURL.yiyaoUrl+'handle',body)
}