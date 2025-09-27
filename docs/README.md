# Welcome to VTeamops Docs: Your Guide to Everything Awesome

## VMware vSphere 8 Foundations  
**Duration:** 75 Hrs

---

## Key Topics

- vSphere Editions and Features
- vSphere Architecture and Solutions
- vCenter Server Installation and Configuration
- ESXi Installation and Configuration
- Site Recovery Manager 8.x (Install, Configure & Manage)
- vSAN Installation and Configuration
- Disaster Recovery with Site Recovery Manager
- Site Recovery Manager Architecture and Deployment
- Inventory Mappings and Replication
- Protection Groups and Recovery Plans
- VMware vSphere Automation (PowerCLI / Ansible / Terraform)
- Monitoring and Troubleshooting
- Troubleshooting Scenarios

---

## vSphere 8 Architecture Overview

```mermaid
flowchart TD
    VC[vCenter Server (Mgmt)]
    VC --> ESXi1
    VC --> ESXi2
    VC --> ESXi3

    subgraph Cluster1 [vSAN Cluster]
        ESXi1[ESXi (Hosts)]
    end

    subgraph Cluster2 [vSAN Cluster]
        ESXi2[ESXi (Hosts)]
        ESXi3[ESXi (Hosts)]
    end

    Cluster1 <--> Cluster2

    NSXT1[NSX-T Manager]
    NSXT2[NSX-T Manager]
    Cluster1 --> NSXT1
    Cluster2 --> NSXT2
    NSXT1 <--> NSXT2

    SRM1[SRM Primary]
    SRM2[SRM Secondary]
    NSXT1 --> SRM1
    NSXT2 --> SRM2
    SRM1 <--> SRM2

    SRM1 --> Prod[Production Site]
    SRM2 --> DR[DR / Recovery Site]
```