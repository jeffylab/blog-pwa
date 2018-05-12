const getItem = key =>{
    const val = JSON.parse(window.localStorage.getItem(key));
    if(val==null){
        return {}
    }
    return val
}
const setItem = (key,obj)=>{
    const str = JSON.stringify(obj);
    window.localStorage.setItem(key,str)
}

export default {
    getItem,
    setItem
}