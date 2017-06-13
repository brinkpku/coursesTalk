//basic function
function hide(ele) {
    ele.style.display = "none";
}

function show(ele) {
    ele.style.display = "block";
}
/**********************************/
let e_btn = document.getElementById("item_btn");
let e_frm = document.getElementById("experience_form");
let mask = document.createElement("div");
let bd = document.getElementsByTagName('body')[0];
mask.id = "mask"; //遮罩层，绑定id应用css样式
resize_mask();
bd.insertBefore(mask, bd.childNodes[0]);
mask.onclick = function() {
    hide(mask);
    hide(e_frm);
    bd.style.overflow = "auto";
};
set_form_position();
window.onresize = function() { //窗口发生变化时，进行调整
    resize_mask();
    set_form_position();
};
e_btn.onclick = function() {
    bd.style.overflow = "hidden";
    show(mask);
    show(e_frm);
    //关闭按钮绑关闭事件
    e_frm.firstElementChild.childNodes[3].onclick = mask.onclick;
};

function resize_mask() { //根据屏幕设置遮罩层大小
    mask.style.width = window.innerWidth + "px";
    mask.style.height = window.innerHeight + "px";
}

function set_form_position() { //根据屏幕设置form位置
    e_frm.style.left = document.body.clientWidth * 0.25 + "px";
}
