export class Severity {
  constructor(title, element) {
    (this.occurences = []),
      (this.title = title),
      (this.totalBreaches = 0),
      (this.totalModels = 0),
      (this.totalUsers = 0),
      (this.element = element),
      (this.maxScore = 0),
      (this.innerElements = [
        { class: "breaches", text: `Total Breaches: ${this.totalBreaches}` },
        { class: "models", text: `Total Models: ${this.totalModels}` },
        { class: "users", text: `Total Users: ${this.totalUsers}` },
        { class: "score", text: `Max Score: ${this.maxScore}` },
      ]);

    (this.initializeEl = () => {
      let title = document.createElement("h4");
      title.innerHTML = this.title;

      this.element.appendChild(title);

      this.innerElements.forEach((div) => {
        let el = document.createElement("div");
        el.innerHTML = div.text;
        el.classList.add(div.class);

        this.element.appendChild(el);
      });
    }),
      this.initializeEl();
  }

  addOccurence(occurence) {
    this.occurences.push(occurence);
    this.analyseOccurences();
    this.updateHTML();
  }

  analyseOccurences() {
    // Total Breaches
    this.totalBreaches = this.occurences.length;
    const models = [];
    const users = [];

    // Max Score
    this.occurences.forEach((occurence) => {
      models.push(occurence.model);
      users.push(occurence.user);
      if (occurence.score > this.maxScore) {
        this.maxScore = occurence.score;
      }
    });

    // Distinct Models and users
    this.totalModels = [...new Set(models)].length;
    this.totalUsers = [...new Set(users)].length;
  }

  updateHTML() {
    const divs = [
      {
        class: "breaches",
        text: `Total Breaches: ${this.totalBreaches}`,
      },
      { class: "models", text: `Total Models: ${this.totalModels}` },
      { class: "users", text: `Total Users: ${this.totalUsers}` },
      { class: "score", text: `Max Score: ${this.maxScore}` },
    ];
    divs.forEach((div) => {
      let el = this.element.getElementsByClassName(div.class)[0];
      el.innerHTML = div.text;
    });
  }
}
