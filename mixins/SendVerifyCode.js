export default {
	data() {
		return {
			disabled: false,
			text: this.$t('验证码'),
			runTime: undefined,
			captchaType: 'clickWord'
		};
	},
	methods: {
		sendCode() {
			if (this.disabled) return;
			this.disabled = true;
			let n = 60;
			this.text = this.$t('剩余') + n + "s";
			this.runTime = setInterval(() => {
				n = n - 1;
				if (n < 0) {
					clearInterval(this.runTime);
					this.disabled = false;
					this.text = this.$t('重新获取');
					return
				}
				this.text = this.$t('剩余') + n + "s";
			}, 1000);
		}
	},
	onHide() {
		clearInterval(this.runTime);
	}
};
