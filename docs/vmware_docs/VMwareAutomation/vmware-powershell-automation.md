# 🖥 VMware Automation with PowerShell & PowerCLI

This guide provides PowerShell scripts to automate common VMware vCenter and ESXi operations using **VMware PowerCLI**.

---

## 📌 1. Automate Snapshot Report

### **Description**
Generate a snapshot report in VMware vCenter and export it as a CSV file.

### **Prerequisites**
- Install VMware PowerCLI module:
  ```powershell
  Install-Module -Name VMware.PowerCLI -Scope CurrentUser
  ```
- Connect to your vCenter Server:
  ```powershell
  Connect-VIServer -Server <vcenter-server-name>
  ```

### **Script: Snapshot Report**
```powershell
# Import the PowerCLI module
Import-Module VMware.VimAutomation.Core

# Connect to vCenter Server
$vCenterServer = "<vcenter-server-name>"
Connect-VIServer -Server $vCenterServer

# Output file for the report
$outputFile = "SnapshotReport.csv"

# Retrieve all snapshots in vCenter
$snapshots = Get-VM | Get-Snapshot

# Create a report object
$report = @()

foreach ($snapshot in $snapshots) {
    $report += [PSCustomObject]@{
        VMName        = $snapshot.VM.Name
        SnapshotName  = $snapshot.Name
        CreatedBy     = $snapshot.CreatedBy
        CreatedOn     = $snapshot.Created
        SizeGB        = "{0:N2}" -f ($snapshot.SizeGB)
        Description   = $snapshot.Description
    }
}

# Export the report to CSV
$report | Export-Csv -Path $outputFile -NoTypeInformation -UseCulture

# Disconnect from vCenter
Disconnect-VIServer -Server $vCenterServer -Confirm:$false

Write-Host "Snapshot report generated: $outputFile"
```

### **Explanation**
- `Connect-VIServer` → Connects to vCenter.
- `Get-VM | Get-Snapshot` → Retrieves snapshots for all VMs.
- `Export-Csv` → Saves the snapshot details to `SnapshotReport.csv`.

---

## 📌 2. Automate Creating Snapshots

### **Description**
Automatically create snapshots for specific or all VMs in a vCenter environment.

### **Prerequisites**
- Install VMware PowerCLI:
  ```powershell
  Install-Module -Name VMware.PowerCLI -Scope CurrentUser
  ```
- Connect to vCenter:
  ```powershell
  Connect-VIServer -Server <vcenter-server-name>
  ```

### **Script: Create Snapshots**
```powershell
# Import the PowerCLI module
Import-Module VMware.VimAutomation.Core

# Connect to vCenter Server
$vCenterServer = "<vcenter-server-name>"
Connect-VIServer -Server $vCenterServer

# Parameters
$snapshotName = "AutomatedSnapshot_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
$snapshotDescription = "Automated snapshot created on $(Get-Date)"
$quiesce = $false # Set to $true to quiesce the guest file system

# VM selection
# Option 1: All VMs
# $vms = Get-VM

# Option 2: Specific VMs
$vms = Get-VM -Name "VM1", "VM2"

# Create snapshots
foreach ($vm in $vms) {
    try {
        Write-Host "Creating snapshot for VM: $($vm.Name)" -ForegroundColor Green
        New-Snapshot -VM $vm -Name $snapshotName -Description $snapshotDescription -Quiesce $quiesce
        Write-Host "Snapshot created for VM: $($vm.Name)" -ForegroundColor Cyan
    } catch {
        Write-Host "Failed to create snapshot for VM: $($vm.Name). Error: $_" -ForegroundColor Red
    }
}

# Disconnect from vCenter
Disconnect-VIServer -Server $vCenterServer -Confirm:$false

Write-Host "Snapshot process completed." -ForegroundColor Green
```

### **Notes**
- **Snapshot naming** uses date/time for uniqueness.
- **Quiesce** requires VMware Tools inside the guest.
- Avoid excessive snapshots to prevent performance impact.

---

## 📌 3. Automate ESXi Maintenance Mode

### **Description**
Automatically put an ESXi host into maintenance mode.

