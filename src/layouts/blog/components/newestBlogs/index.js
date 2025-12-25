import React from "react";
import { Link } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";
import blogData from "layouts/blogCategory/data/blogData";
import { Card, Grid } from "@mui/material";
import BlogHeading from "layouts/blog/components/blogHeading";
import BlogCard from "layouts/blogCategory/components/BlogCard";

function NewestBlogs(){
    const newest = [...blogData]
        .filter((b) => !!b.date) // đảm bảo có date
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4); // Lấy 4 blog mới nhất (tuỳ bạn điều chỉnh)
  
    return (
        <SoftBox>
            <SoftBox mb={4}>
                <BlogHeading level={3}>Newest Blogs</BlogHeading>
            </SoftBox>
            <Grid container spacing={3}>
                {newest.map((blog) => (
                    <Grid item key={blog.id} xs={12} sm={6} md={4} lg={3}>
                        <BlogCard
                            image={blog.image}
                            title={blog.title}
                            description={blog.description}
                            link={blog.link}
                        />
                    </Grid>
                ))}
            </Grid>
        </SoftBox>
    )
}

export default NewestBlogs;