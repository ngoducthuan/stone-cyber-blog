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
import SitePagination from "examples/Pagination/SitePagination";

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
import BlogFooter from "examples/BlogFooter"
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";

import imageSysSec from "assets/images/blog/system-security.jpg";
import imageNetSec from "assets/images/blog/network-security.jpg";
import imageMalDev from "assets/images/blog/malware.jpg"

import SoftButton from "components/SoftButton";

//Import data
import { blogMap } from "routes/blogMap";
import { buildCategoryCardsFromBlogMap } from "routes/blog.builders";

const categories = buildCategoryCardsFromBlogMap(blogMap);

function AllCategories() {
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

    return (
        <DashboardLayout>
            <SoftBox maxWidth="1300px" mx="auto" mt={{ xs: 1, lg: 3 }} mb={1} px={2}>
                <Header 
                    title="All Categories"
                    image={"/images/category.jpg"}
                    description="Explore all categories and discover content tailored to your interests."
                />
                <SoftBox pt={5} pb={2} >
                    <SoftBox mt={{ xs: 1, lg: 3 }} mb={1} >
                        <Grid container spacing={3}>
                            {categories.map((cat) => (
                                <Grid item
                                    xs={12}      // mobile: 1
                                    sm={6}       // >=600: 2
                                    md={4}       // >=900: 3
                                    lg={4}       // >=1200: 3 
                                    xl={3}       // >=1536: 4 
                                    key={cat.id}>
                                <SoftBox ></SoftBox>
                                <BlogCard
                                    image={cat.image}
                                    title={cat.title}
                                    description={cat.description}
                                    link={{
                                        pathname: `/category/${cat.id}`,
                                    }}
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

export default AllCategories;
