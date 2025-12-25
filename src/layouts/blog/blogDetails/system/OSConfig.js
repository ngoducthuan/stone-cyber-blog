import BlogHeading from "layouts/blog/components/blogHeading";
import BlogParagraph from "layouts/blog/components/blogParagraph";
import BlogDetailRenderer from "layouts/blog/components/blogDetailRenderer";

function BlogDetailOSConfig() {
    return (
        <BlogDetailRenderer>
            <BlogHeading level={3}>What is OS Hardening?</BlogHeading>
            <BlogParagraph>
                OS hardening is the process of securing an operating system by reducing its attack surface.
            </BlogParagraph>

            <BlogHeading level={3}>Key Principles</BlogHeading>
            <BlogParagraph>
                - Remove unnecessary services<br />
                - Apply least privilege<br />
                - Patch regularly<br />
                - Configure firewalls and logging<br />
                - Use secure configurations (e.g., disable SMBv1)
            </BlogParagraph>

            <BlogHeading level={3}>Windows vs Linux</BlogHeading>
            <BlogParagraph>
                Windows has Group Policy, Defender, Event Logs. Linux relies on config files, AppArmor/SELinux, iptables, and auditd.
            </BlogParagraph>

            <BlogHeading level={3}>Conclusion</BlogHeading>
            <BlogParagraph>
                Hardening should be a foundational step before deploying any system in production.
            </BlogParagraph>
        </BlogDetailRenderer>
    );
}

export default BlogDetailOSConfig;
