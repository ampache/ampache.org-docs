---
title: "Cron"
metaTitle: "Cron"
description: "Cron"
---

## Speed up Ampache using cron

A common complaint is that Ampache can be slow! Lets look at making that a things of the past!

We have added new options to the database and some example systemd units/timers into /docs/examples. The concept is simply to preload caches that Ampache queries in the background instead of each time you use them.

By default Ampache tries to do everything at once but lets do things a bit smarter!

## Process

First up; make sure you've enabled the memory cache in your config file.
![image](/img/1305249/79297410-65653000-7f21-11ea-98f8-76184a7f14b5.png)

**NOTE** from Ampache8 `memory_cache` defaults to `"true"`, so unless you turned it off there is nothing to do here.

Then enable the cron_cache option in the Admin settings page.
![image](/img/1305249/79296198-18338f00-7f1e-11ea-824a-0a627ab1156f.png)

Ampache8 adds a companion preference, `Add live plays to the cached count for accurate stats` (`cron_cache_live_count`). With `cron_cache` on, played counters come from the cache and lag until the next cron run; turning this on adds the plays recorded since that run to the cached value, at the cost of an extra query per count. It is admin-only and off by default.

* Copy or create the unit file and timer using the example below. (Edit to match your web path and web user.)

```shell
sudo cp /var/www/html/docs/examples/ampache_cron.* /etc/systemd/system/
```

* Enable the service and timer.

```shell
sudo systemctl unmask ampache_cron.service
sudo systemctl unmask ampache_cron.timer
sudo systemctl enable ampache_cron.timer
sudo systemctl enable ampache_cron.service

```

* Start the service

```shell
sudo systemctl start ampache_cron.timer
```

* Check the status

```shell
root@web:~# systemctl status ampache_cron
● ampache_cron.service - ampache_cron
     Loaded: loaded (/etc/systemd/system/ampache_cron.service; enabled; vendor preset: enabled)
     Active: inactive (dead) since Wed 2020-04-15 13:32:19 AEST; 11min ago
TriggeredBy: ● ampache_cron.timer
       Docs: https://ampache.org/docs/configuration/cron
    Process: 129213 ExecStart=/usr/bin/php bin/cli run:cronProcess (code=exited, status=0/SUCCESS)
   Main PID: 129213 (code=exited, status=0/SUCCESS)

Apr 15 13:30:01 web systemd[1]: Starting ampache_cron...
Apr 15 13:32:19 web systemd[1]: ampache_cron.service: Succeeded.
Apr 15 13:32:19 web systemd[1]: Finished ampache_cron.
```

* Enjoy!

## Unit File (ampache_cron.service)

This unit file runs the cron process from the `/var/www/html` folder as `www-data`. Change `WorkingDirectory`, `User` and `Group` to match your install.

```conf
[Unit]
Description=ampache_cron
After=network.target remote-fs.target nss-lookup.target
Documentation=https://ampache.org/docs/

[Service]
PrivateTmp=true
KillMode=mixed
Type=oneshot
User=www-data
Group=www-data
ExecStart=php bin/cli run:cronProcess
WorkingDirectory=/var/www/html
ProtectSystem=yes

[Install]
WantedBy=multi-user.target
```

## Run the cron on a timer

Now that your cron is running you want it to keep running. The timer below will repeat the cron every 15 minutes.
(for me personally it takes between 20 seconds and 2 minutes)

### Timer file (ampache_cron.timer)

```conf
[Unit]
Description=start ampache_cron.service

[Timer]
OnCalendar=*:0/15
Unit=ampache_cron.service

[Install]
WantedBy=timers.target
```

## Other timers in docs/examples

`docs/examples` carries a few more unit/timer pairs you can install the same way.

| Unit | What it runs |
|------|--------------|
| `ampache_cron` | `run:cronProcess` — the cache preload above |
| `ampache_podcasts` | `run:updateCatalog podcasts -a -g -i` — podcast feed sync |
| `ampache_websocket` | `run:websocket`, needed by listen-along broadcasting |
| `ampache_stats_consolidate` | `cleanup:consolidateStats -e` — **new in Ampache8** |

### Play history consolidation (Ampache8)

`ampache_stats_consolidate.timer` runs monthly and rolls detailed `object_count` rows older than your retention window into summary counts.

It does nothing until you set the window in `config/ampache.cfg.php`; `0` (the default) disables consolidation entirely.

```conf
; Keep 2 years of detailed history, consolidate anything older
stats_consolidate_threshold = 730
```

Drop the `-e` from `ExecStart` to preview what would be consolidated before enabling it for real.

Nothing is discarded — detail rows move to `object_count_archive` and `cleanup:restoreStats` puts them back. See [Play history consolidation](/docs/help/troubleshooting/ampache8-for-admins#play-history-consolidation) for what stays exact and what only covers the retained window.

## Scheduled Task for Windows (ampache_cron.xml)

For Windows servers you can do the same thing just using the inbuilt Windows [task scheduler](https://docs.microsoft.com/en-au/windows/win32/taskschd/task-scheduler-start-page?redirectedfrom=MSDN)

This example files uses the same path as the [Windows Installation Guide](/docs/installation/windows-installation-guide) make sure you update the file after importing to match your environment.

```xml
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Date>2020-04-23T15:03:41.4222785</Date>
    <Author>DESKTOP-AVHVJ8Q\user</Author>
    <URI>\Ampache_Cron</URI>
  </RegistrationInfo>
  <Triggers>
    <CalendarTrigger>
      <Repetition>
        <Interval>PT1H</Interval>
        <Duration>P1D</Duration>
        <StopAtDurationEnd>false</StopAtDurationEnd>
      </Repetition>
      <StartBoundary>2020-04-23T03:00:00</StartBoundary>
      <ExecutionTimeLimit>PT30M</ExecutionTimeLimit>
      <Enabled>true</Enabled>
      <ScheduleByDay>
        <DaysInterval>1</DaysInterval>
      </ScheduleByDay>
    </CalendarTrigger>
  </Triggers>
  <Principals>
    <Principal id="Author">
      <UserId>S-1-5-21-265541621-1343530117-3658157868-1001</UserId>
      <LogonType>S4U</LogonType>
      <RunLevel>LeastPrivilege</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>true</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>true</StopIfGoingOnBatteries>
    <AllowHardTerminate>true</AllowHardTerminate>
    <StartWhenAvailable>false</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
    <IdleSettings>
      <StopOnIdleEnd>true</StopOnIdleEnd>
      <RestartOnIdle>false</RestartOnIdle>
    </IdleSettings>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <Hidden>false</Hidden>
    <RunOnlyIfIdle>false</RunOnlyIfIdle>
    <WakeToRun>false</WakeToRun>
    <ExecutionTimeLimit>PT72H</ExecutionTimeLimit>
    <Priority>7</Priority>
  </Settings>
  <Actions Context="Author">
    <Exec>
      <Command>C:\php\php.exe</Command>
      <Arguments>bin\cli run:cronProcess</Arguments>
      <WorkingDirectory>C:\ampache</WorkingDirectory>
    </Exec>
  </Actions>
</Task>
```
