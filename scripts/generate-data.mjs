import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const employees = [
  ["NS001","Amara Okafor","Support","Support Team Lead","Samuel Adeyemi","Employee","Active","2026-09-06","Registered","Low","SG-Support-Leads"],
  ["NS002","Daniel Weber","Support","Support Agent","Amara Okafor","Employee","Active","2026-09-06","Registered","High","SG-Support-Agents"],
  ["NS003","Priya Nair","Support","Support Agent","Amara Okafor","Employee","Active","2026-09-05","Registered","Low","SG-Support-Agents"],
  ["NS004","Lucas Moreau","Support","Support Agent","Amara Okafor","Employee","Active","2026-09-05","Registered","Low","SG-Support-Agents"],
  ["NS005","Emily Carter","Support","Support Agent","Amara Okafor","Employee","Active","2026-09-06","Registered","Low","SG-Support-Agents"],
  ["NS006","Noah Williams","Support","Support Agent","Amara Okafor","Employee","Active","2026-09-04","Registered","Low","SG-Support-Agents"],
  ["NS007","Maya Singh","Support","Support Agent","Amara Okafor","Employee","Active","2026-09-06","Registered","Low","SG-Support-Agents"],
  ["NS008","Eva Lindström","Support","Support Agent","Amara Okafor","Employee","Active","2026-09-03","Registered","Low","SG-Support-Agents"],
  ["NS009","Sofia Martins","Sales","Account Executive","Ethan Brown","Employee","Dormant","2026-05-17","Registered","High","SG-Sales"],
  ["NS010","Ethan Brown","Sales","Sales Manager","Ava Thompson","Employee","Active","2026-09-06","Registered","Low","SG-Sales-Managers"],
  ["NS011","Chloé Dubois","Sales","Account Executive","Ethan Brown","Employee","Active","2026-09-05","Registered","Low","SG-Sales"],
  ["NS012","Malik Johnson","Sales","Account Executive","Ethan Brown","Employee","Active","2026-09-06","Registered","Medium","SG-Sales"],
  ["NS013","Lena Fischer","Sales","Sales Operations Analyst","Ethan Brown","Employee","Active","2026-09-04","Registered","Medium","SG-Sales-Ops"],
  ["NS014","Rafael Costa","Sales","Account Executive","Ethan Brown","Employee","Active","2026-09-05","Registered","Low","SG-Sales"],
  ["NS015","Ava Thompson","Finance","Finance Director","Samuel Adeyemi","Employee","Active","2026-09-06","Registered","High","SG-Finance-Leads"],
  ["NS016","Bruno Silva","Finance","Financial Analyst","Ava Thompson","Employee","Active","2026-09-05","Registered","Low","SG-Finance"],
  ["NS017","Grace Kim","Finance","Accounts Payable Specialist","Ava Thompson","Employee","Active","2026-09-06","Registered","Low","SG-Finance-AP"],
  ["NS018","Oliver Smith","Finance","Accountant","Ava Thompson","Employee","Active","2026-09-04","Registered","Low","SG-Finance"],
  ["NS019","Aisha Bello","Finance","Financial Analyst","Ava Thompson","Employee","Active","2026-09-06","Registered","High","SG-Finance"],
  ["NS020","Hannah Müller","HR","HR Director","Samuel Adeyemi","Employee","Active","2026-09-05","Registered","Low","SG-HR-Leads"],
  ["NS021","Fatima Zahra","HR","Recruiter","Hannah Müller","Employee","Active","2026-09-06","Registered","Low","SG-HR-Recruiting"],
  ["NS022","Jack Murphy","HR","HR Business Partner","Hannah Müller","Employee","Active","2026-09-04","Registered","Low","SG-HR"],
  ["NS023","Isabella Rossi","HR","People Operations Coordinator","Hannah Müller","Employee","Active","2026-09-05","Registered","Low","SG-HR"],
  ["NS024","Liam Chen","IT","Former Cloud Contractor","Thomas Berg","Contractor","Leaver overdue","2026-08-12","Not registered","Critical","SG-Azure-Contributors"],
  ["NS025","Alex Novak","IT","IT Administrator","Samuel Adeyemi","Employee","Active","2026-09-06","Registered","Medium","SG-IT-Admins"],
  ["NS026","Jordan Lee","IT","Service Desk Analyst","Alex Novak","Employee","Active","2026-09-06","Registered","Critical","SG-Service-Desk"],
  ["NS027","Mei Tan","IT","IAM Analyst","Alex Novak","Employee","Active","2026-09-06","Not registered","Critical","SG-IAM-Operations"],
  ["NS028","Thomas Berg","IT","Cloud Engineer","Alex Novak","Employee","Active","2026-09-05","Registered","Low","SG-Cloud-Engineering"],
  ["NS029","Samuel Adeyemi","IT","IT Manager","Ava Thompson","Employee","Active","2026-09-06","Registered","Low","SG-IT-Leadership"],
  ["NS030","Noura Haddad","IT","Security Analyst","Samuel Adeyemi","Employee","Active","2026-09-06","Registered","Low","SG-Security-Operations"],
].map(([id,name,department,role,manager,type,status,lastSignIn,mfa,risk,group]) => ({
  id,name,email:`${name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z ]/g,"").replace(/ /g,".")}@northstardigital.example`,
  department,role,manager,type,status,lastSignIn,mfa,risk,group,location:"Remote · EU"
}));

