// menu管理
let usr_div=document.getElementsByClassName('usr_container')[0]; 
let m = document.getElementById("menu");
m.style.width=usr_div.clientWidth+"px";//控制menu宽度
m.style.marginLeft=usr_div.offsetLeft+"px";//控制menu位置
function show_menu() {
    m.style.display = "block";
}
function hide_menu() {
    m.style.display="none";
}
usr_div.onmouseover=function(){
    show_menu();
    usr_div.style.backgroundColor="#831717";
};
m.onmouseover=function(){
    show_menu();
    usr_div.style.backgroundColor="#831717";
};
usr_div.onmouseout=function(){
    hide_menu();
    usr_div.style.backgroundColor="#A52A2A";
};
m.onmouseout=function(){
    hide_menu();
    usr_div.style.backgroundColor="#A52A2A";
};