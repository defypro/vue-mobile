import helperJS from '@defy/helper-js'
import api from '@/api'

let _callback = null;

export default (callback = () => {
}) => {
    let url = helperJS.platform.isIOS() && navigator.userAgent.indexOf("webdebugger") === -1 ? window.$FIRST_URL : window.location.href;
    let errorCount = 0;
    let isError = false;

    _callback = callback;

    function getJSSDKConfig() {
        if (errorCount >= 1) return;
        api.GetWxJSSDK({
            Url: url,
        }).then(({result}) => {
            isError = false;
            const {appId, timestamp, nonceStr, signature} = result;
            wx.config({
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'checkJsApi',
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'onVoicePlayEnd',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard',
                ] // 必填，需要使用的JS接口列表
            });
            wx.ready(function () {
                console.warn('wx ready');
                if (!isError) {
                    setTimeout(function () {
                        setMenu();
                        _callback();
                    }, errorCount > 0 ? 1000 : 0);
                }
            });
        }).catch(e => {

        });
    }

    function setMenu() {
        wx.hideAllNonBaseMenuItem();
        console.warn('hideAllNonBaseMenuItem');
        // wx.showMenuItems({
        //     menuList: [
        //         "menuItem:share:appMessage",
        //         "menuItem:share:timeline"
        //     ]
        // });
    }

    wx.error(function (res) {
        console.warn('wx error');
        isError = true;
        errorCount++;
        console.log(res);
        url = window.$FIRST_URL = window.location.href;
        console.log(window.$FIRST_URL);
        console.log(window.location.href);
        getJSSDKConfig();
    });
    getJSSDKConfig();
}
