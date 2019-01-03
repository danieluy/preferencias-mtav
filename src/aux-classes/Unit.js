class Unit {
  constructor(id, dorms, priority) {
    this.id = id;
    this.dorms = `d${dorms}`;
    this.priority = (priority || priority === 0) ? priority : -1;
  }
}

export default Unit;
