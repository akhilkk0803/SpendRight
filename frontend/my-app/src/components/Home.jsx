import React, { useEffect } from "react";
import logo from "../img/logo-final.png";
import money from "../img/money.jpg";
import "../App.css";
import { NavLink } from "react-router-dom";
const Typewriter = () => {
  useEffect(() => {
    const TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

      var that = this;
      var delta = 150 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 3;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };

    const elements = document.getElementsByClassName("typewrite");
    for (let i = 0; i < elements.length; i++) {
      const toRotate = elements[i].getAttribute("data-type");
      const period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }

    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);

    // Clean up function
    return () => {
      document.body.removeChild(css);
    };
  }, []);

  return (
    <h1>
      <a
        href=""
        className="typewrite"
        data-period="2000"
        data-type='["SpendRight to Track Expenses.","Track your Expenses with your family and friends"]'
      >
        <span className="wrap"></span>
      </a>
    </h1>
  );
};

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="navbar">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="logo" className="logo-main" />
          </NavLink>
          <a href="/Public/index.html" style={{ textDecoration: "none" }}>
            {" "}
            <span id="SpendRight"> SpendRight</span>{" "}
          </a>
        </div>
        <div className="buttons">
          <NavLink to="/login">
            <button className="button-1" role="button">
              Login
            </button>
          </NavLink>
          <NavLink to="/signup">
            {" "}
            <button className="button-1" role="button">
              Sign Up <i className="fa-solid fa-arrow-right"></i>
            </button>
          </NavLink>
        </div>
      </div>

      <div className="container-mains">
        <div className="letters">
          <Typewriter />
        </div>
        <div className="getstarted">
          <NavLink to="/login">
            <button className="button-1" role="button">
              Get started <i className="fa-solid fa-arrow-right"></i>
            </button>
          </NavLink>
        </div>

        <img src={money} alt="main-image" className="main-image" />
      </div>
      <div class="headline-feature">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35px"
          height="35px"
          fill="currentColor"
          class="bi bi-star-fill feature-icon"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
        <h2>Our Features</h2>
      </div>
      <hr />
      <div class="features">
        <div class="app-features">
          <div class="features-headlines">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 feature-icon"
              height="32px"
              width="32px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
              />
            </svg>

            <h4>Dashboard</h4>
          </div>
          <br />
          <p>
            Experience seamless financial transparency with our website's
            intuitive dashboard.Track amounts lent and borrowed from friends and
            family effortlessly. Simplify your financial interactions,making
            every transaction clear and accessible at a glance.
          </p>
        </div>
        <div class="app-features">
          <div class="features-headlines">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 feature-icon"
              height="32px"
              width="32px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>

            <h4>Expense Manager</h4>
          </div>
          <br />
          <p>
            Easily manage expenses with our app. Just add costs, specify
            amounts, and choose who's sharing. The app calculates everyone's
            share automatically, making it simple to split expenses and keep
            things fair. No more hassle in tracking and sharing costs we've got
            it covered!
          </p>
        </div>
        <div class="app-features">
          <div class="features-headlines">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              height="32px"
              fill="currentColor"
              class="bi bi-stopwatch feature-icon"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
              <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
            </svg>

            <h4> Real Time Updates</h4>
          </div>
          <br />
          <p>
            See what you owe or are owed right when you log in. Our platform
            gives instant updates, so when your friends log in, they can quickly
            check the amounts. It's an easy way to stay on top of who owes what,
            keeping things simple and clear.
          </p>
        </div>
        <div class="app-features">
          <div class="features-headlines">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              height="32px"
              fill="currentColor"
              class="bi bi-clock-history feature-icon"
              viewBox="0 0 16 16"
            >
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483m.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535m-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
            </svg>

            <h4> Activity History</h4>
          </div>
          <br />
          <p class="feature-info">
            Check your financial history hassle-free! Our Activity History tab
            keeps it simple—see who owes, what's owed, and settlement statuses.
            Stay organized and get a quick overview of all financial activities.
            Easily track and settle up using this dedicated feature.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
