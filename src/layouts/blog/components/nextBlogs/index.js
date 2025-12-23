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

// @mui material components
import Card from "@mui/material/Card";
import {Link} from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DefaultItem from "examples/Items/DefaultItem";

import PropTypes from "prop-types";

function NextBlogs({blogs = []}) {
    return (
        <Card sx={{ height: "100%" }}>
            <SoftBox pt={2} px={2}>
                <SoftTypography variant="h6" fontWeight="medium">
                    Related blogs
                </SoftTypography>
            </SoftBox>
            <SoftBox p={2}>
                {blogs.length === 0 ? (
                    <SoftTypography variant="body2" color="text">
                        No related blogs found.
                    </SoftTypography>
                    ) : (
                    blogs.map((blog, index) => (
                        <SoftBox key={index} mt={index === 0 ? 0 : 1.5}>
                            <Link to={blog.link} style={{ textDecoration: "none" }}>
                                <DefaultItem
                                    icon= {blog.icon}
                                    color="info"
                                    title={blog.title}
                                    description={blog.date || ""}
                                />
                            </Link>
                        </SoftBox>
                    ))
                )}
            </SoftBox>
        </Card>
    );
}

NextBlogs.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string,
    })
  ),
};

export default NextBlogs;
