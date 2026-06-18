import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME,
	TIMEOUT
} from '@/config/app';
import {
	toLogin,
	checkLogin
} from '../libs/login';
import store from '../store';
import i18n from './lang.js';
const tabbarList = ['pages/index/index', 'pages/goods_cate/goods_cate', 'pages/order_addcart/order_addcart', 'pages/user/index']

/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER;
		
	const pages = getCurrentPages();
	const currentPage = pages[pages.length - 1];
	const route = currentPage ? currentPage.route : '';

	if (!noAuth) {
		//登录过期自动登录
		if (!store.state.app.token && !checkLogin()) {
			toLogin();
			return Promise.reject({
				msg: i18n.t(`未登录`)
			});
		}
	}
	if (store.state.app.token) header[TOKENNAME] = 'Bearer ' + store.state.app.token;

	return new Promise((reslove, reject) => {
		if (uni.getStorageSync('locale')) {
			header['Cb-lang'] = uni.getStorageSync('locale')
		}
		uni.request({
			url: Url + '/api/' + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			timeout: TIMEOUT,
			success: (res) => {
				if (noVerify)
					reslove(res.data, res);
				else if (res.data.status == 200)
					reslove(res.data, res);
				else if ([110002, 110003, 110004].indexOf(res.data.status) !== -1) {
					store.commit("LOGOUT");
					if(!tabbarList.includes(route)) {
						toLogin();
					} 
					reject(res.data);
				} else if (res.data.status == 100103) {
					uni.showModal({
						title: i18n.t(`提示`),
						content: res.data.msg,
						showCancel: false,
						confirmText: i18n.t(`我知道了`)
					});
				} else
					reject(res.data.msg || i18n.t(`系统错误`));
			},
			fail: (msg) => {
				let data = {
					mag: i18n.t(`请求失败`),
					status: 1 //1没网
				}
				// #ifdef APP-PLUS
				reject(data);
				// #endif
				// #ifndef APP-PLUS
				reject(i18n.t(`请求失败`));
				// #endif
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;
