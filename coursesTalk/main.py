#!/usr/bin/env python3
# -*- coding:utf8 -*-
from flask import Flask, render_template, redirect, request

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


if __name__ == '__main__':
    app.debug = True
    app.run()