const assignments = {
  NS001:[["Microsoft 365","Standard User"],["Slack","Support Lead"],["Zendesk","Administrator"],["Confluence","Editor"]],
  NS002:[["Microsoft 365","Standard User"],["Zendesk","Agent"],["NetSuite","Finance User"]],
  NS003:[["Microsoft 365","Standard User"],["Zendesk","Agent"],["Confluence","Reader"]],
  NS004:[["Microsoft 365","Standard User"],["Zendesk","Agent"]],
  NS005:[["Microsoft 365","Standard User"],["Zendesk","Agent"]],
  NS006:[["Microsoft 365","Standard User"],["Zendesk","Agent"]],
  NS007:[["Microsoft 365","Standard User"],["Zendesk","Agent"],["Slack","Member"]],
  NS008:[["Microsoft 365","Standard User"],["Zendesk","Agent"]],
  NS009:[["Microsoft 365","Standard User"],["Salesforce","Sales User"],["Slack","Member"]],
  NS010:[["Microsoft 365","Standard User"],["Salesforce","Sales Manager"],["Slack","Sales Lead"],["Power BI","Sales Workspace Viewer"]],
  NS011:[["Microsoft 365","Standard User"],["Salesforce","Sales User"],["Slack","Member"]],
  NS012:[["Microsoft 365","Standard User"],["Salesforce","Sales User"],["Slack","Member"]],
  NS013:[["Microsoft 365","Standard User"],["Salesforce","Sales Operations"],["Power Automate","Premium Maker"]],
  NS014:[["Microsoft 365","Standard User"],["Salesforce","Sales User"]],
  NS015:[["Microsoft 365","Standard User"],["NetSuite","Administrator"],["Power BI","Finance Workspace Member"],["Slack","Finance Lead"]],
  NS016:[["Microsoft 365","Standard User"],["NetSuite","Finance User"],["Power BI","Finance Workspace Viewer"]],
  NS017:[["Microsoft 365","Standard User"],["NetSuite","Accounts Payable"]],
  NS018:[["Microsoft 365","Standard User"],["NetSuite","Finance User"]],
  NS019:[["Microsoft 365","Standard User"],["NetSuite","Finance User"],["Salesforce","Sales User"]],
  NS020:[["Microsoft 365","Standard User"],["Workday","HR Administrator"],["Slack","HR Lead"]],
  NS021:[["Microsoft 365","Standard User"],["Workday","Recruiter"],["Slack","Member"]],
  NS022:[["Microsoft 365","Standard User"],["Workday","HR Business Partner"]],
  NS023:[["Microsoft 365","Standard User"],["Workday","People Operations"]],
  NS024:[["Azure Portal","Contributor"]],
  NS025:[["Jira Service Management","Administrator"],["Microsoft Entra","Global Administrator"]],
  NS026:[["Jira Service Management","Agent"],["Microsoft Entra","Global Administrator"]],
  NS027:[["Microsoft Entra","Privileged Role Administrator"]],
  NS028:[["Microsoft 365","Standard User"],["Azure Portal","Reader"]],
  NS029:[["Microsoft 365","Standard User"],["Microsoft Entra","Global Administrator"]],
  NS030:[["Microsoft 365","Standard User"],["Microsoft Defender","Security Reader"]],
};

