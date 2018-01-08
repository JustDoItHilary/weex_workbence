const modal = weex.requireModule('modal');

/** -----------------slsj------------------*/
export function SET_SLSJ_LIST(state, {data}) {
    console.log(data)
    if (data !== null && data.length > 0) {
        for (let j = 0; j < data.length; j++) {
            let item = data[j];
            item.showed = false;//showed - 是否展开
            item.warning=false;// warning - 是否显示 （必选）
            if (item.data !== null && item.data.length > 0) {
                item.id = item.data[0].qid;
            }
            if (item.data !== null && item.data.length > 0) {
                for (let i = 0; i < item.data.length; i++) {
                    let ans = item.data[i];
                    ans.value = '';
                }
                let closeItem = {atype: 7};
                item.data.push(closeItem);
            }
            state.slsjList.push(item);
        }
    }
}
export function SET_SLSJ_ITEM(state, {item,index}) {
    state.slsjList[index]=item;
}



// //设置token
// export function SET_TOKEN(state,{token}) {
//     state.selfToken=token;
// }
// //设置 baseUrl
// export function SET_BASE_URL(state, {url}) {
//     state.baseUrl = url;
// }
