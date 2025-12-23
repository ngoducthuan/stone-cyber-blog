import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
// import BlogLayout from "../../components/blogDetailLayout/BlogDetailLayout";
import ddosImg from "assets/images/blog/DDoS.jpg";

// Blog components
import BlogHeading from "layouts/blog/components/blogHeading/BlogHeading";
import BlogParagraph from "layouts/blog/components/blogParagraph/BlogParagraph";
import BlogDetailRederer from "layouts/blog/components/blogDetailRenderer";

function BlogDetailDDoS() {
    return (
        <BlogDetailRederer>
                <BlogHeading level={3}>What is a DDoS Attack?</BlogHeading>
                <BlogParagraph>
                    A Distributed Denial of Service (DDoS) attack is a malicious attempt to disrupt normal traffic to a targeted server, service, or network by overwhelming it with a flood of Internet traffic. It leverages multiple compromised systems as sources of attack traffic.
                </BlogParagraph>

                <BlogHeading level={3}>How DDoS Works</BlogHeading>
                <BlogParagraph>
                    Attackers typically use a botnet—a network of hijacked internet-connected devices—to launch a coordinated assault. Each bot sends requests to the target server, overwhelming its capacity to respond, and causing denial of service to legitimate users.
                </BlogParagraph>

                <BlogHeading level={3}>Types of DDoS Attacks</BlogHeading>
                <BlogParagraph>
                    Common types of DDoS attacks include:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;- <strong>Volumetric attacks</strong>: Flood the bandwidth of the target.<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;- <strong>Protocol attacks</strong>: Exploit vulnerabilities in the network protocols.<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;- <strong>Application layer attacks</strong>: Target specific web applications.
                </BlogParagraph>

                <BlogHeading level={3}>Detection and Mitigation</BlogHeading>
                <BlogParagraph>
                    Early detection is crucial. Common strategies include using traffic analysis tools, rate limiting, Web Application Firewalls (WAF), and anti-DDoS services like Cloudflare or AWS Shield.
                </BlogParagraph>

                <BlogHeading level={3}>Conclusion</BlogHeading>
                <BlogParagraph>
                    DDoS attacks can severely impact businesses and infrastructure. Understanding how they work and how to defend against them is a fundamental part of cybersecurity.
                </BlogParagraph>
        </BlogDetailRederer>
    );
}

export default BlogDetailDDoS;
