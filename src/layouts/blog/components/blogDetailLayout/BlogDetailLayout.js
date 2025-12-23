// layouts/blog/BlogLayout.js

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useEffect } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Reuse sidebar components
import NextBlogs from "layouts/blog/components/nextBlogs";
import BlogTitle from "layouts/blog/components/blogTitle/BlogTitle";

//Nav Bar
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import PropTypes from "prop-types";

//Import blog components
import blogRoutes from "blog.routes";
import blogData from "layouts/blogCategory/data/blogData";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import Header from "layouts/blogCategory/components/Header";
import NewestBlogs from "layouts/blog/components/newestBlogs";
import BlogFooter from "examples/BlogFooter";
import colors from "assets/theme/base/colors";
//Import picture
import malware_pic from "assets/images/blog/malware.jpg";
import LineDivider from "components/LineDivider";
import TableContent from "layouts/blog/components/tableContent";

function BlogLayout({ title, date, author, image, description, children }) {
    const location = useLocation();
    const currentPath = location.pathname;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const currentBlog =blogData.find((b) => b.link === currentPath);

    const relatedBlogs = blogData.filter(
        (b) => b.category === currentBlog?.category && b.link !== currentPath
    );

    return (
        <DashboardLayout>
            <SoftBox maxWidth="1400px" mx="auto" mt={{ xs: 1, lg: 3 }} mb={1} px={2}>
                <SoftBox id="page-hero" data-toc="exclude">
                    <Header
                        title={title}
                        image={image}
                        description={description}
                    />
                </SoftBox>
                <SoftBox pt={3} className="blogDetail">
                    <Grid container spacing={3}>
                        {/* Nội dung chính của blog */}
                        <Grid item xs={12} xl={9}>
                            <SoftBox 
                                elevation={0}
                                sx={{
                                // maxWidth: "1500px",
                                mt: "20px",
                                mx: "auto",
                                bgcolor: 'transparent.main',
                                // backgroundColor: colors.background.default,
                                // bgcolor: 'background.default'
                                // border: "1px solid #e0e0e0",
                                // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                // borderRadius: "12px",
                                // overflow: "hidden" // Bắt buộc nếu muốn ảnh bo tròn đúng
                            }}
                            >
                                <SoftBox
                                    // p={3}
                                    // component={motion.div}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    sx={{ 
                                        // maxWidth: "950px", 
                                        width: "100%",
                                        margin: "0 auto", // Cho vừa lề Card
                                        textAlign: "left"
                                    }}
                                    >
                                        <BlogTitle title={title} date={date} author={author} />
                                        <LineDivider />
                                        {children}
                                </SoftBox>
                            </SoftBox> 
                        </Grid>

                        {/* Next blog */}
                        <Grid item xs={12} xl={3} mt={3.5}>
                          <TableContent />
                        </Grid>
                    </Grid>
                </SoftBox>
                <LineDivider />
                <SoftBox id="newest-blogs" mt={6}>
                  <NewestBlogs />
                </SoftBox>

            </SoftBox>
            <BlogFooter />
        </DashboardLayout>
    );
}

BlogLayout.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default BlogLayout;