const appPurpose = {
  "Microsoft 365":"Email, collaboration and productivity",
  "Slack":"Department communication",
  "Zendesk":"Customer support case management",
  "Confluence":"Support knowledge documentation",
  "NetSuite":"Finance operations and reporting",
  "Salesforce":"Customer relationship management",
  "Power BI":"Department analytics and reporting",
  "Power Automate":"Sales operations workflow automation",
  "Workday":"HR and employee lifecycle administration",
  "Azure Portal":"Cloud resource administration",
  "Jira Service Management":"IT request and incident management",
  "Microsoft Entra":"Identity and access administration",
  "Microsoft Defender":"Security investigation and monitoring",
};

const findings = {
  "NS002|NetSuite":{severity:"High",finding:"Support agent has Finance application access",reviewResult:"REMOVE",remediation:"Remove NetSuite entitlement and verify no finance data was accessed",ticket:"IAM-1002"},
  "NS009|Salesforce":{severity:"High",finding:"Dormant account has not signed in for 112 days",reviewResult:"SUSPEND",remediation:"Confirm employment with manager, then suspend account and revoke sessions",ticket:"IAM-1009"},
  "NS012|Salesforce":{severity:"Medium",finding:"Access assigned directly instead of through approved Sales group",reviewResult:"REASSIGN",remediation:"Remove direct grant and provision through SG-Sales",ticket:"IAM-1012"},
  "NS013|Power Automate":{severity:"Medium",finding:"Premium maker entitlement has no current automation owner",reviewResult:"REMOVE",remediation:"Remove premium license unless manager supplies renewed justification",ticket:"IAM-1013"},
  "NS015|NetSuite":{severity:"High",finding:"Administrator access lacks named quarterly approver",reviewResult:"REVIEW",remediation:"Obtain CFO approval and reduce to Finance Manager if admin is unnecessary",ticket:"IAM-1015"},
  "NS019|Salesforce":{severity:"High",finding:"Finance mover retained access from former Sales role",reviewResult:"REMOVE",remediation:"Remove SG-Sales membership and Salesforce access",ticket:"IAM-1019"},
  "NS024|Azure Portal":{severity:"Critical",finding:"Former contractor remains enabled with Azure Contributor",reviewResult:"DISABLE",remediation:"Disable identity, revoke sessions, remove group access and preserve logs",ticket:"IAM-1024"},
  "NS026|Microsoft Entra":{severity:"Critical",finding:"Service Desk Analyst has unnecessary Global Administrator role",reviewResult:"REVOKE",remediation:"Remove Global Administrator and use scoped Helpdesk Administrator role",ticket:"IAM-1026"},
  "NS027|Microsoft Entra":{severity:"Critical",finding:"Privileged role holder has not registered MFA",reviewResult:"BLOCK",remediation:"Block privileged activation until phishing-resistant MFA is registered",ticket:"IAM-1027"},
};

let seq = 1;
const entitlements = [];
for (const employee of employees) {
  for (const [application,accessLevel] of assignments[employee.id]) {
    const key = `${employee.id}|${application}`;
    const exception = findings[key];
    entitlements.push({
      id:`ENT-${String(seq++).padStart(3,"0")}`,
      userId:employee.id,user:employee.name,department:employee.department,role:employee.role,
      application,accessLevel,
      assignment:key === "NS012|Salesforce" ? "Direct" : "Group-based",
      businessJustification:exception ? (key === "NS019|Salesforce" ? "Legacy access from previous Sales role" : key === "NS024|Azure Portal" ? "Expired contractor project" : appPurpose[application]) : appPurpose[application],
      approver:key === "NS015|NetSuite" ? "Missing" : employee.manager,
      reviewResult:exception?.reviewResult ?? "RETAIN",
      severity:exception?.severity ?? "None",
      finding:exception?.finding ?? "No exception identified",
      remediation:exception?.remediation ?? "Retain and review next quarter",
      ticket:exception?.ticket ?? "—",
      reviewDate:"2026-09-06"
    });
  }
}

if (employees.length !== 30) throw new Error(`Expected 30 employees, found ${employees.length}`);
if (entitlements.length !== 75) throw new Error(`Expected 75 entitlements, found ${entitlements.length}`);

