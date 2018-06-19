var adddate
var temp = []
var addname
var addindex = 0
var addleftdays
var util = require('../../utils.js')
var app = getApp()


var index = app.globalData.index
Page({
  data: {
    dates: '',
  },
  onLoad: function () {
    var time = util.formatTime(new Date()); // 调用函数时，传入new Date()参数，返回值是日期和时间  
    this.setData({
      'dates': time
    });                                     // 再通过setData更改Page()里面的data，动态更新页面的数据  

    var tempOb = wx.getStorageSync('sg');
    var tempIndex = wx.getStorageSync('index');
    if (tempIndex) {
      app.globalData.index = tempIndex;
      addindex = tempIndex;
      index = tempIndex;
    }
    else {
      index = 0;
    }
    if (tempOb) {
      for (var i = 0; i < index; i++) {
        app.globalData.temp[i] = tempOb[i];
      }
    }
    else {
      tempOb = {};
      wx.setStorageSync('sg', tempOb);
    }
  },

  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    });
    adddate = e.detail.value;
    var leftDays = util.leftDays(this.data.dates, util.formatTime(new Date()));
    addleftdays = leftDays;

  },

  onNameConfirm: function (event) {
    var name = event.detail.value;
    if (name.length > 10) {
      name = name.substring(0, 10);
    }
    addname = name;
  },



  onconfirm: function () {
    var objectS = {
      name: addname,
      date: adddate,
      leftDays: addleftdays,
      index: addindex
    };
    if (!objectS.name || !objectS.date || !objectS.leftDays) {
      app.globalData.temp = [],
        wx.navigateBack({

        })
    }
    else {
      app.globalData.temp.push(objectS);
      wx.setStorageSync('sg', app.globalData.temp);
      addindex++;
      index++;
      wx.setStorageSync('index', index);
      wx.navigateBack({

      })
    }
  },

})