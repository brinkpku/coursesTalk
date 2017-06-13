//basic function
function hide(ele) {
    ele.style.display = "none";
}

function show(ele) {
    ele.style.display = "block";
}
/**********************************/
let set_btn = document.getElementById("setting");
let s_frm = document.getElementById("dialog");
let bd = document.getElementsByTagName('body')[0];

let mask = document.createElement("div");
mask.id = "mask"; //遮罩层，绑定id应用css样式
resize_mask();
bd.insertBefore(mask, bd.childNodes[0]);
mask.onclick = function() {
    hide(mask);
    hide(s_frm);
    bd.style.overflow = "auto";
};

set_btn.onclick = function() {
    bd.style.overflow = "hidden";
    show(mask);
    show(s_frm);
    //关闭按钮绑关闭事件
    s_frm.firstElementChild.childNodes[3].onclick = mask.onclick;
};
window.onresize = function() { //窗口发生变化时，进行调整
    resize_mask();
};

function resize_mask() { //根据屏幕设置遮罩层大小
    mask.style.width = window.innerWidth + "px";
    mask.style.height = window.innerHeight + "px";
}
