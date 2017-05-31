var tds = document.getElementById("data_table").getElementsByTagName("td");
[].forEach.call(tds, function (elem) {
    elem.style.height = document.documentElement.clientHeight + "px";
});
document.getElementById("page_4").style.height = document.documentElement.clientHeight + "px";
