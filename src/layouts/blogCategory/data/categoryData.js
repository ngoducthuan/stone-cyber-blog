// src/layouts/blogCategory/data/categoryData.js

// Import hình ảnh
import imageMalwareAna from "assets/images/blog/malware-analysis1.jpg";
import imageSystem from "assets/images/blog/system-security.jpg";
import imageNetwork from "assets/images/blog/network-security.jpg";
import imageMalwareDev from "assets/images/blog/malware.jpg";
import imageIRAssigmnet from "assets/images/blog/category/ir-assignment-category.png"


const categoryData = {
    "malware-analysis": {
        id: "malware-analysis",
        title: "Malware Analysis",
        image: imageMalwareAna,
        description:
        "Get an introduction to malware analysis, from static and dynamic techniques to commonly used tools for investigating malicious software behavior.",
    },
    system: {
        id: "system",
        title: "System Security",
        image: imageSystem,
        description:
        "Understand core operating system security concepts such as access control, privilege management, and system hardening.",
    },
    network: {
        id: "network",
        title: "Network Security",
        image: imageNetwork,
        description:
        "Explore critical networking concepts, secure protocols, and methods to defend against common threats like spoofing or DDoS attacks.",
    },
    "malware-development": {
        id: "malware-development",
        title: "Malware Development",
        image: imageMalwareDev,
        description:
        "Learn how malicious software is designed to evade detection, exploit systems, and maintain persistence.",
    },
    "assignment": {
        id: "assignment",
        title: "Assignment",
        image: imageIRAssigmnet,
        description:
        "Learn how malicious software is designed to evade detection, exploit systems, and maintain persistence.",
    },
};

export default categoryData;
