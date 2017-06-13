#-*- coding:utf8 -*-
#!usr/bin/env python3

import requests
from lxml import etree
from urllib.parse import urljoin
import pymysql
from time import sleep
from datetime import datetime as dt

url = 'http://dean.pku.edu.cn/notice/subpagemoreinfo.php'

while 1:
    rsps = requests.get(url)
    rsps.encoding = "GB2312"
    h = etree.HTML(rsps.content)
    res = h.xpath('//ul[@class="articles"]/li[position()<11]/a')
    values = [[i[0].text.strip(), urljoin(url, i.get('href')),
               i[1].text.strip()] for i in res]  # 提取新闻元数据
    # 创建连接
    print('got 10 news..')
    conn = pymysql.connect(host='127.0.0.1', port=3306,
                           user='root', passwd='', db='coursesTalk', charset='utf8')
    has_news = False
    with conn.cursor() as cursor:  # 创建游标
        sql = "select*from news where id in (select max(id) from news)"
        if cursor.execute(sql):
            last_record = cursor.fetchone()
            for j, i in enumerate(values[::-1]):
                if last_record[1] > i[0]:
                    # 数据库中日期记录比插入记录新
                    continue
                elif last_record[1] == i[0] and last_record[2] == i[1]:
                    # 日期相等且url相等，是已经存储的新闻
                    continue
                else:
                    values = values[:10 - j]
                    has_news = True
                    break
        else:
            has_news = True  # 数据里没有数据，所有新闻都是新的
    if has_news:
        with conn.cursor() as cursor:
            sql = "insert into news(id,date,url,title) values (%s,%s,%s,%s)"
            for i in values[::-1]:  # 取倒叙使新的新闻id时间更新
                i.insert(0, dt.today().strftime("%Y-%m-%d %H:%M:%S"))
                print('new data:', i)
                sleep(1.5)
            effect_row = cursor.executemany(sql, values[::-1])
            print(dt.today().strftime("%Y-%m-%d %H:%M:%S"),
                  'updated', effect_row, 'news..')
            # 提交，不然无法保存新建或者修改的数据
            conn.commit()
    else:
        print(dt.today().strftime("%Y-%m-%d %H:%M:%S"), 'no more news..')
    # 关闭连接
    conn.close()
    sleep(7200)
