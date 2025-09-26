# ESXi Host Overview

## What is ESXi?

VMware ESXi is a lightweight, enterprise-class, type-1 hypervisor developed by VMware for deploying and serving virtual computers. It is the foundational component of VMware vSphere and is installed directly on physical hardware, allowing you to run multiple virtual machines (VMs) on a single server.

---

## Key Features of ESXi

- **Bare-metal hypervisor:** Installs directly on server hardware, not on top of an operating system.
- **Resource Management:** Efficiently allocates CPU, memory, storage, and network resources to VMs.
- **High Availability:** Supports features like vMotion, HA, and DRS for uptime and load balancing.
- **Security:** Minimal attack surface, secure boot, and role-based access control.
- **Centralized Management:** Managed via vCenter Server for large-scale environments.

---

## ESXi Host Architecture

- **VMkernel:** The core OS that manages hardware resources and VM execution.
- **Management Interfaces:** Accessed via DCUI (Direct Console User Interface), SSH, or the web interface.
- **Datastores:** Storage containers for VM files, ISO images, and snapshots.
- **Networking:** Supports standard and distributed virtual switches for VM connectivity.

---

## Common ESXi Host Tasks

- Installing and configuring ESXi on physical servers.
- Creating, configuring, and managing virtual machines.
- Managing storage and network resources.
- Monitoring host performance and health.
- Applying patches and updates.
- Troubleshooting hardware and VM issues.

---

## ESXi Host Use Cases

- Server consolidation and virtualization.
- Test and development environments.
- High-availability clusters.
- Disaster recovery solutions.

---

## Useful ESXi Commands

```shell
# View ESXi version
vmware -v

# List all VMs on the host
vim-cmd vmsvc/getallvms

# Check host hardware info
esxcli hardware

# Restart management agents
services.sh restart

# List network interfaces
esxcli network nic list

# List storage devices
esxcli storage core device list

# Check datastore usage
esxcli storage filesystem list

# List running services
esxcli system services list

# Start/Stop/Restart a service (example: SSH)
esxcli system services start --service=TSM-SSH
esxcli system services stop --service=TSM-SSH
esxcli system services restart --service=TSM-SSH

# Check system uptime
esxcli system uptime get

# Display system logs
cat /var/log/syslog.log

# Check host firewall status
esxcli network firewall get

# Enable maintenance mode
esxcli system maintenanceMode set --enable true

# Exit maintenance mode
esxcli system maintenanceMode set --enable false
```

---

For more details, refer to the [VMware ESXi Documentation](https://docs.vmware.com/en/VMware-vSphere/index.html).