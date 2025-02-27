import { IPost } from "../interfaces/IPosts";
import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import Date from "./date";
import Link from "next/link";
import { PictureAsPdf } from "@mui/icons-material";
import router from "next/router";
import { Button } from "@mui/material";
import { Spinner } from "react-bootstrap";

const PostCard = ({
  _id,
  image,
  title,
  createdAt,
  body,
  author,
  page,
  resource,
  loading,
}: IPost) => {
  const mediaType =
    image?.type?.includes("video") ||
    image?.data.substring(0, 15).includes("video");
  const detailsPage = `my-3 media-resize shadow small`;
  const previewPage = `my-3 media-resize shadow small`;

  return (
    <div className="ml-2 my-3 mr-4 post-card pb-4">
      {!loading ? (
        <>
          {image && mediaType && (
            <video
              src={image?.data}
              controls
              className={page !== "details" ? previewPage : detailsPage}
            //   onLoadStart={handleVideoLoadStart}
            //   onLoadedData={handleVideoLoadEnd}
            />
          )}

          {image && !mediaType && (
            <img
              src={image?.data}
              className={page !== "details" ? previewPage : detailsPage}
              loading="lazy"
            />
          )}
        </>
      ) : (
        <div className="place-center">
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      )}

      {title && (
        <Link legacyBehavior href={_id ? `/post/${_id}` : `#`}>
          <a className="title-link mt-3 text-justify">{title}</a>
        </Link>
      )}
      {createdAt && <Date dateString={createdAt} />}
      {body && (
        <p
          className={
            page == "blog"
              ? "text-justify mb-3 mt-3 text-ellipsis"
              : "text-justify mb-3 mt-3"
          }
          dangerouslySetInnerHTML={{ __html: body }}
        >
        </p>
      )}
      {page !== "blog" && resource && (
        <div className="mb-3 flex justify-end">
          <a className="text-black" href={resource.data} download>
            <PictureAsPdf color="error" /> Click here to download resource
          </a>
        </div>
      )}
      <div className="flex justfiy-space-between">
        {author && (
          <Avatar authorName={author.name} authorImage={author.image} />
        )}
        {page === "blog" && (
          <Button
            className="ml-auto"
            onClick={(e) =>
              _id ? router.push(`/post/${_id}`) : e.preventDefault()
            }
          >
            Read More
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
