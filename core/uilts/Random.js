const Dictionaries = {
    num: "0123456789",
    a_z: "abcdefghijklmnopqistuvwxyz",
    a_9: "0123456789abcdefghijklmnopqistuvwxyz012356789"
};

function math_random(len) {
    const num = Math.random() * len;
    return Math.floor(num);
}

function _RDM(type, len) {
    const dic = Dictionaries[type].split("");
    const dic_len = dic.length;
    const item = [];
    for (let index = 0; index < len; index++) {
        item.push(dic[math_random(dic_len)]);
    }
    return item.join('')
}

export default _RDM;
