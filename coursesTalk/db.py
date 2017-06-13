#!/usr/bin/env python3
# -*- coding:utf8 -*-
import pymysql
import pymongo


def get_news():
    conn = pymysql.connect(host='127.0.0.1', port=3306,
                           user='root', passwd='', db='coursesTalk', charset='utf8')
    with conn.cursor() as cursor:  # 创建游标
        sql = "select date,url,title from news order by id desc limit 6"
        cursor.execute(sql)
        res = cursor.fetchall()
    return res


client = pymongo.MongoClient()
db = client.coursesTalk
course = db.course