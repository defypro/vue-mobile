import {loading, toast} from '@/components/LayerLite';

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
            setTimeout(() => {
                loading.close();
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
            });
        };
    },
    update(el, binding) {
        el.$mobile = binding.value
    },
}
