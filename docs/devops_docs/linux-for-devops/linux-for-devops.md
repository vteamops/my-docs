# 🐧 Linux for DevOps Engineers

## 📘 1. Linux Fundamentals for DevOps

### 1.1 File System & Navigation
| Command | Description |
|----------|--------------|
| `pwd` | Print working directory |
| `ls -lAh` | List files with details and human-readable sizes |
| `cd /path` | Change directory |
| `mkdir /tmp/test` | Create directory |
| `rm -rf /tmp/test` | Remove directory recursively |

**Important Directories**
- `/etc` → System config files  
- `/var/log` → Logs  
- `/home` → User home directories  
- `/opt` → Optional software  
- `/tmp` → Temporary files  
- `/usr/bin` → User binaries  

### 1.2 File Permissions & Ownership
| Command | Description |
|----------|--------------|
| `chmod 755 script.sh` | Set permissions (rwxr-xr-x) |
| `chown user:group file` | Change owner and group |
| `ls -l` | Show permissions |

Example:
```bash
-rwxr-xr--  1 devops dev  1234 Nov 9  script.sh
```

### 1.3 Process Management
| Command | Description |
|----------|--------------|
| `ps aux | grep nginx` | View running processes |
| `top` / `htop` | Monitor CPU/memory usage |
| `kill -9 PID` | Force kill process |
| `systemctl status nginx` | Check service status |
| `journalctl -u nginx` | View service logs |

### 1.4 Networking & SSH
| Command | Description |
|----------|--------------|
| `ip a` / `ifconfig` | Show IP interfaces |
| `ping google.com` | Check connectivity |
| `netstat -tulnp` | Show listening ports |
| `ss -ltnp` | Newer socket tool |
| `scp file.txt user@host:/path` | Copy file over SSH |
| `ssh user@host` | Connect to remote host |

**Firewall**
```bash
sudo ufw status
sudo ufw allow 22/tcp
sudo ufw enable
```

### 1.5 Package Management
**Debian/Ubuntu**
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx
```
**RHEL/CentOS**
```bash
sudo yum install httpd
sudo dnf upgrade
```

### 1.6 Systemd & Cron
**Systemctl**
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

**Crontab**
```bash
crontab -e
# Example: backup every day at 2 AM
0 2 * * * /scripts/backup.sh
```

### 1.7 Monitoring & Logs
| Command | Description |
|----------|--------------|
| `df -h` | Disk usage |
| `du -sh *` | Folder size |
| `free -m` | Memory usage |
| `uptime` | System load |
| `tail -f /var/log/syslog` | Live log monitoring |

### 1.8 Shell Scripting Basics
```bash
#!/bin/bash
for host in server1 server2 server3
do
  echo "Pinging $host"
  ping -c 2 $host
done
```

---

## ⚡ 2. Linux Cheatsheet for Daily DevOps

| Task | Command |
|------|----------|
| Search logs | `grep -i error /var/log/syslog` |
| Check open ports | `ss -tuln` |
| Test network | `curl -I https://example.com` |
| Compress files | `tar -czvf backup.tar.gz /data` |
| Extract | `tar -xzvf backup.tar.gz` |
| Disk usage | `du -sh /var/*` |
| Last reboot | `who -b` |
| Scheduled jobs | `crontab -l` |
| Environment vars | `printenv` |
| Check service startup logs | `journalctl -xe` |

---

## 🐳 3. Docker & Kubernetes CLI + Linux Troubleshooting

### 3.1 Docker Basics
```bash
docker ps -a
docker images
docker exec -it container bash
docker logs -f container
docker build -t myapp .
docker run -d -p 8080:80 myapp
```

**Cleanup**
```bash
docker system prune -a
docker volume prune
```

### 3.2 Kubernetes CLI
```bash
kubectl get pods -A
kubectl describe pod mypod
kubectl logs mypod -f
kubectl exec -it mypod -- /bin/bash
kubectl apply -f deployment.yaml
kubectl get nodes -o wide
```

### 3.3 Linux + Container Troubleshooting
| Issue | Command |
|--------|----------|
| Check system logs | `dmesg | tail` |
| Disk full | `df -h && du -sh /var/lib/docker/*` |
| Network blocked | `iptables -L -n -v` |
| Service crash | `systemctl status docker` |
| DNS issue | `cat /etc/resolv.conf` |

---

## 🧰 Useful Tools
- `htop` → interactive process viewer  
- `ncdu` → disk usage analyzer  
- `nmap` → network scanner  
- `jq` → JSON parser for CLI  
- `tmux` → terminal multiplexer  

---

## ✅ Summary
A DevOps Engineer must:
1. Master Linux fundamentals (permissions, processes, systemd, networking)  
2. Automate tasks with shell scripts  
3. Manage services & logs  
4. Troubleshoot containers and Kubernetes nodes from Linux level  
