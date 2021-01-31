import { initializeGraph } from "./initialiseGraph.js";

export class Totals {
  constructor() {
    this.models = [];
    this.users = [];
    this.breachesTotal = 0;
    this.modelsTotal = 0;
    this.usersTotal = 0;
    this.breachesEl = document.getElementById("number-of-breaches");
    this.modelsEl = document.getElementById("number-of-models");
    this.usersEl = document.getElementById("number-of-users");
    this.graphData = [{ value: 0, time: new Date() }];
    this.importGraphData();
  }
  calculateTotals() {
    this.usersTotal = [...new Set(this.users)].length;
    this.modelsTotal = [...new Set(this.models)].length;
  }
  addEvent(event) {
    this.breachesTotal++;
    this.users.push(event.user);
    this.models.push(event.model);
    this.calculateTotals();
    this.breachesEl.innerText = this.breachesTotal;
    this.modelsEl.innerText = this.modelsTotal;
    this.usersEl.innerText = this.usersTotal;
    
  }
  distinctInstances(value, index, self) {
    return self.index0f(value) === index;
  }
  importGraphData() {
    this.graphData.push({
      value: this.breachesTotal,
      time: new Date(),
    });
    initializeGraph(this.graphData);
  }
}
