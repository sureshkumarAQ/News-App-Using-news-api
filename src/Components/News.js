import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  // For state in class based component
  constructor(props) {
    super(props);
    console.log("Hello Im constructure");
    this.state = {
      articles: [],
      // Loading is for spinner initialy true
      loading: true,
      page: 1,
    };

    document.title = `${this.capitalizeTxt(this.props.category)} - News Monkey`;
  }
  capitalizeTxt = (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
  };
  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4fb920dc280e4086b38f64a284507e4f&page=${this.state.page}&pageSize= ${this.props.pageSize}`;

    // After hit api or url we set loading is true
    {
      this.setState({ loading: true });
    }

    // Take all data from api in data variable
    let data = await fetch(url);

    // Take data in json formate
    let parsedData = await data.json();

    // change state
    this.setState({
      // change state of article array
      articles: parsedData.articles,

      // Total number of article
      totalResults: parsedData.totalResults,
      // After loading all the content we set loading is false
      loading: false,
    });
  }

  // Fetch api
  async componentDidMount() {
    console.log("Im api");

    // Every unique url of article
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4fb920dc280e4086b38f64a284507e4f&page=1&pageSize= ${this.props.pageSize}`;

    // // After hit api or url we set loading is true
    // {
    //   this.setState({ loading: true });
    // }

    // // Take all data from api in data variable
    // let data = await fetch(url);

    // // Take data in json formate
    // let parsedData = await data.json();

    // // change state
    // this.setState({
    //   // change state of article array
    //   articles: parsedData.articles,

    //   // Total number of article
    //   totalResults: parsedData.totalResults,
    //   // After loading all the content we set loading is false
    //   loading: false,
    // });

    this.updateNews();
  }

  nextClick = async () => {
    // If statement for checking next page 15 article per page
    // if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 9)) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4fb920dc280e4086b38f64a284507e4f&page=${this.state.page + 1}&pageSize= ${this.props.pageSize}`;

    //   {
    //     this.setState({ loading: true });
    //   }

    //   let data = await fetch(url);
    //   let parsedData = await data.json();

    //   // For displaying next page article we change the state of page number
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });

    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();

    // }
  };
  prevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apikey=4fb920dc280e4086b38f64a284507e4f&page=${
    //   this.state.page - 1
    // }&pageSize= ${this.props.pageSize}`;

    // {
    //   this.setState({ loading: true });
    // }

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });

    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews();

    console.log("prev");
  };

  render() {
    console.log("Hey This is Render");
    return (
      <div className="container my-3">
        <h2 className="text-center my-10" style={{ margin: "30px 0px" }}>
          NewsMonkey - {this.capitalizeTxt(this.props.category)} Top Headlines
        </h2>
        {/* //loading component */}
        {this.state.loading && <Spinner />}
        <div className="row my-10">
          {/* If loading is true the we don`t want to see any content !this.state.loading is for this*/}
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitems
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 100)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.prevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 9)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.nextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
