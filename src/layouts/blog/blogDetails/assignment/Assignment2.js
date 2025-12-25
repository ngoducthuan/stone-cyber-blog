import BlogDetailRenderer from "layouts/blog/components/blogDetailRenderer";
import MarkdownRenderer from "layouts/blog/components/markdownRenderer";

export default function Assignment2() {
  const md = `
## I. Introduction

### 1. Introduction 1
The tools and environment used are **Operating System**, **Analysis VM**, and **Binary Identification**, which together form the foundational setup for conducting reverse engineering and incident response activities. In a typical **RE / IR workflow**, the operating system provides the execution context, while the analysis virtual machine isolates potentially malicious binaries from the host environment to prevent unintended impact. Binary identification plays a critical role in the early stages of analysis, allowing analysts to quickly determine file type, architecture, and compilation characteristics before deeper static or dynamic inspection is performed. Without a properly prepared environment, tasks such as debugging, memory inspection, and behavior tracing can become unreliable or even misleading.

From an incident response perspective, establishing a consistent analysis environment ensures that findings can be reproduced and validated by other analysts. For example, running the same binary on different systems or configurations may lead to variations in behavior due to differences in loaded libraries, system calls, or security controls. By standardizing the **analysis VM**, responders can correlate observed behaviors with artifacts such as process creation logs, registry modifications, or network connections. This approach not only improves analytical accuracy but also supports effective documentation and reporting throughout the investigation lifecycle.

## II. Environment
- **Operating System**: Windows 10
- **Analysis VM**: FLARE-VM

## III. Commands
The preparation phase is often underestimated, yet it significantly influences the quality of the analysis outcome. Analysts are expected to verify system integrity, disable unnecessary background services, and configure monitoring tools such as debuggers, system call tracers, and logging utilities. Commands like *file*, *strings*, or *sha256sum* are typically used during the initial triage stage to gather quick insights into the binary under investigation. These preliminary steps help determine whether further static analysis, dynamic execution, or memory forensics is required.

In practice, a well-structured environment enables analysts to move efficiently from hypothesis to validation. Clear separation between the host system and the analysis VM reduces risk, while consistent tooling improves collaboration and knowledge sharing within a security team. As reverse engineering and incident response often operate under time constraints, investing effort in environment setup ultimately leads to faster decision-making, clearer conclusions, and more defensible technical findings.

\`\`\`powershell
// Example: JavaScript highlight test
function greet(name) {
  const message = \`Hello, ${name}!\`;
  console.log(message);

  if (name === "Stone") {
    return true;
  }

  return false;
}

// Run
greet("Stone");
\`\`\`

![1. Stone example caption](https://picsum.photos/900/360)
`;

  return (
    <BlogDetailRenderer>
      <MarkdownRenderer content={md} />
    </BlogDetailRenderer>
  );
}
