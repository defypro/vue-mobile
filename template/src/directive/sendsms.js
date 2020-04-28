import {loading, toast} from '@/components/LayerLite';
import api from '../api'

export default {
    bind: function (el, binding) {
        let timer = null;
        el.$mobile = binding.value;
        el.onclick = () => {
            if (timer) return;
            const mobile = el.$mobile;
            if (mobile.length !== 11) {
                toast('请输入正确手机号码');
                return;
            }
            loading.open();
            api.SendMessagesNew({
                userinfo: {
                    usermobile: mobile,
                    bussinessType: "1",
                    notifytype: "1",
                    "clientip": "10.20.26.35"
                },
            }).then(({status, msg}) => {
                loading.close();
                if (status !== '10000') {
                    toast(msg || '验证码发送失败');
                } else {
                    let time = 59;
                    el.innerText = time + 'S';
                    timer = setInterval(() => {
                        el.innerText = --time + 'S';
                        if (time === 0) {
                            clearInterval(timer);
                            timer = null;
                            el.innerText = '获取验证码';
                        }
                    }, 1000);
                }
            })
        };
    },
    update(el, binding) {
        el.$mobile = binding.value
    },
}
