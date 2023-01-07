import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import LoadingBar from "react-top-loading-bar";

export default function Tiles(props) {
    //this is declare to fix the issue of useEffect running twice Cause of strict mode
    const effectRan = useRef(false);

    const { category, country, apiKey } = props;

    const pageSize = 6;
    const [totalResult, setTotalResult] = useState(0);
    const [progress, setProgress] = useState(0);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    async function fetchData() {
        let data = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${
                page + 1
            }&category=${category}&apiKey=${apiKey}`
        );

        data = await data.json();

        if (data.articles.length < 6) {
            setHasMore(false);
        }

        setArticles([...articles, ...data.articles]);
        setPage(page + 1);
    }

    useEffect(() => {
        if (effectRan.current === false) {
            async function getData() {
                setProgress(20);
                let data = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&category=${category}&apiKey=${apiKey}`
                );
                setProgress(50);
                data = await data.json();
                setProgress(70);

                setTotalResult(data.totalResults);
                setArticles(data.articles);
                setProgress(100);
            }

            getData();
            return () => {
                effectRan.current = true;
            };
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <LoadingBar
                color={"rgb(241, 25, 70)"}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <h1 className="text-center mt-3">{category}</h1>
            <InfiniteScroll
                dataLength={articles.length} //This is important field to render the next data
                next={fetchData}
                hasMore={articles.length !== totalResult && hasMore}
                loader={<Spinner></Spinner>}
            >
                <div className="container mb-4">
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div
                                    className="col-md-4 mt-4"
                                    key={element.url}
                                >
                                    <div className="card shadow h-100">
                                        <img
                                            src={
                                                element.urlToImage ||
                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRh3EJcqUUzZujlaH8DXGDp_pMypE1EoLrw&usqp=CAU"
                                            }
                                            className="card-img-top"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {element.title}
                                            </h5>
                                            <p className="card-text">
                                                {element.description}
                                            </p>
                                            <a
                                                href={element.url}
                                                className="btn btn-primary"
                                            >
                                                Read More
                                            </a>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">
                                                Published on{" "}
                                                {new Date(
                                                    element.publishedAt
                                                ).toLocaleDateString()}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}
