Page({
  data: {
    listData: [
      { "code": "张飞", "text": "2015101111", "type": "软件外包班" },
      { "code": "刘备", "text": "2015101222", "type": "软件外包班" },
      { "code": "关羽", "text": "2015101333", "type": "软件外包班" },
      { "code": "赵云", "text": "2015101444", "type": "软件外包班" }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
  },
  backtCourse: function () {
    wx.navigateTo({
      url: '/pages/teacher/queryCourses/queryCourses'
    })
  }

});