### **Prerequisites**
- Install VMware PowerCLI:
  ```powershell
  Install-Module -Name VMware.PowerCLI -Scope CurrentUser
  ```
- Connect to vCenter:
  ```powershell
  Connect-VIServer -Server <vcenter-server-name>
  ```

### **Script: Maintenance Mode**
```powershell
# Import the PowerCLI module
Import-Module VMware.VimAutomation.Core

# Connect to vCenter Server
$vCenterServer = "<vcenter-server-name>"
Connect-VIServer -Server $vCenterServer

# Specify the ESXi host name
$esxiHostName = "<esxi-host-name>"

# Retrieve the ESXi host object
$esxiHost = Get-VMHost -Name $esxiHostName

# Check if the host is already in maintenance mode
if ($esxiHost.ConnectionState -eq "Maintenance") {
    Write-Host "Host $esxiHostName is already in Maintenance Mode." -ForegroundColor Yellow
} else {
    try {
        # Enter Maintenance Mode
        Write-Host "Putting ESXi host $esxiHostName into Maintenance Mode..." -ForegroundColor Green
        Set-VMHost -VMHost $esxiHost -State Maintenance -Confirm:$false
        Write-Host "Host $esxiHostName is now in Maintenance Mode." -ForegroundColor Cyan
    } catch {
        Write-Host "Failed to put host $esxiHostName into Maintenance Mode. Error: $_" -ForegroundColor Red
    }
}

# Disconnect from vCenter
Disconnect-VIServer -Server $vCenterServer -Confirm:$false

Write-Host "Script completed." -ForegroundColor Green
```

### **Optional Enhancements**
- **Multiple Hosts in Cluster**
```powershell
$clusterName = "<cluster-name>"
$hosts = Get-Cluster -Name $clusterName | Get-VMHost

foreach ($host in $hosts) {
    if ($host.ConnectionState -ne "Maintenance") {
        Set-VMHost -VMHost $host -State Maintenance -Confirm:$false
        Write-Host "Host $($host.Name) is now in Maintenance Mode."
    } else {
        Write-Host "Host $($host.Name) is already in Maintenance Mode."
    }
}
```

- **Exit Maintenance Mode**
```powershell
Set-VMHost -VMHost $esxiHost -State Connected -Confirm:$false
```

- **Scheduling**
Use Windows Task Scheduler or cron to run scripts at specific times.

---

## 📌 4. Protect a Virtual Machine

_Last Updated June 24, 2025_

You can protect a virtual machine by replicating it to a remote SRM site.

### **Steps**

1. **Connect to the vCenter Server system that the SRM server is registered with:**
    ```powershell
    Connect-VIServer -Server vc3.example.com -User 'MyAdministratorUser' -Password 'MyPassword'
    ```

2. **Establish a connection to the local SRM server by providing credentials to the remote SRM site:**
    ```powershell
    $srmConnection = Connect-SrmServer -RemoteUser 'MyRemoteUser' -RemotePassword 'MyRemotePassword'
    ```

3. **List all protection groups associated with the SRM server:**
    ```powershell
    $srmApi = $srmConnection.ExtensionData
    $protectionGroups = $srmApi.Protection.ListProtectionGroups()
    ```

4. **Associate the TestVM virtual machine with the ProtGroup1 protection group and enable the protection for that virtual machine:**
    ```powershell
    $vmToAdd = Get-VM "TestVM"

    $targetProtectionGroup = $protectionGroups | where {$_.GetInfo().Name -eq "ProtGroup1" }

    $targetProtectionGroup.AssociateVms(@($vmToAdd.ExtensionData.MoRef))

    # Enable protection for that virtual machine
    $protectionSpec = New-Object VMware.VimAutomation.Srm.Views.SrmProtectionGroupVmProtectionSpec
    $protectionSpec.Vm = $vmToAdd.ExtensionData.MoRef
    $protectTask = $targetProtectionGroup.ProtectVms($protectionSpec)
    while(-not $protectTask.IsComplete()) { sleep -Seconds 1 }
    ```

---

## 📌 5. Automate VM Power Operations

### **Description**
Power on, power off, or suspend VMs based on specific criteria.

