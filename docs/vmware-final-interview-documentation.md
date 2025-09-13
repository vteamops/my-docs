# VMware & Windows Server Administrator Interview Guide

---

## About Yourself

**1. Explain about yourself:**  
I am **{your name}** and born & brought up in **{your Location}** (e.g., Chennai). I did my BTech in IT Stream during **{Years}** (e.g., 2008). I have a total of **{Number of years}** (e.g., 5+) years of IT experience and currently I am supporting **{Project Name & Company}** as a VMware and Windows Server Administrator. My primary responsibility is VMware Virtualization.

---

## Infrastructure Overview

** Explain your infrastructure:**  
Currently, I am supporting XXXX as VMware and Windows administrator, managing 20+ physical ESXi servers and 400+ VMs. We have data centers in the USA & UK regions and provide 24x7 support.  
All 20 hosts run ESXi 5.5 on HP ProLiant BL460c G4, managed with HP C7000 Enclosure and OA (Onboard Administrator). I also have knowledge of Cisco UCS Manager 2.2 (3g), Blade Cisco B200-M3 & B440-M2.

- 2 clusters, each with 10 hosts
- HA and DRS configured with 2 host failover tolerance and DRS rules
- Managing EMC VNX 5500 and HP SAN EVA 4400 SAN boxes

---

## Roles and Responsibilities

**. Build Level Activities:**  
- ESXi Build  
- Windows Physical Build  
- VM build with template & ISO  
- Cluster build (HA & DRS configuration)  
- Storage adding & network switches configuration  

** Operational Responsibilities:**  
- Server UP/DOWN issues  
- Services UP/DOWN issues (Service Start & Stop)  
- Resource utilization analysis (High Memory, High CPU, High Network Traffic)  
- Disk & Datastore issues (Low disk space)  
- Patching of VM & ESXi (Microsoft Security, Non-Critical & Critical Patches, ESXi Patches from VC)  
- ESXi & vCenter upgradation  
- VM tool & VM H/W upgradation (requires downtime)  
- Faulty H/W replacement (coordinating with vendors)  
- Daily operations meetings & weekly CAB calls  
- Handling change incidents, service requests, and problem management  
- Environmental upgradation activities (4.0 to 5.5)  
- RCA, on-call support, escalation matrix  
- Technical document preparation  
- Inventory & firmware updates  

---

## Hardware Questions and Answers

** Types of Hardware & Remote Boards:**  

| Vendor   | Remote Board | Rack Models | Blade Models |
|----------|--------------|-------------|--------------|
| HP       | ILO          | Proliant DL 380p Gen8, DL380 G9, DL 380e G8, DL 580 G9 | BL460CG9, BL460CG6 |
| DELL     | DRAC         | PowerEdge R510, T610, 2950, T410, R710, R805 | M610, M620 |
| IBM      | IMM          | System x3850 X5 -[7143,7144,7145 5RG], IBM X3850 | HS22V, HS23, HS23E |
| FUJITSU  | IRMC         | RX300 S6, RX300 S7 | - |
| CISCO    | UCS Manager, KVM | UCS C3260, UCS 3160 | UCSB-B200-M3, B440 BASE M2, UCS 5108 |

---

## UCS and Key Components

**3. What is UCS and UCS Key Components?**  
*Add your answer here...*

---

## RAID Configuration in HP, CISCO & DELL Rack Servers

**4. How to configure RAID 0, 1, 5 & 6?**  
**HP:**  
- Use HP Smart Start for models < G7.  
- Use Intelligent Provisioning (F10) for models > G7.  
- RAID 1 for OS (C:), RAID 5 for Application (D:), RAID 6 for double parity.  

**CISCO:**  
*Add details...*  

**DELL:**  
*Add details...*  

---

## ILO Configuration

**5. How to configure ILO for Production Servers?**  
*Add your answer here...*

---

## Updating VLANs in Virtual Connect Manager

**6. How to update VLANs in Virtual Connect Manager (VC--Chassis)?**  
When using HP Virtual Connect Flex-10 and HP blades that have Flex-10 LOM (LAN on Motherboard) interfaces. As you might already know, Flex-10 LOMs have the ability to “subdivide” themselves into four logical instances, each of them a valid PCIe function, which are called FlexNICs. These FlexNICs appear as real, actual, physical NICs to the operating system installed on the blades.
This includes VMware ESX/ESXi. In the Virtual Connect Manager, though, you have the ability to fine-tune the amount of bandwidth allocated to each of these FlexNICs, up to the shared maximum of 10Gbps.
This is pretty cool, but there is one limitation of which you must be aware—a limitation that is particularly significant in VMware ESX/ESXi environments. When you use the Multiple Networks option to map multiple VLANs onto a FlexNIC, you can’t map the same VLAN onto two different FlexNICs from the same LOM.
The same VLANs we can’t map to single network connections. Why? Because each of these connections are 
logical FlexNICs on the same LOM (LAN on Motherboard)  and 0J ¸ can’t map the same VLANs to more than 
one FlexNIC on the same LOM.
Multiple VLANs are mapped to (More connections) in Virtual Connect Manager


---

*Continue this structure for the rest of your content...*