const tickets = [
  {id:"IAM-1001",title:"Lost MFA device after phone replacement",requester:"Priya Nair",category:"Authentication & MFA",priority:"P2 High",status:"Resolved",sensitive:true,owner:"Mei Tan",summary:"User cannot approve sign-in because Microsoft Authenticator remains tied to an old phone.",verification:"Verified employee ID, manager confirmation and known corporate contact channel.",approval:"Identity Operations approval recorded; no security control bypass approved.",action:"Revoked old authentication methods, issued Temporary Access Pass, required MFA re-registration.",evidence:"Entra audit event, TAP expiry and successful new-device registration captured.",resolution:"Access restored with MFA enforced; old device registration removed.",escalated:false},
  {id:"IAM-1002",title:"Support agent found with NetSuite access",requester:"Quarterly Access Review",category:"Access Governance",priority:"P2 High",status:"Remediated",sensitive:true,owner:"Mei Tan",summary:"Daniel Weber has Finance User access despite working in Support.",verification:"Compared HR department record, RBAC catalogue and group membership.",approval:"Finance Director confirmed no business need.",action:"Removed NetSuite entitlement and reviewed sign-in/audit history.",evidence:"Before-and-after entitlement export and approval note attached.",resolution:"Excess access removed; no suspicious NetSuite activity found.",escalated:true},
  {id:"IAM-1003",title:"New Support Agent requires standard access",requester:"Hannah Müller",category:"Joiner",priority:"P3 Normal",status:"Resolved",sensitive:false,owner:"Jordan Lee",summary:"Provision Maya Singh for her first day in Customer Support.",verification:"Matched approved HR joiner record, manager and start date.",approval:"Support Team Lead approved standard RBAC bundle.",action:"Created identity; assigned SG-Support-Agents, M365 and Zendesk; required MFA.",evidence:"Provisioning log, group membership and successful access test retained.",resolution:"Least-privilege access verified before start date.",escalated:false},
  {id:"IAM-1004",title:"Support Agent promoted to Team Lead",requester:"Amara Okafor",category:"Mover",priority:"P3 Normal",status:"Resolved",sensitive:false,owner:"Mei Tan",summary:"Role change requires team reporting and knowledge-edit access.",verification:"Validated HR role change and effective date.",approval:"Support Director approved Team Lead RBAC bundle.",action:"Added SG-Support-Leads and Confluence Editor; removed obsolete direct assignment.",evidence:"Change record includes old/new access comparison and manager sign-off.",resolution:"New duties enabled without retaining unnecessary access.",escalated:false},
  {id:"IAM-1005",title:"Immediate employee termination",requester:"Hannah Müller",category:"Leaver",priority:"P1 Critical",status:"Resolved",sensitive:true,owner:"Alex Novak",summary:"HR requests immediate offboarding of a departing employee.",verification:"Confirmed request through HR restricted channel and callback.",approval:"HR Director authorization recorded.",action:"Disabled account, revoked sessions/tokens, removed groups/apps and privileged roles.",evidence:"Disable timestamp, session revocation and entitlement removal logs retained.",resolution:"Access terminated within 12 minutes of verified request.",escalated:true},
  {id:"IAM-1006",title:"Account locked after repeated attempts",requester:"Emily Carter",category:"Account Recovery",priority:"P3 Normal",status:"Resolved",sensitive:true,owner:"Jordan Lee",summary:"User reports lockout after entering an old password several times.",verification:"Verified identity using approved help-desk procedure; no password requested.",approval:"Standard self-service recovery process; no manager approval required.",action:"Reviewed sign-in logs, unlocked account and guided secure password reset.",evidence:"Lockout event and successful post-reset sign-in recorded.",resolution:"Account restored; no risky sign-in indicators observed.",escalated:false},
  {id:"IAM-1007",title:"Suspicious sign-in from unfamiliar location",requester:"Microsoft Entra Risk Detection",category:"Security Incident",priority:"P1 Critical",status:"Escalated",sensitive:true,owner:"Noura Haddad",summary:"Impossible-travel alert followed a successful sign-in to Microsoft 365.",verification:"Contacted user by known channel; user denied the activity.",approval:"Security incident playbook authorized containment.",action:"Blocked sign-in, revoked sessions, reset password and required MFA re-registration.",evidence:"Risk event, IP details, sign-in logs and containment timestamps preserved.",resolution:"Contained and escalated to Security Operations for investigation.",escalated:true},
  {id:"IAM-1008",title:"Manager requests Global Admin for contractor",requester:"Thomas Berg",category:"Privileged Access",priority:"P2 High",status:"Denied",sensitive:true,owner:"Mei Tan",summary:"Cloud project contractor requests Global Administrator for convenience.",verification:"Confirmed project scope and tasks with sponsor.",approval:"Security rejected standing Global Administrator access.",action:"Offered time-bound Azure Contributor on the project resource group through PIM.",evidence:"Denied request, alternative role mapping and sponsor acknowledgement captured.",resolution:"Least-privilege alternative approved; tenant-wide admin not granted.",escalated:true},
  {id:"IAM-1009",title:"Dormant Sales account detected",requester:"Quarterly Access Review",category:"Dormant Account",priority:"P2 High",status:"Pending manager",sensitive:true,owner:"Mei Tan",summary:"Sofia Martins has no sign-in activity for 112 days but retains Salesforce access.",verification:"Checked HR status, Entra last sign-in and application assignments.",approval:"Awaiting Sales Manager employment confirmation.",action:"Applied temporary sign-in block pending manager response.",evidence:"Last sign-in report, account status and notification timestamp retained.",resolution:"Awaiting final disable-or-retain decision.",escalated:true},
  {id:"IAM-1010",title:"Finance mover retained Salesforce access",requester:"Quarterly Access Review",category:"Mover Exception",priority:"P2 High",status:"Remediated",sensitive:false,owner:"Mei Tan",summary:"Aisha Bello moved from Sales to Finance but retained her old Salesforce role.",verification:"Compared HR transfer date with group and entitlement history.",approval:"Finance and Sales managers approved removal.",action:"Removed SG-Sales membership and Salesforce entitlement.",evidence:"Approval chain, group audit log and post-change validation attached.",resolution:"Outdated access removed; Finance permissions retained.",escalated:false},
];

