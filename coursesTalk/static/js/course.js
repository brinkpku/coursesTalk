//basic function
function hide(ele) {
    ele.style.display = "none";
}

function show(ele) {
    ele.style.display = "block";
}
/**********************************/

//折叠课程介绍信息
let course_div = document.getElementsByClassName('course_info')[0];
let fulltext = course_div.innerHTML;
let show_length = parseInt(fulltext.length * 0.2);
let show_text = fulltext.substring(0, show_length) + "……";
let newBox = document.createElement("div");
newBox.innerHTML = show_text;
let btn = document.createElement("span");
btn.id = "fulltext";
btn.textContent = "显示全部↓";
btn.onclick = function() {
    if (btn.textContent == "显示全部↓") {
        btn.textContent = "收起↑";
        // btn.id="collapse";
        newBox.innerHTML = fulltext;
    } else {
        btn.textContent = "显示全部↓";
        // btn.id="fulltext";
        newBox.innerHTML = show_text;
    }
}
course_div.innerHTML = "";
course_div.appendChild(newBox);
course_div.appendChild(btn);
/*********************************************************/

//弹窗相关
let c_btn = document.getElementById("comment_btn");
let c_frm = document.getElementById("comment_form");
let e_btn = document.getElementById("experience_btn");
let e_frm = document.getElementById("experience_form");
let f_btn = document.getElementById("file_btn");
let f_frm = document.getElementById("file_form");
let bd = document.getElementsByTagName('body')[0];
let btn_arr = new Array(c_btn, e_btn, f_btn);
let frm_arr = new Array(c_frm, e_frm, f_frm);
let mask = document.createElement("div");
mask.id = "mask"; //遮罩层，绑定id应用css样式
resize_mask();
bd.insertBefore(mask, bd.childNodes[0]);
let active_frm;
mask.onclick = function() {
    hide(mask);
    hide(active_frm);
    bd.style.overflow = "auto";
};
set_form_position();
btn_arr.forEach(function(item, index) {
    //为每一个按钮绑定事件
    item.onclick = function() {
        // console.log(item,"add listener");
        bd.style.overflow = "hidden";
        show(mask);
        show(frm_arr[index]);
        active_frm = frm_arr[index];
        //关闭按钮绑关闭事件
        active_frm.firstElementChild.childNodes[3].onclick = mask.onclick;
    };
});

window.onresize = function(){//窗口发生变化时，进行调整
    resize_mask();
    set_form_position();
};

function resize_mask() { //根据屏幕设置遮罩层大小
    mask.style.width = window.innerWidth + "px";
    mask.style.height = window.innerHeight + "px";
}

function set_form_position() {//根据屏幕设置form位置
    frm_arr.forEach(function(item, index) {
        item.style.left = document.body.clientWidth * 0.25 + "px";
    });
}
