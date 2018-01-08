const modal = weex.requireModule('modal');

import {
    replaceTransfer, sortList
} from '../../mixins'

export function SET_FOLDER(state,{retdata}) {
    if(retdata.hasOwnProperty("table1")){
        state.cloudFile=retdata.table1;
    }
    if(retdata.hasOwnProperty("table2")){
        state.cloudFolder=retdata.table2;
    }
}


