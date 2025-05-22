export default {
  onLoad() {
    // // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   menus: ['shareAppMessage', 'shareTimeline']
    // })
    // // #endif
  },
  
  onShareAppMessage() {
    return {
      title: '海拔科技',
      path: '/pages/index/index'
    }
  }
}