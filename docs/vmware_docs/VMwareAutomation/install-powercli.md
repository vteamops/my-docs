# Installing VMware PowerCLI on Windows

> ⚠️ **Before you begin:**  
> It is recommended to have prior knowledge of PowerShell and basic programming or business logic concepts before proceeding with this documentation.

VMware PowerCLI is a set of PowerShell modules for managing and automating VMware environments. Installing PowerCLI on Windows is straightforward and can be done using PowerShell's built-in module management commands.

---

## Prerequisites

- Windows 10 or later (or Windows Server 2016 and above)
- PowerShell 5.1 or later (PowerShell Core is also supported)
- Internet connection (to download the module from the PowerShell Gallery)

---

## Installation Steps

1. **Open PowerShell as Administrator**

   - Click the Start menu, type `PowerShell`, right-click **Windows PowerShell**, and select **Run as administrator**.

2. **Set the Execution Policy (if required)**

   PowerCLI modules are signed, but if you encounter policy errors, run:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Install the PowerCLI Module**

   Use the following command to install PowerCLI from the PowerShell Gallery:
   ```powershell
   Install-Module -Name VMware.PowerCLI -Scope CurrentUser
   ```

   - If prompted to install from an untrusted repository, type `Y` and press Enter.

4. **Verify the Installation**

   After installation, check the installed version:
   ```powershell
   Get-Module -Name VMware.PowerCLI -ListAvailable
   ```

5. **Import the PowerCLI Module**

   Import the module into your session:
   ```powershell
   Import-Module VMware.PowerCLI
   ```

6. **Disable CEIP (Optional)**

   By default, PowerCLI enables VMware's Customer Experience Improvement Program (CEIP). To disable it:
   ```powershell
   Set-PowerCLIConfiguration -Scope User -ParticipateInCEIP $false
   ```

---

## Next Steps

You can now start using PowerCLI to connect to your vCenter Server or ESXi hosts and automate VMware tasks.

For more details, see the [VMware PowerCLI Documentation](https://developer.vmware.com/powercli).