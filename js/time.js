const Time = class {
  constructor() {
    this.lastUpdate = Date.now();
  }

  get delta() {
    const currentTime = Date.now();
    let delta = currentTime - this.lastUpdate;
    this.lastUpdate = currentTime;
    return delta;
  }
};

export default Time;
