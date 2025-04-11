// header.html 찾기
fetch("http://www.enterprise1.co.kr/header.html", { cache: 'force-cache' }) //절대경로로 지정
.then(response => {
    return response.text()
})
.then(data => {
    
    document.querySelector("header").innerHTML = data;
});

// footer.html 찾기
fetch("http://www.enterprise1.co.kr/footer.html", { cache: 'force-cache' }) //절대경로로 지정
.then(response => {
return response.text()
})
.then(data => {
document.querySelector("footer").innerHTML = data;
});