### **Prerequisites**
- Install VMware PowerCLI:
  ```powershell
  Install-Module -Name VMware.PowerCLI -Scope CurrentUser
  ```
- Connect to vCenter:
  ```powershell
  Connect-VIServer -Server <vcenter-server-name>
  ```

### **Script: VM Power Operations**
```powershell
# Import the PowerCLI module
Import-Module VMware.VimAutomation.Core

# Connect to vCenter Server
$vCenterServer = "<vcenter-server-name>"
Connect-VIServer -Server $vCenterServer

# VM selection
$vms = Get-VM -Name "VM1", "VM2"

# Power operations
foreach ($vm in $vms) {
    try {
        # Power on VM
        if ($vm.PowerState -ne "PoweredOn") {
            Write-Host "Powering on VM: $($vm.Name)" -ForegroundColor Green
            Start-VM -VM $vm
            Write-Host "VM powered on: $($vm.Name)" -ForegroundColor Cyan
        }

        # Suspend VM
        if ($vm.PowerState -eq "PoweredOn") {
            Write-Host "Suspending VM: $($vm.Name)" -ForegroundColor Green
            Suspend-VM -VM $vm
            Write-Host "VM suspended: $($vm.Name)" -ForegroundColor Cyan
        }

        # Power off VM
        if ($vm.PowerState -eq "PoweredOn") {
            Write-Host "Powering off VM: $($vm.Name)" -ForegroundColor Green
            Stop-VM -VM $vm -Confirm:$false
            Write-Host "VM powered off: $($vm.Name)" -ForegroundColor Cyan
        }
    } catch {
        Write-Host "Failed to perform operation on VM: $($vm.Name). Error: $_" -ForegroundColor Red
    }
}

# Disconnect from vCenter
Disconnect-VIServer -Server $vCenterServer -Confirm:$false

Write-Host "VM power operations completed." -ForegroundColor Green
```

### **Notes**
- Modify VM selection as needed.
- Be cautious with power operations to avoid data loss.

# VMware vSAN PowerCLI Automation

This document provides PowerCLI automation examples for managing and reporting on vSAN clusters.

---

## 1. Connect to vCenter
```powershell
# Connect to vCenter Server
Connect-VIServer -Server vcenter01.lab.local -User admin@vsphere.local -Password 'YourPassword'
```

---

## 2. List All vSAN Clusters
```powershell
# Get vSAN-enabled clusters
Get-Cluster | Where-Object { $_.VSANEnabled -eq $true } | Select Name, VSANEnabled
```

---

## 3. Check vSAN Cluster Health
```powershell
# Check vSAN health summary
Get-VsanClusterConfiguration -Cluster "Prod-Cluster" | Select Cluster, Enabled, HealthCheckInterval, DataEfficiencyEnabled
```

---

## 4. Get vSAN Disk Groups and Capacity
```powershell
# List Disk Groups and capacity details
Get-VsanDiskGroup -Cluster "Prod-Cluster" | 
Select Cluster, Ssd, CacheDiskCapacityGB, CapacityDisks, @{N="Capacity(GB)";E={($_.CapacityDisks | Measure-Object CapacityGB -Sum).Sum}}
```

---

## 5. Check vSAN Storage Policy Compliance
```powershell
# Verify VMs against their storage policy
Get-VM | Where-Object {$_.ExtensionData.StoragePolicyId -ne $null} | 
ForEach-Object {
    $result = Get-SpbmEntityConfiguration -Entity $_
    [PSCustomObject]@{
        VMName  = $_.Name
        Policy  = $result.StoragePolicy.Name
        ComplianceStatus = $result.ComplianceStatus
    }
}
```

---

## 6. Monitor vSAN Capacity Usage
```powershell
# Show vSAN usage summary for each cluster
Get-Cluster | Where-Object {$_.VSANEnabled} | 
ForEach-Object {
    $vsanConfig = Get-VsanClusterConfiguration -Cluster $_
    [PSCustomObject]@{
        Cluster = $_.Name
        UsedGB  = [math]::Round($vsanConfig.Usage.UsedSpaceGB,2)
        FreeGB  = [math]::Round($vsanConfig.Usage.FreeSpaceGB,2)
        TotalGB = [math]::Round($vsanConfig.Usage.TotalSpaceGB,2)
    }
}
```

