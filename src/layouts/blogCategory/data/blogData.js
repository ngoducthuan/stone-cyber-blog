import malwareImg from "assets/images/blog/malware.jpg";
import staDynImg from "assets/images/blog/Static-Dynamic.jpg";
import DDoSImg from "assets/images/blog/DDoS.jpg";
import OSSecImg from "assets/images/blog/OS-Secure.jpg";
import ghidraImg from "assets/images/blog/Ghidra.jpg";
import malEva from "assets/images/blog/malware-evasion.jpg";
import REAssignmentImg from "assets/images/blog/detail/re-assignment.png"

const blogData = [
    //Malware analysis
    {
        id: 1,
        category: "malware-analysis",
        title: "Static vs Dynamic Malware Analysis",
        description: "Learn the difference between static and dynamic analysis, and when to use each technique.",
        image: staDynImg,
        link: "/malware-analysis/1",
        date: "2025-06-20",
        author: "Thuan Ngo Duc",
        icon: "bug_report",
    },
    {
        id: 2,
        category: "malware-analysis",
        title: "Using Ghidra for Reverse Engineering",
        description: "How to use Ghidra to disassemble and analyze malware binaries effectively.",
        image: ghidraImg,
        link: "/malware-analysis/2",
        date: "2025-06-21",
        author: "Thuan Ngo Duc",
        icon: "bug_report",
    },

    //System
    {
        id: 1,
        category: "system",
        title: "Principles of Secure OS Configuration",
        description: "Tips and best practices for hardening your operating system against threats.",
        image: OSSecImg,
        link: "/system/1",
        date: "2025-06-22",
        author: "Thuan Ngo Duc",
        icon: "settings",
    },

    //Network
    {
        id: 2,
        category: "network",
        title: "Understanding DDoS Attacks",
        description: "Explore how Distributed Denial of Service attacks work and how to defend against them.",
        image: DDoSImg,
        link: "/network/2",
        date: "2025-06-23",
        author: "Thuan Ngo Duc",
        icon: "public", 
    },

    //Malware development
    {
        id: 1,
        category: "malware-development",
        title: "Intro to Malware Evasion Techniques",
        description: "How modern malware evades detection from antivirus and EDR tools.",
        image: malEva,
        link: "/malware-development/300",
        date: "2025-06-24",
        author: "Thuận Ngô Đức",
        icon: "gps_fixed",
    },

    //Assignment
    {
        id: 1,
        category: "assignment",
        title: "Introduction to .NET Reverse Engineering with dnSpy",
        description: "Analyze and reverse basic .NET binaries to understand program logic, obfuscation, and common anti-analysis techniques.",
        image: REAssignmentImg,
        link: "/assignment/1",
        date: "2025-06-24",
        author: "Thuận Ngô Đức",
        icon: "gps_fixed",
    },

    {
        id: 2,
        category: "assignment",
        title: "Fundamentals of C/C++ Reverse Engineering using Ghidra",
        description: "Learn how to inspect native binaries, analyze functions, and recover program behavior using static analysis techniques.",
        image: REAssignmentImg,
        link: "/assignment/2",
        date: "2025-06-24",
        author: "Thuận Ngô Đức",
        icon: "gps_fixed",
    },

    {
        id: 3,
        category: "assignment",
        title: "PowerShell Script Analysis and Decoding Techniques",
        description: "Practice decoding and analyzing PowerShell scripts to identify hidden logic, encoded payloads, and execution flow.",
        image: REAssignmentImg,
        link: "/assignment/3",
        date: "2025-06-24",
        author: "Thuận Ngô Đức",
        icon: "gps_fixed",
    },
];

export default blogData;