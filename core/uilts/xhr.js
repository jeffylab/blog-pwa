import qs from "qs";
const xhr = new XMLHttpRequest();

function request(url, data) {
    return new Promise((resolve, reject) => {
        // xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                resolve(JSON.parse(this.responseText));
            }
        });

        xhr.open("POST", "https://image.xiexiaoshun.com/" + url);
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        xhr.setRequestHeader("Cache-Control", "no-cache");

        xhr.send(qs.stringify(data));
    });
}

export default request;
