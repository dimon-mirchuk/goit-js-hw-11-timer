class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.start();
    this.markup = `
      <div class="field">
        <span class="value" data-value="days">11</span>
        <span class="label">Days</span>
      </div>

      <div class="field">
        <span class="value" data-value="hours">11</span>
        <span class="label">Hours</span>
      </div>

      <div class="field">
        <span class="value" data-value="mins">11</span>
        <span class="label">Minutes</span>
      </div>

      <div class="field">
        <span class="value" data-value="secs">11</span>
        <span class="label">Seconds</span>
      </div>`;

    this.root = document.querySelector(this.selector);
    this.root.insertAdjacentHTML("beforeend", this.markup);

    this.refs = {
      daysEl: this.root.querySelector('span[data-value="days"]'),
      hoursEl: this.root.querySelector('span[data-value="hours"]'),
      minsEl: this.root.querySelector('span[data-value="mins"]'),
      secsEl: this.root.querySelector('span[data-value="secs"]'),
    };
  }

  init() {
    const time = this.getTimeComponents(0);
    this.updateClockface(time);
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.updateClockface(time);
    }, 1000);
  }

  updateClockface({ days, hours, mins, secs }) {
    this.refs.daysEl.textContent = `${days}`;
    this.refs.hoursEl.textContent = `${hours}`;
    this.refs.minsEl.textContent = `${mins}`;
    this.refs.secsEl.textContent = `${secs}`;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const firstTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Sept 17, 2021"),
});

const secondTimer = new CountdownTimer({
  selector: "#timer-2",
  targetDate: new Date("Jan 01, 2022"),
});
