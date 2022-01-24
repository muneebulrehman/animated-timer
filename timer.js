class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
		startButton.addEventListener('click', this.start.bind(this));
		pauseButton.addEventListener('click', this.pause.bind(this));
		this.timeLeft = 30;
	}
	start() {
		this.tick();
		if (this.onStart) {
			this.onStart(this.timeRemaining);
		}
		this.interval = setInterval(this.tick.bind(this), 20);
	}
	tick() {
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) this.onComplete();
		} else {
			this.timeRemaining = this.timeRemaining - 0.02;
			if (this.onTick) this.onTick(this.timeRemaining);
		}
	}
	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}
	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}

	pause() {
		clearInterval(this.interval);
	}
}
