import md5 from "js-md5";

const SALT = "add_&_salt";
function _MD5(pwd) {
    return md5(pwd + SALT);
}

export default _MD5;
