/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ComplexProjectCard from "examples/Cards/ProjectCards/ComplexProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Project page components
// import Header from "layouts/pages/profile/components/Header";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAsana from "assets/images/small-logos/logo-asana.svg";
import logoInvision from "assets/images/small-logos/logo-invision.svg";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";

// Project page components
import Header from "layouts/blogCategory/components/Header";
import BlogCard from "layouts/blogCategory/components/BlogCard";

import Card from "@mui/material/Card";
import { Link, Navigate, useLocation } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";

import image from "assets/images/blog/category.jpg"

import imageSysSec from "assets/images/blog/system-security.jpg";
import imageNetSec from "assets/images/blog/network-security.jpg";
import imageMalDev from "assets/images/blog/malware.jpg"

import SoftButton from "components/SoftButton";

import { useParams } from "react-router-dom";
import BlogFooter from "examples/BlogFooter";
import SitePagination from "examples/Pagination/SitePagination";
//Import category data
// import categoryData from "layouts/blogCategory/data/categoryData";
// import blogData from "layouts/blogCategory/data/blogData";
import { blogMap } from "routes/blogMap";
import { buildPostsFromBlogMap, buildCategoryCardsFromBlogMap } from "routes/blog.builders";
import { Hearing } from "@mui/icons-material";


function CategoryDetails() {
    // ComplexProjectCard dropdown menu state
    const [slackBotMenu, setSlackBotMenu] = useState(null);
    const [premiumSupportMenu, setPremiumSupportMenu] = useState(null);
    const [designToolsMenu, setDesignToolsMenu] = useState(null);
    const [lookingGreatMenu, setLookingGreatMenu] = useState(null);
    const [developerFirstMenu, setDeveloperFirstMenu] = useState(null);

    // TeamProfileCard dropdown menu handlers
    const openSlackBotMenu = (event) => setSlackBotMenu(event.currentTarget);
    const closeSlackBotMenu = () => setSlackBotMenu(null);
    const openPremiumSupportMenu = (event) => setPremiumSupportMenu(event.currentTarget);
    const closePremiumSupportMenu = () => setPremiumSupportMenu(null);
    const openDesignToolsMenu = (event) => setDesignToolsMenu(event.currentTarget);
    const closeDesignToolsMenu = () => setDesignToolsMenu(null);
    const openLookingGreatMenu = (event) => setLookingGreatMenu(event.currentTarget);
    const closeLookingGreatMenu = () => setLookingGreatMenu(null);
    const openDeveloperFirstMenu = (event) => setDeveloperFirstMenu(event.currentTarget);
    const closeDeveloperFirstMenu = () => setDeveloperFirstMenu(null);

    const [page, setPage] = useState(1);
    const totalPages = 10;

    // Dropdown menu template for the ComplexProjectCard
    const renderMenu = (state, close) => (
        <Menu
            anchorEl={state}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(state)}
            onClose={close}
            keepMounted
        >
            <MenuItem onClick={close}>Action</MenuItem>
            <MenuItem onClick={close}>Another action</MenuItem>
            <MenuItem onClick={close}>Something else here</MenuItem>
        </Menu>
    );

    const categoryData = buildCategoryCardsFromBlogMap(blogMap);
    const blogData = buildPostsFromBlogMap(blogMap);
    const { categoryType } = useParams(); //Get date from url http://localhost:3000/category/malware => // type === "malware"
    const location = useLocation();

    //Fallback if useParams don't hvae categoryType
    const finalCategoryType = categoryType || location.pathname.split("/")[2];

    const category = categoryData.find((c) => c.id === finalCategoryType);
    if(!category){
        return <Navigate to="/authentication/error/404" />
    }
    const blogsCard = blogData.filter((b) => b.category === finalCategoryType);
    
    const base = process.env.PUBLIC_URL || "";
    const headerImage =
    base && category.image?.startsWith(base)
        ? category.image.slice(base.length)
        : category.image; //Remove default url only pass /images/<>.png => avoid error

    return (
        <DashboardLayout>
            <SoftBox maxWidth="1300px" mx="auto" mt={{ xs: 1, lg: 3 }} mb={1} px={2}>
                <Header 
                    title = {category.title}
                    image = {headerImage}
                    description= {category.description}
                />
                <SoftBox pt={5} pb={2}>
                    <SoftBox mt={{ xs: 1, lg: 3 }} mb={1}>
                        <Grid container spacing={3}>
                            {blogsCard.map((blog) => (
                                <Grid item key={blog.id} xs={12} sm={6} md={4} lg={3}>
                                    <BlogCard
                                    image={blog.image}
                                    title={blog.title}
                                    description={blog.description}
                                    link={{ pathname: blog.link }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </SoftBox>
                </SoftBox>
                {/* <Footer /> */}
                <SitePagination
                    page={page}
                    count={totalPages}
                    onChange={(_, v) => setPage(v)}
                    sx={{ mt: 4 }}
                />
                <BlogFooter />
            </SoftBox>
        </DashboardLayout>
    );
}

export default CategoryDetails;
