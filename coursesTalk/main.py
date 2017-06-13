#!/usr/bin/env python3
# -*- coding:utf8 -*-
from flask import Flask, render_template, redirect, request

app = Flask(__name__)


@app.route('/')
def home():
    from db import get_news
    return render_template('home.html', news_lst=get_news())


@app.route('/s')
def search():
    return render_template('s.html')


@app.route('/profile')
def show_profile():
    return render_template('profile.html')


@app.route('/course/<course_id>')
def show_course(course_id):
    # fetch data from db by course_id
    from db import course
    res = course.find_one({'_id': course_id})
    types = {'A': '数学与自然科学', 'B': '社会科学', 'C': '哲学与心理学', 'D': '历史学', 'E': '语言学、文学、艺术与美育', 'F': '社会发展'}
    c_info = res['c_info']
    b_info = res['b_info']
    # 扩充类别信息
    c_info['type'] = ''.join([''.join((i, types[i], ';')) for i in c_info['type']])
    return render_template('course.html', course_id=course_id, c_info=c_info, b_info=b_info)


@app.route('/comments/<course_id>')
def show_comments(course_id):
    return render_template('comments.html', course_id=course_id)


@app.route('/experience/<course_id>')
def show_experience(course_id):
    return render_template('experience.html', course_id=course_id)


@app.route('/files/<course_id>')
def show_files(course_id):
    return render_template('files.html', course_id=course_id)


@app.route('/course_type/<t>')
def show_type(t):
    return render_template('course_type.html', t=t)


if __name__ == '__main__':
    app.debug = True
    app.run()
