import BlogDetailRenderer from "layouts/blog/components/blogDetailRenderer";
import MarkdownRenderer from "layouts/blog/components/markdownRenderer";


export default function Assignment2() {
  const md = `
## I. Environment
- **Operating System**: Windows 10
- **Analysis VM**: FLARE-VM

## II. Anslysis
In this assignment, we will reverse a simple executable to find the flag.

First, Detect It Easy is used to identify the file type, architecture, and programming language of the executable file. As the result, the file is PE32 Windows executable complied for 32-bit architecture. The binary is a console application written in C++ and complied using Microsoft Visual C/C++ with Visual Studio 2013. No packer or obfuscation is detected, marking the file suitable for static analysis with Ghidra.

![Figure 2. Detect It Easy showing PE32 and compiler information](/images/assignment/assignment2/dte.png)

Next, the executable is loaded into Ghidra, and analysis begins at then entry function. The entry function performs standard runtime initialization and then calls FUN_00409584(), which contains a series of setup and validation checks. Double click function name to move in the function content.

![Figure 3. Ghidra entry function analysis](/images/assignment/assignment2/entry_fuc.png)

After that, the function calls FUN_0040647(), which appear to contain the core program logic, and then exists. 

![Figure 4. Main function prompting user input](/images/assignment/assignment2/main_logic_1.png)

This function represents the main logic of the program. Look at the picture upon, we can see string prompts the user to enter the flag, possesses the input, and prints either "Correct!" or Wrong based on the validation result. Let deep into some important snippet code:

\`\`\`code
basic_string<>(local_38); 
local_8 = 0; 
FUN_00401290((int *)&DAT_00427c10,"Enter Flag: "); 
FUN_00402580(&DAT_00427b40,(basic_string<> *)local_38);
\`\`\`

From this code snippet, we can infer the role of several functions. The call to FUN_00401290() is a print function used to display the string "Enter Flag:" to the user. Next, function FUN_00401290 reads user input and stores it in the local_38 variable, which is a basic_string object. Therefore, local_38 is the variable that stored used input. 

Move into another important variable: local_20.

\`\`\`code
int local_20 [3];
FUN_00404e50(local_20,0xc);
puVar2 = FUN_004057a0(local_38,&stack0xffffffbc);
uVar4 = *puVar2;
puVar2 = FID_conflict:begin(local_38,&local_40);
FUN_00401250(local_20,*puVar2,uVar4);
\`\`\`

Look at the function FUN_00404e50. After double-clicking it in Ghidra, we can see it calls FUN_00408de0(this, 0, param_1) which behaves like memset. This initializes the local_20 buffer by setting it to zero. Two variable puVar2 and uVar4 stores pointer to the first and last address of the local_38 string. Next, local_20, *puVar2, uVar4 is pass through FUN_00401250 function. Let's deep into it and see what does it do?

Here, the function FUN_00401e10() is called inside FUN_00401250() and is responsible for copying data into local_20. As a result, FUN_00401250() copies the user input stored in local_38 into the local_20 buffer. Therefore, local_20 becomes a temporary buffer that contains the same data as local_38, which will be used for the next processing steps.

![Figure 5. Copying user input into temporary buffer](/images/assignment/assignment2/main_logic_2.png)

Next, let's step into function FUN_00403cd0(local_20). Look at small function in FUN_00403cd0.

\`\`\`code
void __cdecl FUN_00401b00(undefined1 *param_1,undefined1 *param_2)

{
  for (; (param_1 != param_2 && (param_2 = param_2 + -1, param_1 != param_2)); param_1 = param_1 + 1
      ) {
    FUN_00402630(param_1,param_2);
  }
  return;
}
\`\`\`

This function FUN_00401b00() is used to reverse the bufer content. It swaps chracters from the beginning and the end of the buffer. As a result, the data stored in the buffer is reversed, which means the input string is processed in reverse order.

The return value of FUN_00403bd0(local_20) is stored in cVar1 and is directly used to determine whether the program prints “Correct!” or “Wrong!”. Therefore, FUN_00403bd0() is the key validation function and is critical to understanding how the correct flag is verified.

The function FUN_00403d00() is responsible for constructing a fixed reference buffer. It return string "04c knj d qn4n jk qn0uh j4m n4v". The local variable local_20 of FUN_00403bd0() will be asign this string. 

![Figure 7. Character-by-character comparison with hard-coded string](/images/assignment/assignment2/main_logic_4.png)

Following, the while loop is used to compare string input is reverse with this local variable local_20.

\`\`\` code
if (iVar2 == iVar3) {
  local_28 = 0;
  while( true ) {
    uVar4 = FUN_004061b0(param_1);
    if (uVar4 <= local_28) break;
    pbVar5 = (byte *)FUN_004037e0(param_1,local_28);
    bVar1 = *pbVar5;
    puVar6 = (uint *)FUN_00403800(local_20,local_28);
    if ((uint)bVar1 != *puVar6) {
      local_8 = 0xffffffff;
      FUN_00403450(local_20);
      goto LAB_00403cb2;
    }
    local_28 = local_28 + 1;
  }
  local_8 = 0xffffffff;
  FUN_00403450(local_20);
}
else {
  local_8 = 0xffffffff;
  FUN_00403450(local_20);
}
\`\`\`

In conclusion, we can determine the correct result by analyzing the validation logic. Since the input buffer is reversed before comparison, the correct input string is the reverse of the hard-coded string"04c knj d qn4n jk qn0uh j4m n4v". 

The key is: **v4n m4j hu0nq kj n4nq d jnk c40**
`;

  return (
    <BlogDetailRenderer>
      <MarkdownRenderer content={md} />
    </BlogDetailRenderer>
  );
}
