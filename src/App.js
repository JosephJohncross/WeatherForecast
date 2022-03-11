import { Today } from "./App/Today.js";
// import LogRocket from "logrocket";
// LogRocket.init("9qzk4s/weather-app");

class App {
  constructor() {
    this.navBar = document.querySelector(".navigation");
    this.backdrop = document.querySelector(".backdrop");
    this.menu = document.querySelector(".side-menu");
    this.menuIcon = document.querySelector(".side-menu .uil");

    this.menuIcon.addEventListener("click", this.menuIconHandler.bind(this));
    this.backdrop.addEventListener("click", this.menuIconHandler.bind(this));


    document.addEventListener("scroll", () => {

      if (this.menu.getBoundingClientRect().top === 0) {
        this.menu.style.backgroundColor = "#171750";
        this.menu.style.color = "white";
      }
      else{
        this.menu.style.backgroundColor = "transparent";
        this.menu.style.color = "black";
      }
    });
  }

  static init() {
    const doc = document.documentElement;
    doc.addEventListener("DOMContentLoaded", () => {});
    let test = new Today(3);
    test.generatingData();

    const searchButton = document.querySelector(".search");
    searchButton.addEventListener("click", () => {
      test = null;
      document.querySelector("main").textContent = "";
      new Today(3).generatingData();
    });
  }

  menuIconHandler() {
    this.navBar.classList.toggle("active");
    this.backdrop.classList.toggle("active");

    this.navBar.style.animationName = "animate-nav";
    this.navBar.style.animationDuration = ".4s";
    this.navBar.style.animationFillMode = "forwards";
  }
}

new App();
App.init();
