// layouts/blog/components/BlogDetailRenderer.js
import { useLocation } from "react-router-dom";
import blogData from "layouts/blogCategory/data/blogData"; // đường dẫn tới file blogData.js
import BlogDetailLayout from "layouts/blog/components/blogDetailLayout/BlogDetailLayout";
import PropTypes from "prop-types";

function BlogDetailRenderer({ children }) {
    const location = useLocation();
    const currentBlog = blogData.find((b) => b.link === location.pathname);

    if (!currentBlog) return <h2>Blog not found</h2>;

    return (
        <BlogDetailLayout
            title={currentBlog.title}
            date={currentBlog.date}
            author={currentBlog.author}
            image={currentBlog.image}
            description={currentBlog.description}
        >
            {children}
        </BlogDetailLayout>
    );
}

BlogDetailRenderer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BlogDetailRenderer;
