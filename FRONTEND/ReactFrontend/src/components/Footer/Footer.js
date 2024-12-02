/*!

=========================================================
* CRM Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.linkedin.com/in/nammouchi-brahim-063b3b75/
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/brahimnammouchi

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">

            </ul>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="https://linkedin.com/in/nammouchi-brahim-063b3b75/" target="_blank">BRAHIM NAMMOUCHI</a>, brahim.namouchi@gmail.com
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
