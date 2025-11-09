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
graph TD
    subgraph Management Planes
        VxRailManager["VxRail Manager / vCenter"]
        NSXTManager["NSX-T Manager"]
    end

    subgraph Physical Network
        P0["P0"]
        P1["P1"]
    end

    subgraph VxRail Host
        direction TB
        VxRailManagement["VxRail Management, vSAN, vMotion"]
        VMK0["VMK 0"]
        VMK1["VMK 1"]
        VMK2["VMK 2"]
        VMWorkload["VM workload"]
        VM1["VM1"]
        VM2["VM2"]
        VM3["VM3"]
        VM4["VM4"]
        VM5["VM5"]

        VxRailManagement --- VMK0
        VxRailManagement --- VMK1
        VxRailManagement --- VMK2
        VMWorkload --- VM1
        VMWorkload --- VM2
        VMWorkload --- VM3
        VMWorkload --- VM4
        VMWorkload --- VM5
    end

    VxRailManager --> P0
    VxRailManager --> P1
    NSXTManager --> P0
    NSXTManager --> P1

    P0 --> VxRailManagement
    P1 --> VxRailManagement
    P0 --> VMWorkload
    P1 --> VMWorkload
```

