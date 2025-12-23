import BlogHeading from "layouts/blog/components/blogHeading/BlogHeading";
import BlogParagraph from "layouts/blog/components/blogParagraph/BlogParagraph";
import BlogDetailRenderer from "layouts/blog/components/blogDetailRenderer";
import CodeBlock from "layouts/blog/components/CodeBlock/CodeBlock";

function Assignment3() {
    return (
        <BlogDetailRenderer>
            <BlogHeading level={4}>Assignment 3</BlogHeading>
        </BlogDetailRenderer>
    );
}

export default Assignment3;
