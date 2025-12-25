import BlogHeading from "layouts/blog/components/blogHeading/BlogHeading";
import BlogParagraph from "layouts/blog/components/blogParagraph/BlogParagraph";
import BlogDetailRenderer from "layouts/blog/components/blogDetailRenderer";
import CodeBlock from "layouts/blog/components/codeBlock";

function Assignment1() {
    return (
        <BlogDetailRenderer>
            <BlogHeading level={4}>I. Introduction</BlogHeading>
            <BlogHeading level={4}>II. Enviroment Setup</BlogHeading>
            <BlogHeading level={4}>III. File Detection with Detect It Easy</BlogHeading>
            <BlogHeading level={4}>IV. Analysis Program</BlogHeading>
            <BlogHeading level={4}>V. Conclusion</BlogHeading>
        </BlogDetailRenderer>
    );
}

export default Assignment1;
