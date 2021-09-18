import React, { Component } from "react";

export class Newsitems extends Component {
  render() {
    let { title, description, imgUrl, newsurl, author, date, source } =
      this.props;

    return (
      <div>
        <div className="card">
          <img
            src={
              !imgUrl
                ? "https://etimg.etb2bimg.com/thumb/msid-86160125,imgsize-28350,width-800,height-434,overlay-etbrandequity/former-netflix-marketing-head-swati-mohan-joins-heads-up-for-tails-as-cbo.jpg"
                : imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <span
              class="position-absolute top-0  translate-middle badge rounded-pill bg-success"
              style={{ left: "87%", zIndex: "1" }}
            >
              {source}
            </span>
            <h5 className="card-title">{title}...</h5>

            <p className="card-text">{description}...</p>
            <p class="card-text">
              <small class="text-muted">
                Author : {!author ? "Unkonwn" : author} {", "}
                {new Date(date).toLocaleDateString()}
                {", "}
                {new Date(date).toLocaleTimeString()}
              </small>
            </p>
            <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitems;