const scenarios = [
  {key:"joiner",title:"Joiner — new Support Agent",subject:"Maya Singh",outcome:"Provisioned with least privilege",description:"A complete onboarding workflow using the approved Support Agent RBAC bundle.",steps:[
    ["Request","HR creates a joiner request with role, manager and start date","Complete"],
    ["Validate","Identity data and employment record are verified","Complete"],
    ["Approve","Support Team Lead approves the standard access bundle","Complete"],
    ["Provision","Create account; assign M365, Zendesk and SG-Support-Agents","Complete"],
    ["Secure","Require MFA registration and block legacy authentication","Complete"],
    ["Evidence","Test access and attach provisioning log to IAM-1003","Complete"]
  ]},
  {key:"mover",title:"Mover — Agent to Team Lead",subject:"Amara Okafor",outcome:"Permissions updated cleanly",description:"Existing access is reviewed before adding elevated team-lead capabilities.",steps:[
    ["Request","HR records promotion and effective date","Complete"],
    ["Review","Compare current access to the Team Lead role catalogue","Complete"],
    ["Approve","Support Director approves added reporting permissions","Complete"],
    ["Remove","Delete obsolete direct and old-role assignments","Complete"],
    ["Add","Assign SG-Support-Leads and Confluence Editor","Complete"],
    ["Evidence","Capture before/after access and manager sign-off","Complete"]
  ]},
  {key:"leaver",title:"Leaver — immediate termination",subject:"Liam Chen",outcome:"Exception found and remediated",description:"An overdue contractor account demonstrates urgent deprovisioning and evidence capture.",steps:[
    ["Verify","Validate HR termination request through restricted channel","Complete"],
    ["Disable","Block the account and revoke active sessions/tokens","Complete"],
    ["Remove","Delete groups, applications and Azure Contributor access","Complete"],
    ["Protect","Preserve mailbox/data and transfer ownership as approved","Complete"],
    ["Audit","Review recent sign-ins and privileged actions","Complete"],
    ["Close","Attach evidence and HR confirmation to IAM-1024","Complete"]
  ]}
];

const data = {
  company:{name:"Northstar Digital",sector:"B2B SaaS",environment:"Microsoft Entra ID simulated lab",reviewPeriod:"Q3 2026",reviewDate:"2026-09-06"},
  employees,entitlements,tickets,scenarios,
  findings:entitlements.filter(e=>e.severity!=="None"),
  stats:{identities:employees.length,active:employees.filter(e=>e.status==="Active").length,entitlements:entitlements.length,findings:entitlements.filter(e=>e.severity!=="None").length,tickets:tickets.length,mfaRegistered:employees.filter(e=>e.mfa==="Registered").length}
};

const output = resolve(process.cwd(),"app/data.json");
mkdirSync(dirname(output),{recursive:true});
writeFileSync(output,JSON.stringify(data,null,2));
console.log(`Created ${output}: ${data.stats.identities} identities, ${data.stats.entitlements} entitlements, ${data.stats.findings} findings, ${data.stats.tickets} tickets.`);