---

## 7. vSAN Resyncing Objects
```powershell
# Check if any objects are resyncing
Get-VsanResyncingComponent -Cluster "Prod-Cluster" | 
Select VMName, ComponentUuid, BytesToSync, OwnerHost
```

---

## 8. Export vSAN Report to CSV
```powershell
# Export VM storage compliance report to CSV
$report = Get-VM | Where-Object {$_.ExtensionData.StoragePolicyId -ne $null} | 
ForEach-Object {
    $result = Get-SpbmEntityConfiguration -Entity $_
    [PSCustomObject]@{
        VMName  = $_.Name
        Policy  = $result.StoragePolicy.Name
        ComplianceStatus = $result.ComplianceStatus
    }
}
$report | Export-Csv "C:\Reports\vSAN_VM_Compliance.csv" -NoTypeInformation
```

---

## Notes
- You need **PowerCLI 13.x+** for some vSAN cmdlets.  
- `Get-Vsan*` cmdlets come from the **VMware.VimAutomation.Storage** module.  
- Run `Get-Module -Name VMware* -ListAvailable` to confirm modules are loaded.  

# vCenter VAMI Upgrade PowerCLI Automation

This document provides PowerCLI and REST API automation examples for managing and upgrading vCenter through the VAMI interface.

---

## 1. Connect to VAMI API
```powershell
# Define vCenter VAMI credentials and server
$vamiServer = "vcenter01.lab.local"
$vcUser = "root"
$vcPass = "YourPassword"

# Ignore cert warnings
add-type @"
using System.Net;
using System.Security.Cryptography.X509Certificates;
public class TrustAllCertsPolicy : ICertificatePolicy {
    public bool CheckValidationResult(
        ServicePoint srvPoint, X509Certificate certificate,
        WebRequest request, int certificateProblem) { return true; }
}
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

# Create a session
$secpasswd = ConvertTo-SecureString $vcPass -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential ($vcUser, $secpasswd)

# Get session token from VAMI
$response = Invoke-RestMethod -Method Post -Uri "https://$vamiServer:5480/rest/com/vmware/cis/session" -Credential $cred -SkipCertificateCheck
$session = $response.value
$headers = @{ "vmware-api-session-id" = $session }
```

---

## 2. Check Current vCenter Version
```powershell
# Get current appliance version
Invoke-RestMethod -Method Get -Uri "https://$vamiServer:5480/rest/appliance/system/version" -Headers $headers -SkipCertificateCheck
```

---

## 3. Check Available Updates
```powershell
# List available updates
Invoke-RestMethod -Method Get -Uri "https://$vamiServer:5480/rest/appliance/update/pending" -Headers $headers -SkipCertificateCheck
```

---

## 4. Stage the Update
```powershell
# Stage the update before installing
Invoke-RestMethod -Method Post -Uri "https://$vamiServer:5480/rest/appliance/update/stage" -Headers $headers -SkipCertificateCheck
```

---

## 5. Install the Update
```powershell
# Trigger update installation
Invoke-RestMethod -Method Post -Uri "https://$vamiServer:5480/rest/appliance/update/install" -Headers $headers -SkipCertificateCheck
```

---

## 6. Monitor Update Status
```powershell
# Check status of update
Invoke-RestMethod -Method Get -Uri "https://$vamiServer:5480/rest/appliance/update" -Headers $headers -SkipCertificateCheck
```

---

## 7. Reboot if Required
```powershell
# Reboot appliance if required
Invoke-RestMethod -Method Post -Uri "https://$vamiServer:5480/rest/appliance/system/shutdown?action=reboot" -Headers $headers -SkipCertificateCheck
```

---

## Notes
- Always take a **backup** or snapshot of vCenter before upgrade.  
- Make sure **PSC / vSphere services** dependencies are healthy.  
- Upgrade should be done in a **maintenance window**.  
- Some updates may require manual acceptance of **EULA**.  

