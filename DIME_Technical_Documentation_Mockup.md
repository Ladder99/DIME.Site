# DIME Technical Documentation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DIME - Data In Motion Enterprise                         │
│           Complete Industrial DataOps Platform Documentation                │
│                          Version 6.6.6                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Table of Contents

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. PLATFORM OVERVIEW                                                        │
│    1.1 What is DIME?                                                       │
│    1.2 Architecture & Core Components                                       │
│    1.3 Key Features & Capabilities                                         │
│    1.4 Performance Specifications                                          │
│                                                                            │
│ 2. GETTING STARTED                                                         │
│    2.1 Installation Guide                                                  │
│        2.1.1 Windows Installation                                          │
│        2.1.2 Docker Deployment                                             │
│        2.1.3 Linux Installation                                            │
│    2.2 Quick Start Tutorial                                                │
│    2.3 Basic Configuration                                                 │
│                                                                            │
│ 3. CONFIGURATION REFERENCE                                                 │
│    3.1 YAML Configuration Structure                                        │
│    3.2 App Configuration                                                   │
│    3.3 Source Connectors                                                   │
│    3.4 Sink Connectors                                                     │
│    3.5 Items Configuration                                                 │
│                                                                            │
│ 4. CONNECTOR CATALOG                                                       │
│    4.1 Industrial Protocols                                                │
│    4.2 Enterprise Systems                                                  │
│    4.3 Database Connectors                                                 │
│    4.4 Message Queue Connectors                                            │
│    4.5 Cloud Services                                                      │
│                                                                            │
│ 5. SCRIPTING & TRANSFORMATIONS                                            │
│    5.1 Lua Scripting                                                       │
│    5.2 Python Support                                                      │
│    5.3 Template Engines                                                    │
│    5.4 Script Functions Reference                                          │
│                                                                            │
│ 6. ADVANCED FEATURES                                                       │
│    6.1 HTM Neuromorphic Engine                                            │
│    6.2 AI Configuration Generation                                         │
│    6.3 Digital Twin Builder                                                │
│    6.4 Analytics Workbench                                                 │
│                                                                            │
│ 7. MONITORING & MANAGEMENT                                                 │
│    7.1 Status Server                                                       │
│    7.2 Web Interface                                                       │
│    7.3 Performance Monitoring                                              │
│    7.4 Configuration Management                                            │
│                                                                            │
│ 8. DEPLOYMENT & OPERATIONS                                                 │
│    8.1 Production Deployment                                               │
│    8.2 Security Configuration                                              │
│    8.3 High Availability                                                   │
│    8.4 Troubleshooting                                                     │
│                                                                            │
│ 9. INDUSTRY SOLUTIONS                                                      │
│    9.1 Automotive Manufacturing                                            │
│    9.2 Aerospace & Defense                                                 │
│    9.3 Pharmaceutical                                                      │
│    9.4 Food & Beverage                                                     │
│                                                                            │
│ 10. API & INTEGRATION                                                      │
│    10.1 REST API Reference                                                 │
│    10.2 WebSocket Interface                                                │
│    10.3 SDK Documentation                                                  │
│    10.4 Custom Connector Development                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 1. PLATFORM OVERVIEW

### 1.1 What is DIME?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Data In Motion Enterprise (DIME) is an extensible software framework that   │
│ moves and reshapes data from enterprise and industrial sources to message   │
│ queues, databases, and other sinks.                                        │
│                                                                            │
│ KEY CAPABILITIES:                                                          │
│ • 40+ enterprise and industrial connectors in a single platform            │
│ • Python, Lua, Scriban and Liquid scripting                              │
│ • Deployable as console app, Windows Service or Docker container          │
│ • Embeddable into other applications                                      │
│ • Extensible framework for quick connector additions                      │
│ • AI-powered configuration generation                                     │
│ • Neuromorphic HTM anomaly detection                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Architecture & Core Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DIME Architecture                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐                │
│  │   SOURCES   │    │  RING BUFFER │    │    SINKS     │                │
│  ├─────────────┤    │              │    ├──────────────┤                │
│  │ • PLCs      │───►│  Disruptor   │───►│ • Databases  │                │
│  │ • SCADA     │    │  Pattern     │    │ • MQTT       │                │
│  │ • Robots    │    │              │    │ • Cloud      │                │
│  │ • Sensors   │    │  <1ms latency│    │ • Files      │                │
│  │ • Databases │    │              │    │ • APIs       │                │
│  └─────────────┘    └──────────────┘    └──────────────┘                │
│         ▲                                        │                         │
│         │            ┌──────────────┐            │                         │
│         └────────────│ SCRIPT ENGINE│────────────┘                         │
│                      │ • Lua        │                                      │
│                      │ • Python     │                                      │
│                      │ • Templates  │                                      │
│                      └──────────────┘                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Data Flow Through DIME                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  1. SOURCE CONNECTOR                                                       │
│     ┌─────────────┐                                                       │
│     │   Device    │  ← Polling Timer (configurable interval)              │
│     │   Read      │  ← Push-based for streaming sources                   │
│     └──────┬──────┘                                                       │
│            │                                                               │
│  2. TRANSFORMATION                                                         │
│     ┌──────▼──────┐                                                       │
│     │   Script    │  ← Item-level or connector-level scripts              │
│     │  Processing │  ← Result variable contains device data                │
│     └──────┬──────┘                                                       │
│            │                                                               │
│  3. MESSAGE INBOX                                                          │
│     ┌──────▼──────┐                                                       │
│     │  Common     │  ← Normalized message format                          │
│     │   Format    │  ← Path, Value, Timestamp                             │
│     └──────┬──────┘                                                       │
│            │                                                               │
│  4. RING BUFFER                                                            │
│     ┌──────▼──────┐                                                       │
│     │  Disruptor  │  ← Lock-free, high-performance                        │
│     │   Pattern   │  ← Configurable buffer size                           │
│     └──────┬──────┘                                                       │
│            │                                                               │
│  5. SINK PROCESSING                                                        │
│     ┌──────▼──────┐                                                       │
│     │   Filter    │  ← Include/exclude patterns                           │
│     │ Transform   │  ← Sink-specific formatting                           │
│     └──────┬──────┘                                                       │
│            │                                                               │
│  6. TARGET SYSTEM                                                          │
│     ┌──────▼──────┐                                                       │
│     │   Write     │  ← Protocol-specific delivery                         │
│     │    Data     │  ← Guaranteed delivery options                        │
│     └─────────────┘                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Performance Specifications

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Performance Characteristics                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  THROUGHPUT                                                                │
│  • 1M+ messages/second on standard hardware                               │
│  • Linear scalability with CPU cores                                      │
│  • Zero data loss with back-pressure handling                             │
│                                                                            │
│  LATENCY                                                                   │
│  • <1ms end-to-end processing                                             │
│  • Microsecond-level ring buffer operations                               │
│  • Real-time streaming capabilities                                        │
│                                                                            │
│  RESOURCE USAGE                                                            │
│  • Minimum: 2 cores, 4GB RAM                                              │
│  • Recommended: 4+ cores, 8GB+ RAM                                        │
│  • Disk: 100MB base + data storage                                        │
│                                                                            │
│  RELIABILITY                                                               │
│  • 99.99% uptime in production                                            │
│  • Automatic reconnection                                                  │
│  • Configurable retry policies                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. GETTING STARTED

### 2.1 Installation Guide

#### 2.1.1 Windows Installation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Windows Installation                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  CONSOLE MODE:                                                             │
│  1. Download latest release from:                                          │
│     https://github.com/Ladder99/DIME/releases                             │
│                                                                            │
│  2. Extract ZIP file to desired location                                  │
│                                                                            │
│  3. Run DIME.exe from command prompt:                                     │
│     > DIME.exe                                                             │
│                                                                            │
│  4. Exit with CTRL+C                                                      │
│                                                                            │
│  WINDOWS SERVICE:                                                          │
│  1. Open command prompt as Administrator                                   │
│                                                                            │
│  2. Install service:                                                       │
│     > DIME.exe install                                                     │
│                                                                            │
│  3. Start service:                                                         │
│     > DIME.exe start                                                       │
│     OR use Services snap-in                                                │
│                                                                            │
│  4. Stop service:                                                          │
│     > DIME.exe stop                                                        │
│                                                                            │
│  5. Uninstall service:                                                     │
│     > DIME.exe uninstall                                                   │
│                                                                            │
│  MULTIPLE INSTANCES:                                                       │
│  > DIME.exe install /instance:DimeOne /config:c:/config1                  │
│  > DIME.exe install /instance:DimeTwo /config:c:/config2                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2.1.2 Docker Deployment

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Docker Deployment                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  QUICK START:                                                              │
│  $ docker pull ladder99/dime:latest                                        │
│  $ docker run --name dime -d ladder99/dime:latest                         │
│  $ docker logs -f --tail 100 dime                                         │
│                                                                            │
│  PRODUCTION DOCKER-COMPOSE:                                                │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ services:                                                  │           │
│  │   dime:                                                    │           │
│  │     container_name: dime                                   │           │
│  │     image: ladder99/dime:latest                            │           │
│  │     restart: unless-stopped                                 │           │
│  │     networks:                                               │           │
│  │       - dime                                                │           │
│  │     ports:                                                  │           │
│  │       - "5000:5000"  # MTConnect Agent                      │           │
│  │       - "7878:7878"  # SHDR                                 │           │
│  │       - "8080:8080"  # HTTP Sink                            │           │
│  │       - "8081:8081"  # HTTP Source                          │           │
│  │       - "8082:8082"  # WebSocket                            │           │
│  │       - "9998:9998"  # Status WebSocket                     │           │
│  │       - "9999:9999"  # Status HTTP                          │           │
│  │     volumes:                                                │           │
│  │       - /etc/localtime:/etc/localtime:ro                   │           │
│  │       - /etc/timezone:/etc/timezone:ro                     │           │
│  │       - ~/volumes/dime/nlog.config:/app/nlog.config:ro     │           │
│  │       - ~/volumes/dime/configs:/app/Configs:rw             │           │
│  │       - ~/volumes/dime/lua:/app/Lua:ro                     │           │
│  │       - ~/volumes/dime/logs:/app/Logs:rw                   │           │
│  │     logging:                                                │           │
│  │       driver: "json-file"                                   │           │
│  │       options:                                               │           │
│  │         max-file: "5"                                       │           │
│  │         max-size: "1m"                                      │           │
│  │                                                              │           │
│  │ networks:                                                   │           │
│  │   dime:                                                     │           │
│  │     name: dime                                              │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Basic Configuration Example

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Basic Configuration (main.yaml)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  # main.yaml - Minimal working configuration                              │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ app:                                                       │           │
│  │   license: AAAA-BBBB-CCCC-DDDD-EEEE-FFFF-GGGG-HHHH       │           │
│  │   ring_buffer: !!int 4096                                  │           │
│  │   http_server_uri: http://127.0.0.1:9999/                 │           │
│  │   ws_server_uri: ws://127.0.0.1:9998/                     │           │
│  │                                                            │           │
│  │ sinks:                                                     │           │
│  │   - name: console                                          │           │
│  │     connector: Console                                     │           │
│  │     exclude_filter:                                        │           │
│  │       - ".*\\$SYSTEM.*"                                    │           │
│  │                                                            │           │
│  │ sources:                                                   │           │
│  │   - name: simulator                                        │           │
│  │     connector: Script                                      │           │
│  │     scan_interval: !!int 1000                              │           │
│  │     items:                                                 │           │
│  │       - name: temperature                                  │           │
│  │         script: return math.random(20, 30)                 │           │
│  │       - name: pressure                                     │           │
│  │         script: return math.random(100, 200)               │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 3. CONFIGURATION REFERENCE

### 3.1 YAML Configuration Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Configuration File Structure                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ROOT STRUCTURE:                                                           │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ app:          # Framework configuration                    │           │
│  │   ...                                                      │           │
│  │                                                            │           │
│  │ sinks:        # List of data destinations                 │           │
│  │   - ...                                                    │           │
│  │   - ...                                                    │           │
│  │                                                            │           │
│  │ sources:      # List of data sources                      │           │
│  │   - ...                                                    │           │
│  │   - ...                                                    │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  FILE ORGANIZATION:                                                        │
│  • main.yaml (required) - loaded last, can reference others               │
│  • Additional *.yaml files in ./Configs folder                            │
│  • Use YAML anchors (&) and references (*) for modularity                 │
│                                                                            │
│  YAML ANCHORS EXAMPLE:                                                    │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ # console.yaml                                             │           │
│  │ console: &console                                          │           │
│  │   name: console                                            │           │
│  │   connector: Console                                       │           │
│  │                                                            │           │
│  │ # main.yaml                                                │           │
│  │ sinks:                                                     │           │
│  │   - *console                                               │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 App Configuration Section

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        App Configuration Options                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ app:                                                       │           │
│  │   # License key (15-minute demo without valid license)    │           │
│  │   license: AAAA-BBBB-CCCC-DDDD-EEEE-FFFF-GGGG-HHHH       │           │
│  │                                                            │           │
│  │   # Ring buffer size for message passing                  │           │
│  │   ring_buffer: !!int 4096                                  │           │
│  │                                                            │           │
│  │   # HTTP status server endpoint                            │           │
│  │   # Use http://*:9999/ for external access                │           │
│  │   http_server_uri: http://127.0.0.1:9999/                 │           │
│  │                                                            │           │
│  │   # WebSocket status server endpoint                       │           │
│  │   # Use http://0.0.0.0:9998/ for external access          │           │
│  │   ws_server_uri: ws://127.0.0.1:9998/                     │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Source Connector Configuration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     Source Connector Configuration                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  COMMON PROPERTIES:                                                        │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ sources:                                                   │           │
│  │   - name: unique_name             # Required, unique ID    │           │
│  │     enabled: !!bool true          # Default: true          │           │
│  │     connector: ConnectorType      # Required               │           │
│  │     scan_interval: !!int 1000     # Default: 1000ms        │           │
│  │     rbe: !!bool true              # Report by exception    │           │
│  │     itemized_read: !!bool false   # For queuing sources    │           │
│  │     lang_script: Lua              # Lua or Python          │           │
│  │     paths_script:                 # Script library paths   │           │
│  │       - ./scripts                                          │           │
│  │     init_script: |               # Startup script          │           │
│  │       print('Initializing...')                             │           │
│  │     deinit_script: ~             # Shutdown script         │           │
│  │     enter_script: ~              # Loop entry script       │           │
│  │     exit_script: ~               # Loop exit script        │           │
│  │     item_script: ~               # Default item script     │           │
│  │     strip_path_prefix: !!bool false                       │           │
│  │     create_dummy_messages_on_startup: !!bool false        │           │
│  │     sink:                        # Sink metadata           │           │
│  │       transform:                                           │           │
│  │         type: script                                       │           │
│  │         template: Message.Data                             │           │
│  │     items:                       # List of data points     │           │
│  │       - ...                                                │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  POLLING vs QUEUING SOURCES:                                              │
│  • Polling: Timer-based (databases, PLCs) - uses scan_interval            │
│  • Queuing: Push-based (MQTT, queues) - uses itemized_read               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Sink Connector Configuration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Sink Connector Configuration                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  COMMON PROPERTIES:                                                        │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ sinks:                                                     │           │
│  │   - name: unique_name             # Required, unique ID    │           │
│  │     enabled: !!bool true          # Default: true          │           │
│  │     connector: ConnectorType      # Required               │           │
│  │     scan_interval: !!int 1000     # Processing frequency   │           │
│  │     exclude_filter:               # Regex patterns         │           │
│  │       - "source1/\\$SYSTEM"                                │           │
│  │       - ".*test.*"                                         │           │
│  │     include_filter:               # Takes precedence       │           │
│  │       - "source1/temperature"                              │           │
│  │     use_sink_transform: !!bool false                       │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  FILTER BEHAVIOR:                                                          │
│  • Filters use regex patterns                                             │
│  • Include filter overrides exclude filter                                │
│  • Path format: connectorName/itemName                                    │
│  • System paths: connectorName/$SYSTEM/property                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.5 Items Configuration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Items Configuration                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ITEM PROPERTIES:                                                          │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ items:                                                     │           │
│  │   - name: temperature           # Unique within connector  │           │
│  │     enabled: !!bool true        # Default: true            │           │
│  │     rbe: !!bool true            # Override connector RBE   │           │
│  │     every: !!int 1              # Process every N scans    │           │
│  │     address: "DB1.DBD0"         # Source-specific address  │           │
│  │     script: |                   # Item processing script   │           │
│  │       return result * 1.8 + 32  # Convert C to F          │           │
│  │     sink:                       # Sink metadata override   │           │
│  │       mtconnect: Device[name=cnc1]/Path/Temperature       │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  SCRIPT CONTEXT:                                                           │
│  • 'result' variable contains raw device value                            │
│  • 'this' refers to the item instance                                     │
│  • Return value becomes the processed data                                │
│  • Return nil to drop the item                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 4. CONNECTOR CATALOG

### 4.1 Industrial Protocol Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Industrial Protocol Connectors                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ETHERNET/IP (Allen-Bradley PLCs)                                         │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: ab_plc                                             │           │
│  │   connector: EthernetIP                                    │           │
│  │   type: ControlLogix      # or MicroLogix, CompactLogix   │           │
│  │   address: 192.168.1.100                                   │           │
│  │   path: "1,0"             # Backplane, Slot                │           │
│  │   timeout: !!int 1000                                      │           │
│  │   items:                                                   │           │
│  │     - name: conveyor_speed                                 │           │
│  │       type: float                                          │           │
│  │       address: "ConveyorSpeed"                             │           │
│  │     - name: part_count                                     │           │
│  │       type: int                                            │           │
│  │       address: "PartCounter.ACC"                           │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  SIEMENS S7 (S7-1200, S7-1500, etc.)                                     │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: siemens_plc                                        │           │
│  │   connector: SiemensS7                                     │           │
│  │   type: S71200            # S7200, S7300, S7400, S71500   │           │
│  │   address: 192.168.1.101                                   │           │
│  │   rack: !!int 0                                            │           │
│  │   slot: !!int 0                                            │           │
│  │   items:                                                   │           │
│  │     - name: motor_status                                   │           │
│  │       type: bool                                           │           │
│  │       address: "Q0.0"                                      │           │
│  │     - name: temperature                                    │           │
│  │       type: float                                          │           │
│  │       address: "DB1.DBD0"                                  │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  MODBUS TCP                                                                │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: modbus_device                                      │           │
│  │   connector: ModbusTCP                                     │           │
│  │   address: 192.168.1.102                                   │           │
│  │   port: !!int 502                                          │           │
│  │   slave: !!int 1                                           │           │
│  │   items:                                                   │           │
│  │     - name: holding_registers                              │           │
│  │       type: !!int 3       # 1=coil, 2=input, 3=holding    │           │
│  │       address: !!int 100                                   │           │
│  │       count: !!int 10                                      │           │
│  │       script: |                                            │           │
│  │         -- Convert two 16-bit registers to 32-bit float    │           │
│  │         struct = require('struct')                          │           │
│  │         return struct.unpack('<f',                          │           │
│  │           struct.pack('<HH', result[0], result[1]))        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  OPC-UA                                                                    │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: opcua_server                                       │           │
│  │   connector: OpcUA                                         │           │
│  │   address: localhost                                       │           │
│  │   port: !!int 49320                                        │           │
│  │   anonymous: !!bool false                                  │           │
│  │   username: user                                           │           │
│  │   password: password                                       │           │
│  │   mode: !!int 3           # 1=None, 2=Sign, 3=SignEncrypt │           │
│  │   policy: !!int 4         # 1=None, 2=Basic256, etc       │           │
│  │   items:                                                   │           │
│  │     - name: server_time                                    │           │
│  │       namespace: !!int 0                                   │           │
│  │       address: "i=2258"   # ServerStatus.CurrentTime       │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Robot Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Robot Connectors                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  FANUC ROBOT (R-30iA, R-30iB)                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: fanuc_robot                                        │           │
│  │   connector: FanucRobot                                    │           │
│  │   address: 192.168.1.200                                   │           │
│  │   items:                                                   │           │
│  │     - name: joint_position_1                               │           │
│  │       address: worldJointPosition.J1                       │           │
│  │     - name: cartesian_x                                    │           │
│  │       address: worldCartesianPosition.X                    │           │
│  │     - name: program_status                                 │           │
│  │       address: IntegerSystemVariables.1                    │           │
│  │     - name: digital_output                                 │           │
│  │       address: DO.1                                        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  YASKAWA ROBOT (DX200, YRC1000)                                          │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: yaskawa_robot                                      │           │
│  │   connector: Yaskawa                                       │           │
│  │   address: 192.168.1.201                                   │           │
│  │   items:                                                   │           │
│  │     - name: axis1_position                                 │           │
│  │       address: jointPositions.Axis1                        │           │
│  │     - name: axis1_torque                                   │           │
│  │       address: torque.Axis1                                │           │
│  │     - name: alarm_code                                     │           │
│  │       address: alarm.Code                                  │           │
│  │     - name: job_name                                       │           │
│  │       address: job.Name                                    │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Database Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Database Connectors                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  MICROSOFT SQL SERVER                                                      │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: mssql_source                                       │           │
│  │   connector: MSSQL                                         │           │
│  │   connection_string: |                                     │           │
│  │     Server=172.16.10.5;Database=Production;                │           │
│  │     User Id=reader;Password=password;                      │           │
│  │     Encrypt=True;TrustServerCertificate=True;             │           │
│  │   command_text: |                                          │           │
│  │     SELECT TOP 10 OrderNumber, Quantity, Status            │           │
│  │     FROM dbo.ProductionOrders                              │           │
│  │     WHERE Status = 'Active'                                │           │
│  │   items:                                                   │           │
│  │     - name: order_number                                   │           │
│  │       address: OrderNumber                                 │           │
│  │       script: return result[0]   # First row               │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  POSTGRESQL                                                                │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: postgres_source                                    │           │
│  │   connector: Postgres                                       │           │
│  │   connection_string: |                                     │           │
│  │     Host=172.16.10.43;Port=5432;                          │           │
│  │     Username=postgres;Password=postgres;                   │           │
│  │     Database=metrics;                                      │           │
│  │   command_text: |                                          │           │
│  │     SELECT machine_id, oee, timestamp                      │           │
│  │     FROM production_metrics                                │           │
│  │     ORDER BY timestamp DESC LIMIT 1                        │           │
│  │   items:                                                   │           │
│  │     - name: current_oee                                    │           │
│  │       address: oee                                         │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  MONGODB                                                                   │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: mongo_sink                                         │           │
│  │   connector: MongoDB                                        │           │
│  │   address: |                                                │           │
│  │     mongodb+srv://user:password@cluster0.mongodb.net/      │           │
│  │     ?retryWrites=true&w=majority                           │           │
│  │   database: DIME                                           │           │
│  │   collection: TimeSeries                                   │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Message Queue Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Message Queue Connectors                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  MQTT SOURCE                                                               │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: mqtt_subscriber                                    │           │
│  │   connector: MQTT                                          │           │
│  │   address: broker.hivemq.com                               │           │
│  │   port: !!int 1883                                         │           │
│  │   qos: !!int 1            # 0, 1, or 2                    │           │
│  │   clean_session: !!bool true                               │           │
│  │   username: user                                           │           │
│  │   password: pass                                           │           │
│  │   itemized_read: !!bool true                               │           │
│  │   items:                                                   │           │
│  │     - name: all_sensors                                    │           │
│  │       address: factory/+/sensor/#   # Wildcard topic       │           │
│  │       script: |                                            │           │
│  │         json = require('json')                             │           │
│  │         return json.decode(result).value                   │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  MQTT SINK                                                                 │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: mqtt_publisher                                     │           │
│  │   connector: MQTT                                          │           │
│  │   address: broker.hivemq.com                               │           │
│  │   port: !!int 1883                                         │           │
│  │   base_topic: dime/data                                   │           │
│  │   qos: !!int 1                                             │           │
│  │   retain: !!bool true                                      │           │
│  │   tls: !!bool true                                         │           │
│  │   client_cert_path: ./certs/client.pfx                    │           │
│  │   client_cert_password: certpass                           │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  SPARKPLUGB                                                                │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: sparkplugb_sink                                    │           │
│  │   connector: SparkplugB                                    │           │
│  │   address: localhost                                       │           │
│  │   port: !!int 1883                                         │           │
│  │   group_id: Factory1                                       │           │
│  │   node_id: Line1                                           │           │
│  │   device_id: PLC1                                          │           │
│  │   reconnect_interval: !!int 15000                          │           │
│  │   birth_delay: !!int 10000                                 │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  ACTIVEMQ                                                                  │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: activemq_source                                    │           │
│  │   connector: ActiveMQ                                      │           │
│  │   address: activemq:tcp://172.24.56.104:61616             │           │
│  │   username: admin                                          │           │
│  │   password: admin                                          │           │
│  │   items:                                                   │           │
│  │     - name: production_events                              │           │
│  │       address: topic://PRODUCTION.EVENTS                   │           │
│  │     - name: quality_data                                   │           │
│  │       address: queue://QUALITY.DATA                        │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Specialized Industrial Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Specialized Industrial Connectors                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  MTCONNECT AGENT SOURCE                                                    │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: mtconnect_source                                   │           │
│  │   connector: MTConnectAgent                                │           │
│  │   address: mtconnect.mazakcorp.com                         │           │
│  │   port: !!int 5719                                         │           │
│  │   device: HCN001                                           │           │
│  │   interval: !!int 100                                      │           │
│  │   items:                                                   │           │
│  │     - name: spindle_speed                                  │           │
│  │       address: spindle_speed   # DataItem ID               │           │
│  │       script: return result[0].Value                        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  MTCONNECT AGENT SINK (Embedded)                                          │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: mtconnect_agent                                    │           │
│  │   connector: MTConnectAgent                                │           │
│  │   port: !!int 5000                                         │           │
│  │   exclude_filter:                                          │           │
│  │     - ".*\\$SYSTEM.*"                                      │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  MTCONNECT SHDR SINK                                                      │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: shdr_adapter                                       │           │
│  │   connector: MTConnectSHDR                                 │           │
│  │   port: !!int 7878                                         │           │
│  │   device_key: ~                                            │           │
│  │   heartbeat_interval: !!int 10000                          │           │
│  │   filter_duplicates: !!bool true                           │           │
│  │   output_folder: ./Output/MTConnect                        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  HAAS CNC (Q-Commands via TCP)                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: haas_cnc                                           │           │
│  │   connector: TcpASCII                                      │           │
│  │   address: 192.168.111.216                                 │           │
│  │   port: !!int 5051                                         │           │
│  │   read_delay: !!int 500                                    │           │
│  │   init_script: |                                           │           │
│  │     stringx = require('pl.stringx')                        │           │
│  │     clean_response = function(response)                    │           │
│  │       response = stringx.replace(response, '>', '')        │           │
│  │       response = stringx.replace(response, '\r\n', '')     │           │
│  │       return response                                      │           │
│  │     end                                                    │           │
│  │   items:                                                   │           │
│  │     - name: spindle_load                                   │           │
│  │       address: "?Q300"   # Spindle load query              │           │
│  │       script: |                                            │           │
│  │         local clean = clean_response(result)               │           │
│  │         local parts = stringx.split(clean, ',')            │           │
│  │         return tonumber(parts[2])                          │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  ASC AUTOCLAVE                                                             │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: autoclave1                                         │           │
│  │   connector: AscCPC                                         │           │
│  │   address: 192.168.111.12                                   │           │
│  │   port: !!int 9999                                         │           │
│  │   bypass_ping: !!bool true                                  │           │
│  │   items:                                                   │           │
│  │     - name: temperature                                    │           │
│  │       address: .Autoclave.Inputs.AIRTC\Value               │           │
│  │       sink:                                                │           │
│  │         mtconnect: |                                       │           │
│  │           Device[Name=autoclave1]/Controller/Path/         │           │
│  │           Temperature[Category=Sample]                      │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.6 Additional Industrial & Utility Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  Additional Industrial & Utility Connectors                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  OPC-DA (Legacy Windows OPC)                                              │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: opcda_source                                       │           │
│  │   connector: OpcDA                                         │           │
│  │   address: Kepware.KEPServerEX.V6   # Server ProgID       │           │
│  │   items:                                                   │           │
│  │     - name: channel_tag                                    │           │
│  │       address: Channel1.Device1.Tag1                       │           │
│  │   # NOTE: Requires 32-bit DIME build                      │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  BECKHOFF ADS                                                             │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: beckhoff_plc                                       │           │
│  │   connector: BeckhoffADS                                   │           │
│  │   local_netid: 1.1.1.1.1.1                                │           │
│  │   target_ip: 192.168.111.191                               │           │
│  │   address: 192.168.111.191.1.1                            │           │
│  │   port: !!int 851                                          │           │
│  │   items:                                                   │           │
│  │     - name: bool_var                                       │           │
│  │       type: bool                                           │           │
│  │       address: MAIN.boolVariable                           │           │
│  │     - name: int_var                                        │           │
│  │       type: int                                            │           │
│  │       address: MAIN.intVariable                            │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  SNMP                                                                      │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: snmp_device                                        │           │
│  │   connector: SNMP                                          │           │
│  │   address: 192.168.150.143                                 │           │
│  │   port: !!int 161                                          │           │
│  │   community: public                                        │           │
│  │   timeout: !!int 1000                                      │           │
│  │   items:                                                   │           │
│  │     - name: system_uptime                                  │           │
│  │       address: 1.3.6.1.2.1.1.3.0   # sysUpTime            │           │
│  │     - name: interface_status                               │           │
│  │       address: 1.3.6.1.2.1.2.2.1.8.1                      │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  HAAS SHDR (Streaming Source)                                             │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: haas_shdr                                          │           │
│  │   connector: HaasSHDR                                      │           │
│  │   address: 192.168.111.221                                 │           │
│  │   port: !!int 9998         # Undocumented Haas port        │           │
│  │   itemized_read: !!bool true                               │           │
│  │   timeout: !!int 1000                                      │           │
│  │   heartbeat_interval: !!int 4000                           │           │
│  │   retry_interval: !!int 10000                              │           │
│  │   items:                                                   │           │
│  │     - name: spindle_load                                   │           │
│  │       address: Sload                                       │           │
│  │     - name: execution                                      │           │
│  │       address: Execution                                   │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  WINTRISS SMARTPAC                                                        │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: smartpac                                           │           │
│  │   connector: SmartPAC                                      │           │
│  │   address: 172.16.200.18                                   │           │
│  │   port: !!int 1007                                         │           │
│  │   items:                                                   │           │
│  │     - name: press_type                                     │           │
│  │       script: return result[0]                             │           │
│  │     - name: press_name                                     │           │
│  │       script: return result[1]                             │           │
│  │     - name: stroke_count                                   │           │
│  │       script: return result[2]                             │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.7 Data Processing & Analytics Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Data Processing & Analytics Connectors                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  INFLUXDB LP (Line Protocol)                                              │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: influx_sink                                        │           │
│  │   connector: InfluxLP                                      │           │
│  │   address: https://us-east-1-1.aws.cloud2.influxdata.com  │           │
│  │   token: YOUR_INFLUX_TOKEN                                 │           │
│  │   org_name: myorg                                          │           │
│  │   bucket_name: production_metrics                          │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  REDIS (Source & Sink)                                                    │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ # Redis Sink                                               │           │
│  │ - name: redis_sink                                         │           │
│  │   connector: Redis                                         │           │
│  │   address: 172.24.56.104                                   │           │
│  │   port: !!int 6379                                         │           │
│  │   database: !!int 0                                        │           │
│  │                                                            │           │
│  │ # Redis Source                                             │           │
│  │ - name: redis_source                                       │           │
│  │   connector: Redis                                         │           │
│  │   address: 172.24.56.104                                   │           │
│  │   port: !!int 6379                                         │           │
│  │   database: !!int 0                                        │           │
│  │   items:                                                   │           │
│  │     - name: cached_value                                   │           │
│  │       address: plc1/temperature                            │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  SPLUNK HEC (HTTP Event Collector)                                        │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: splunk_hec                                         │           │
│  │   connector: SplunkHEC                                     │           │
│  │   address: splunk.company.com                              │           │
│  │   port: !!int 8088                                         │           │
│  │   use_ssl: !!bool true                                     │           │
│  │   token: abc123-def456-ghi789                              │           │
│  │   event_or_metric: event   # or 'metric'                   │           │
│  │   source: dime_production                                  │           │
│  │   source_type: _json                                       │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  SPLUNK EDGE HUB SDK                                                      │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ # Version 1.0                                              │           │
│  │ - name: splunk_eh_v1                                       │           │
│  │   connector: SplunkEhSDK1                                  │           │
│  │   address: http://host.docker.internal                     │           │
│  │   port: !!int 50051                                        │           │
│  │   numbers_to_metrics: !!bool true                          │           │
│  │                                                            │           │
│  │ # Version 2.0                                              │           │
│  │ - name: splunk_eh_v2                                       │           │
│  │   connector: SplunkEhSDK2                                  │           │
│  │   address: http://host.docker.internal                     │           │
│  │   port: !!int 50051                                        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  TIMESCALE WEBSOCKET                                                      │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: timescale_ws                                       │           │
│  │   connector: TimebaseWS                                    │           │
│  │   address: localhost                                       │           │
│  │   port: !!int 4511                                         │           │
│  │   items:                                                   │           │
│  │     - name: plc_execution                                  │           │
│  │       group: MQTT Data                                     │           │
│  │       address: dime/plc1/Execution/Data                    │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  TRAKHHOUND HTTP                                                          │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: trakhound_sink                                     │           │
│  │   connector: TrakHoundHTTP                                  │           │
│  │   address: localhost                                       │           │
│  │   port: !!int 8472                                         │           │
│  │   use_ssl: !!bool false                                    │           │
│  │   router: default                                          │           │
│  │   base_path: Ladder99:/DIME/Production                     │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.8 Web & Network Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Web & Network Connectors                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  HTTP CLIENT (Sink)                                                       │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: http_client                                        │           │
│  │   connector: HttpClient                                    │           │
│  │   uri: https://api.company.com/data                        │           │
│  │   headers:                                                 │           │
│  │     Content-Type: application/json                         │           │
│  │     Authorization: Bearer ${API_TOKEN}                     │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  HTTP SERVER (Source)                                                     │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: http_server_source                                 │           │
│  │   connector: HTTPServer                                    │           │
│  │   uri: http://0.0.0.0:8081/    # Listen on all interfaces │           │
│  │   init_script: |                                           │           │
│  │     json = require('json')                                 │           │
│  │   items:                                                   │           │
│  │     - name: webhook_data                                   │           │
│  │       address: webhook/production   # POST to /webhook/production │      │
│  │       script: |                                            │           │
│  │         local data = json.decode(result)                   │           │
│  │         return data.value                                  │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  HTTP SERVER (Sink)                                                       │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: http_server_sink                                   │           │
│  │   connector: HttpServer                                    │           │
│  │   uri: http://0.0.0.0:8080/                                │           │
│  │   # Endpoints:                                             │           │
│  │   # GET /items - All items as dictionary                   │           │
│  │   # GET /list - All items as list                          │           │
│  │   # GET /items/* - Specific item by path                  │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  WEBSOCKET SERVER (Sink)                                                  │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: ws_server                                          │           │
│  │   connector: WebsocketServer                               │           │
│  │   uri: ws://0.0.0.0:8082/                                  │           │
│  │   # Streams all data to connected WebSocket clients        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  UDP SERVER (Source)                                                      │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: udp_server                                         │           │
│  │   connector: UDPServer                                     │           │
│  │   address: 0.0.0.0        # IP address, not hostname       │           │
│  │   port: !!int 2323                                         │           │
│  │   items:                                                   │           │
│  │     - name: message                                        │           │
│  │       address: message     # Raw UDP payload               │           │
│  │       script: |                                            │           │
│  │         -- result is byte array                            │           │
│  │         return string.char(unpack(result))                 │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  JSON WEB SCRAPER                                                         │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: json_scraper                                       │           │
│  │   connector: JsonWebScraper                                │           │
│  │   uri: https://api.example.com/data.json                   │           │
│  │   init_script: json = require('json')                      │           │
│  │   items:                                                   │           │
│  │     - name: temperature                                    │           │
│  │       address: $.sensors.temperature  # JSONPath query     │           │
│  │       script: return tonumber(result)                      │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  XML WEB SCRAPER                                                          │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: xml_scraper                                        │           │
│  │   connector: XMLWebScraper                                 │           │
│  │   uri: http://192.168.111.216:8082/current                 │           │
│  │   namespaces:                                              │           │
│  │     mt: urn:mtconnect.org:MTConnectStreams:1.2            │           │
│  │   item_script: |                                           │           │
│  │     return result.InnerText                                │           │
│  │   items:                                                   │           │
│  │     - name: spindle_load                                   │           │
│  │       address: //mt:DataItem[@dataItemId='Sload']         │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  NWS WEATHER SERVICE                                                      │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: weather                                            │           │
│  │   connector: NwsWeather                                    │           │
│  │   address: https://api.weather.gov                         │           │
│  │   agent: "(DimeWeather, contact@company.com)"             │           │
│  │   items:                                                   │           │
│  │     - name: chicago_weather                                │           │
│  │       address: "41.8781,-87.6298"  # Latitude,Longitude    │           │
│  │       forecast: daily      # or 'hourly'                   │           │
│  │       script: |                                            │           │
│  │         return result.properties.periods[0].temperature    │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.9 Utility & Output Connectors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Utility & Output Connectors                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  CONSOLE (Sink)                                                           │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: console_output                                     │           │
│  │   connector: Console                                       │           │
│  │   # Writes all messages to stdout                          │           │
│  │   exclude_filter:                                          │           │
│  │     - ".*\\$SYSTEM.*"     # Exclude system messages        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  LOGGER (Sink)                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: logger_sink                                        │           │
│  │   connector: Logger                                        │           │
│  │   # Writes to NLog configured loggers                      │           │
│  │   # Respects nlog.config settings                          │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  CSV WRITER (Sink)                                                        │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: csv_writer                                         │           │
│  │   connector: CSVWriter                                     │           │
│  │   filename: ./Output/production_data.csv                   │           │
│  │   filter_duplicate_paths: !!bool false                     │           │
│  │   # Columns: Timestamp, Path, Value                        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  SCRIPT (Source)                                                          │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ - name: script_generator                                   │           │
│  │   connector: Script                                        │           │
│  │   scan_interval: !!int 1000                                │           │
│  │   init_script: |                                           │           │
│  │     -- Initialize any variables                            │           │
│  │     counter = 0                                            │           │
│  │   items:                                                   │           │
│  │     - name: random_value                                   │           │
│  │       script: |                                            │           │
│  │         return math.random() * 100                         │           │
│  │     - name: sine_wave                                      │           │
│  │       script: |                                            │           │
│  │         counter = counter + 0.1                            │           │
│  │         return math.sin(counter) * 50 + 50                 │           │
│  │     - name: availability                                   │           │
│  │       script: |                                            │           │
│  │         local plc_connected = cache('plc1/$SYSTEM/IsConnected', false) │
│  │         return plc_connected and 'AVAILABLE' or 'UNAVAILABLE'          │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 5. SCRIPTING & TRANSFORMATIONS

### 5.1 Lua Scripting Basics

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Lua Scripting in DIME                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  SCRIPT EXECUTION CONTEXTS:                                                │
│                                                                            │
│  ┌──────────────┐                                                         │
│  │ init_script  │ → Runs once at connector startup                        │
│  └──────┬───────┘   • Import libraries                                    │
│         │           • Define functions                                     │
│         │           • Initialize variables                                 │
│         ▼                                                                  │
│  ┌──────────────┐                                                         │
│  │ enter_script │ → Runs before each scan cycle                           │
│  └──────┬───────┘   • Prepare for processing                              │
│         │           • 'this' = connector instance                          │
│         ▼                                                                  │
│  ┌──────────────┐                                                         │
│  │ item_script  │ → Runs for each item                                    │
│  │   OR item's  │   • 'result' = device value                             │
│  │    script    │   • 'this' = item instance                              │
│  └──────┬───────┘   • Return processed value                              │
│         │                                                                  │
│         ▼                                                                  │
│  ┌──────────────┐                                                         │
│  │ exit_script  │ → Runs after each scan cycle                            │
│  └──────┬───────┘   • Cleanup operations                                  │
│         │                                                                  │
│         ▼                                                                  │
│  ┌──────────────┐                                                         │
│  │deinit_script │ → Runs once at shutdown                                 │
│  └──────────────┘   • Release resources                                   │
│                                                                            │
│  INCLUDED LUA LIBRARIES:                                                   │
│  • json.lua - JSON encoding/decoding                                      │
│  • struct.lua - Binary data packing/unpacking                             │
│  • moses.lua - Functional programming utilities                           │
│  • penlight - Comprehensive utility library                               │
│  • Full .NET framework via NLua                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Script Functions Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Available Script Functions                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  CACHE FUNCTIONS:                                                          │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ -- Get cached value                                        │           │
│  │ value = cache(path, defaultValue)                          │           │
│  │ -- Examples:                                               │           │
│  │ temp = cache('plc1/temperature', 0)                        │           │
│  │ temp = cache('./temperature', 0)    -- Current connector   │           │
│  │ temp = cache('temperature', 0)      -- Shorthand          │           │
│  │                                                            │           │
│  │ -- Get value with timestamp                                │           │
│  │ value, timestamp = cache_ts(path, defaultValue)           │           │
│  │                                                            │           │
│  │ -- Set user cache value                                    │           │
│  │ set('myKey', 123.45)                                       │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  MESSAGE EMISSION:                                                         │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ -- Emit new message                                        │           │
│  │ emit('./alarm', 'HIGH_TEMP')                               │           │
│  │                                                            │           │
│  │ -- Emit with MTConnect metadata                            │           │
│  │ emit_mtconnect('./spindle_speed', 1500,                    │           │
│  │   'Device[name=cnc1]/Axes/Spindle/Speed[category=Sample]')│           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  UTILITY FUNCTIONS:                                                        │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ -- Environment variables                                   │           │
│  │ dbHost = env('DB_HOST', 'localhost')                       │           │
│  │                                                            │           │
│  │ -- JSON operations                                         │           │
│  │ obj = from_string('{"temp": 25.5}')                        │           │
│  │ str = to_string({temp = 25.5})                             │           │
│  │                                                            │           │
│  │ -- Get connector/config instances                          │           │
│  │ conn = connector()                                          │           │
│  │ config = configuration()                                    │           │
│  │                                                            │           │
│  │ -- Convert Lua table to .NET array                         │           │
│  │ arr = array_from_table({1, 2, 3})                          │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Common Script Patterns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Common Scripting Patterns                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  UNIT CONVERSION:                                                          │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ items:                                                     │           │
│  │   - name: temperature_f                                    │           │
│  │     address: DB1.DBD0                                      │           │
│  │     script: |                                              │           │
│  │       -- Convert Celsius to Fahrenheit                     │           │
│  │       return result * 1.8 + 32                             │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  BINARY DATA UNPACKING:                                                    │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ init_script: |                                             │           │
│  │   struct = require('struct')                               │           │
│  │                                                            │           │
│  │ items:                                                     │           │
│  │   - name: float_value                                      │           │
│  │     type: !!int 3          # Holding registers             │           │
│  │     address: !!int 100                                     │           │
│  │     count: !!int 2         # Read 2 registers              │           │
│  │     script: |                                              │           │
│  │       -- Convert two 16-bit values to 32-bit float         │           │
│  │       return struct.unpack('<f',                           │           │
│  │         struct.pack('<HH', result[0], result[1]))          │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  CONDITIONAL PROCESSING:                                                   │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ items:                                                     │           │
│  │   - name: machine_status                                   │           │
│  │     script: |                                              │           │
│  │       if result == 1 then                                  │           │
│  │         return 'RUNNING'                                   │           │
│  │       elseif result == 2 then                              │           │
│  │         return 'IDLE'                                      │           │
│  │       elseif result == 3 then                              │           │
│  │         return 'FAULT'                                     │           │
│  │       else                                                 │           │
│  │         return 'UNKNOWN'                                   │           │
│  │       end                                                  │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  MULTIPLE EMISSIONS FROM SINGLE READ:                                     │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ items:                                                     │           │
│  │   - name: combined_status                                  │           │
│  │     address: "?Q500"                                       │           │
│  │     script: |                                              │           │
│  │       -- Parse comma-separated response                    │           │
│  │       local parts = stringx.split(result, ',')             │           │
│  │       emit('./program', parts[1])                          │           │
│  │       emit('./line', tonumber(parts[2]))                  │           │
│  │       emit('./status', parts[3])                           │           │
│  │       return nil  -- Don't emit this item itself           │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  CROSS-CONNECTOR CALCULATIONS:                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ items:                                                     │           │
│  │   - name: efficiency                                       │           │
│  │     script: |                                              │           │
│  │       local actual = cache('plc1/actual_count', 0)         │           │
│  │       local target = cache('plc1/target_count', 1)         │           │
│  │       if target > 0 then                                   │           │
│  │         return (actual / target) * 100                     │           │
│  │       else                                                 │           │
│  │         return 0                                           │           │
│  │       end                                                  │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 6. ADVANCED FEATURES

### 6.1 HTM Neuromorphic Engine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Hierarchical Temporal Memory (HTM)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  WHAT IS HTM?                                                              │
│  • Brain-inspired computing model                                          │
│  • Continuous learning without retraining                                  │
│  • Temporal pattern recognition                                            │
│  • Sparse distributed representations                                      │
│                                                                            │
│  KEY CAPABILITIES:                                                         │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ ANOMALY DETECTION                                          │           │
│  │ • Learns normal patterns automatically                     │           │
│  │ • No labeled training data required                        │           │
│  │ • Adapts to changing conditions                            │           │
│  │ • 95% reduction in false alarms                            │           │
│  │                                                            │           │
│  │ PREDICTIVE ANALYTICS                                       │           │
│  │ • Forecasts future values                                  │           │
│  │ • Identifies temporal sequences                             │           │
│  │ • Multi-step predictions                                   │           │
│  │ • Confidence scoring                                        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  HTM CONFIGURATION:                                                        │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ sources:                                                   │           │
│  │   - name: machine_monitor                                  │           │
│  │     connector: OpcUA                                       │           │
│  │     # ... connection details ...                           │           │
│  │     htm:                                                   │           │
│  │       enabled: !!bool true                                 │           │
│  │       learning_period: !!int 1000  # Samples               │           │
│  │       anomaly_threshold: !!float 0.95                      │           │
│  │     items:                                                 │           │
│  │       - name: spindle_vibration                            │           │
│  │         address: "ns=2;s=SpindleVibration"                 │           │
│  │         htm_enabled: !!bool true                           │           │
│  │         script: |                                          │           │
│  │           -- result contains raw value                     │           │
│  │           -- htm_anomaly contains anomaly score (0-1)      │           │
│  │           if htm_anomaly > 0.8 then                        │           │
│  │             emit('./vibration_alert', 'HIGH_ANOMALY')     │           │
│  │           end                                              │           │
│  │           return result                                    │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 AI Configuration Generation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      AI Configuration Generation                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  NATURAL LANGUAGE TO CONFIGURATION:                                        │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ USER PROMPT:                                               │           │
│  │ "I need to collect temperature and pressure from a         │           │
│  │  Siemens S7-1200 PLC at 192.168.1.100, convert to         │           │
│  │  Fahrenheit, and send to MQTT broker at mqtt.company.com" │           │
│  └───────────────────────────────────────────────────────────┘           │
│                          ▼                                                 │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ AI GENERATED CONFIGURATION:                                │           │
│  │                                                            │           │
│  │ sources:                                                   │           │
│  │   - name: siemens_plc                                      │           │
│  │     connector: SiemensS7                                   │           │
│  │     type: S71200                                           │           │
│  │     address: 192.168.1.100                                 │           │
│  │     rack: !!int 0                                          │           │
│  │     slot: !!int 0                                          │           │
│  │     scan_interval: !!int 1000                              │           │
│  │     items:                                                 │           │
│  │       - name: temperature                                  │           │
│  │         type: float                                        │           │
│  │         address: "DB1.DBD0"                                │           │
│  │         script: |                                          │           │
│  │           -- Convert Celsius to Fahrenheit                 │           │
│  │           return result * 1.8 + 32                         │           │
│  │       - name: pressure                                     │           │
│  │         type: float                                        │           │
│  │         address: "DB1.DBD4"                                │           │
│  │                                                            │           │
│  │ sinks:                                                     │           │
│  │   - name: mqtt_broker                                      │           │
│  │     connector: MQTT                                        │           │
│  │     address: mqtt.company.com                              │           │
│  │     port: !!int 1883                                      │           │
│  │     base_topic: plc/data                                  │           │
│  │     qos: !!int 1                                          │           │
│  │     retain: !!bool true                                   │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  AI CAPABILITIES:                                                          │
│  • Understands industrial protocols and devices                            │
│  • Applies best practices automatically                                    │
│  • Generates complete, working configurations                              │
│  • Includes appropriate data transformations                               │
│  • Adds error handling and validation                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Digital Twin Builder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Digital Twin Builder                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  AI-POWERED SIMULATION GENERATION:                                         │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ USER REQUEST:                                              │           │
│  │ "Create a digital twin of a CNC machine with spindle      │           │
│  │  speed, feed rate, tool wear, and part count"             │           │
│  └───────────────────────────────────────────────────────────┘           │
│                          ▼                                                 │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ GENERATED DIGITAL TWIN:                                    │           │
│  │                                                            │           │
│  │ sources:                                                   │           │
│  │   - name: cnc_digital_twin                                 │           │
│  │     connector: Script                                      │           │
│  │     scan_interval: !!int 100                               │           │
│  │     init_script: |                                         │           │
│  │       -- Initialize state variables                        │           │
│  │       spindle_base = 1000                                  │           │
│  │       feed_base = 100                                      │           │
│  │       tool_wear = 0                                        │           │
│  │       part_count = 0                                       │           │
│  │       cycle_time = 0                                       │           │
│  │       math.randomseed(os.time())                           │           │
│  │                                                            │           │
│  │     enter_script: |                                        │           │
│  │       -- Simulate machine cycle                            │           │
│  │       cycle_time = cycle_time + 0.1                        │           │
│  │       if cycle_time > 45 then                             │           │
│  │         -- Part complete                                   │           │
│  │         part_count = part_count + 1                        │           │
│  │         tool_wear = tool_wear + math.random() * 0.02      │           │
│  │         cycle_time = 0                                     │           │
│  │       end                                                  │           │
│  │                                                            │           │
│  │     items:                                                 │           │
│  │       - name: spindle_speed                                │           │
│  │         script: |                                          │           │
│  │           -- Realistic spindle variations                  │           │
│  │           local variation = math.sin(cycle_time/10) * 50  │           │
│  │           local noise = (math.random() - 0.5) * 20        │           │
│  │           return spindle_base + variation + noise          │           │
│  │                                                            │           │
│  │       - name: feed_rate                                    │           │
│  │         script: |                                          │           │
│  │           -- Feed rate with tool wear compensation         │           │
│  │           local compensation = tool_wear * 10              │           │
│  │           return feed_base - compensation                  │           │
│  │                                                            │           │
│  │       - name: tool_wear_percentage                         │           │
│  │         script: |                                          │           │
│  │           return math.min(tool_wear * 100, 100)            │           │
│  │                                                            │           │
│  │       - name: part_count                                   │           │
│  │         script: return part_count                          │           │
│  │                                                            │           │
│  │       - name: execution                                    │           │
│  │         script: |                                          │           │
│  │           if cycle_time > 0 then                           │           │
│  │             return 'ACTIVE'                                │           │
│  │           else                                             │           │
│  │             return 'READY'                                 │           │
│  │           end                                              │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 7. MONITORING & MANAGEMENT

### 7.1 Status Server

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Status Server API                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  HTTP ENDPOINTS (Default: http://localhost:9999)                          │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ GET /status                                                │           │
│  │ Returns overall system status and connector metrics        │           │
│  │                                                            │           │
│  │ Response:                                                  │           │
│  │ {                                                          │           │
│  │   "uptime": "00:45:23",                                   │           │
│  │   "connectors": [                                         │           │
│  │     {                                                      │           │
│  │       "name": "plc1",                                     │           │
│  │       "type": "SiemensS7",                                │           │
│  │       "status": "Connected",                              │           │
│  │       "messages_processed": 125431,                       │           │
│  │       "last_execution": "2024-01-15T10:23:45",           │           │
│  │       "execution_time_ms": 12.3,                          │           │
│  │       "faults": 0                                         │           │
│  │     }                                                      │           │
│  │   ]                                                        │           │
│  │ }                                                          │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ GET /config/yaml                                           │           │
│  │ Returns current running configuration                      │           │
│  │                                                            │           │
│  │ POST /config/yaml                                          │           │
│  │ Upload new configuration (requires restart)                │           │
│  │ Content-Type: text/yaml                                    │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ GET /service/restart                                       │           │
│  │ Restart DIME service                                       │           │
│  │                                                            │           │
│  │ GET /collectors/stop/{name}                                │           │
│  │ Stop specific connector                                    │           │
│  │                                                            │           │
│  │ GET /collectors/start/{name}                               │           │
│  │ Start specific connector                                   │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  WEBSOCKET ENDPOINT (Default: ws://localhost:9998)                        │
│  • Real-time streaming of connector metrics                               │
│  • Message flow visualization                                              │
│  • Performance data updates                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Logging Configuration

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Logging Configuration                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  NLOG.CONFIG STRUCTURE:                                                    │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ <?xml version="1.0" encoding="utf-8" ?>                    │           │
│  │ <nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"│           │
│  │       autoReload="true">                                   │           │
│  │                                                            │           │
│  │   <targets>                                                │           │
│  │     <target name="file" xsi:type="File"                   │           │
│  │             fileName="${basedir}/Logs/${shortdate}.log"   │           │
│  │             layout="${threadid}|${longdate}|${level}|     │           │
│  │                     ${message}|${logger}" />              │           │
│  │   </targets>                                               │           │
│  │                                                            │           │
│  │   <rules>                                                  │           │
│  │     <!-- Specific logger rules -->                         │           │
│  │     <logger name="DIME.*" minlevel="Info" writeTo="file"/>│           │
│  │     <logger name="Connector.*" minlevel="Debug"           │           │
│  │              writeTo="file"/>                              │           │
│  │                                                            │           │
│  │     <!-- Catch-all rule -->                               │           │
│  │     <logger name="*" minlevel="Warning" writeTo="file" /> │           │
│  │   </rules>                                                 │           │
│  │ </nlog>                                                    │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  LOG LEVELS:                                                               │
│  • TRACE - Most detailed, includes data values                            │
│  • DEBUG - Detailed flow information                                      │
│  • INFO  - General operational messages                                   │
│  • WARN  - Warning conditions                                             │
│  • ERROR - Error conditions                                               │
│  • FATAL - Critical failures                                              │
│                                                                            │
│  LOG FORMAT:                                                               │
│  [ThreadID]|[Timestamp]|[Level]|[Message]|[Logger]                        │
│  Example:                                                                  │
│  12|2024-01-15 10:23:45.123|INFO|Connector started|DIME.Connector.plc1    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 8. DEPLOYMENT & OPERATIONS

### 8.1 Production Deployment Checklist

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Production Deployment Checklist                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  INFRASTRUCTURE:                                                           │
│  □ Hardware meets minimum requirements (4+ cores, 8GB+ RAM)               │
│  □ Network connectivity to all data sources verified                      │
│  □ Firewall rules configured for required ports                           │
│  □ Storage capacity planned for logs and data                             │
│                                                                            │
│  SECURITY:                                                                 │
│  □ Valid license key installed                                            │
│  □ Service account created with minimal privileges                        │
│  □ TLS/SSL certificates installed for secure connections                  │
│  □ Credentials stored securely (environment variables/vault)              │
│  □ Status server restricted to authorized networks                        │
│                                                                            │
│  CONFIGURATION:                                                            │
│  □ Configuration files validated with test environment                    │
│  □ Logging levels set appropriately (INFO for production)                 │
│  □ Ring buffer sized for expected message volume                          │
│  □ Scan intervals optimized for data freshness vs load                    │
│  □ RBE enabled where appropriate to reduce data volume                    │
│                                                                            │
│  MONITORING:                                                               │
│  □ Log rotation configured                                                │
│  □ Monitoring tools connected to status endpoints                         │
│  □ Alerts configured for connector failures                               │
│  □ Performance baselines established                                      │
│                                                                            │
│  HIGH AVAILABILITY:                                                        │
│  □ Backup configuration stored in version control                         │
│  □ Disaster recovery plan documented                                      │
│  □ Failover procedures tested                                             │
│  □ Data retention policies implemented                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Troubleshooting Guide

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Troubleshooting Guide                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  CONNECTOR NOT CONNECTING:                                                 │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ SYMPTOMS:                                                  │           │
│  │ • Status shows "Disconnected"                              │           │
│  │ • Fault count increasing                                   │           │
│  │                                                            │           │
│  │ DIAGNOSTICS:                                               │           │
│  │ 1. Check logs for connection errors                        │           │
│  │ 2. Verify network connectivity: ping <device_ip>           │           │
│  │ 3. Check firewall rules                                    │           │
│  │ 4. Verify credentials and permissions                      │           │
│  │ 5. Test with external tool (OPC client, etc.)              │           │
│  │                                                            │           │
│  │ SOLUTIONS:                                                  │           │
│  │ • Set bypass_ping: true for devices that don't respond     │           │
│  │ • Increase timeout values                                  │           │
│  │ • Check device-specific requirements (rack/slot, etc.)     │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  HIGH CPU USAGE:                                                           │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ SYMPTOMS:                                                  │           │
│  │ • CPU consistently above 80%                               │           │
│  │ • Execution overrun warnings in logs                       │           │
│  │                                                            │           │
│  │ DIAGNOSTICS:                                               │           │
│  │ 1. Check connector execution times in /status              │           │
│  │ 2. Review scan_interval settings                           │           │
│  │ 3. Monitor script execution times                          │           │
│  │                                                            │           │
│  │ SOLUTIONS:                                                  │           │
│  │ • Increase scan_interval for non-critical data             │           │
│  │ • Enable RBE to reduce processing                          │           │
│  │ • Optimize scripts (cache calculations, etc.)              │           │
│  │ • Use 'every' property to reduce item frequency            │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  DATA NOT APPEARING IN SINK:                                              │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ SYMPTOMS:                                                  │           │
│  │ • Source shows data but sink doesn't receive               │           │
│  │                                                            │           │
│  │ DIAGNOSTICS:                                               │           │
│  │ 1. Check exclude_filter patterns                           │           │
│  │ 2. Verify include_filter if used                           │           │
│  │ 3. Monitor message paths in logs                           │           │
│  │ 4. Test filters with regex tool                            │           │
│  │                                                            │           │
│  │ SOLUTIONS:                                                  │           │
│  │ • Remove or adjust filters                                 │           │
│  │ • Check for typos in path patterns                         │           │
│  │ • Enable TRACE logging temporarily                         │           │
│  │ • Verify sink connector is enabled                         │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9. INDUSTRY SOLUTIONS

### 9.1 Automotive Manufacturing Solution

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Automotive Manufacturing Solution                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  COMPLETE ASSEMBLY LINE MONITORING:                                        │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ # automotive_assembly_line.yaml                            │           │
│  │                                                            │           │
│  │ sources:                                                   │           │
│  │   # PLC for conveyor system                                │           │
│  │   - name: conveyor_plc                                     │           │
│  │     connector: EthernetIP                                  │           │
│  │     type: ControlLogix                                     │           │
│  │     address: 10.10.1.100                                   │           │
│  │     items:                                                 │           │
│  │       - name: line_speed                                   │           │
│  │         address: ConveyorSpeed                             │           │
│  │         sink:                                              │           │
│  │           mtconnect: |                                     │           │
│  │             Device[name=Assembly1]/Components/             │           │
│  │             Controller/Path/FeedRate[category=Sample]      │           │
│  │                                                            │           │
│  │   # Robot controllers                                      │           │
│  │   - name: weld_robot_1                                     │           │
│  │     connector: FanucRobot                                  │           │
│  │     address: 10.10.2.101                                   │           │
│  │     items:                                                 │           │
│  │       - name: robot_program                                │           │
│  │         address: StringRegisters.1                         │           │
│  │       - name: cycle_count                                  │           │
│  │         address: NumericRegisters.1                        │           │
│  │                                                            │           │
│  │   # Quality inspection                                     │           │
│  │   - name: vision_system                                    │           │
│  │     connector: OpcUA                                       │           │
│  │     address: 10.10.3.100                                   │           │
│  │     items:                                                 │           │
│  │       - name: defect_count                                 │           │
│  │         namespace: !!int 2                                 │           │
│  │         address: QualityMetrics.DefectCount                │           │
│  │       - name: last_defect_type                             │           │
│  │         namespace: !!int 2                                 │           │
│  │         address: QualityMetrics.LastDefectType             │           │
│  │                                                            │           │
│  │   # Andon system integration                               │           │
│  │   - name: andon_monitor                                    │           │
│  │     connector: Script                                      │           │
│  │     scan_interval: !!int 500                               │           │
│  │     items:                                                 │           │
│  │       - name: station_status                               │           │
│  │         script: |                                          │           │
│  │           local speed = cache('conveyor_plc/line_speed', 0)│           │
│  │           local defects = cache('vision_system/defect_count', 0)│           │
│  │           if speed == 0 then                              │           │
│  │             emit('./andon_light', 'RED')                  │           │
│  │             return 'STOPPED'                              │           │
│  │           elseif defects > 5 then                         │           │
│  │             emit('./andon_light', 'YELLOW')               │           │
│  │             return 'QUALITY_ISSUE'                        │           │
│  │           else                                             │           │
│  │             emit('./andon_light', 'GREEN')                │           │
│  │             return 'NORMAL'                               │           │
│  │           end                                              │           │
│  │                                                            │           │
│  │ sinks:                                                     │           │
│  │   # MES integration                                        │           │
│  │   - name: mes_database                                     │           │
│  │     connector: MSSQL                                       │           │
│  │     connection_string: |                                   │           │
│  │       Server=mes.company.com;Database=Production;          │           │
│  │       Integrated Security=true;                            │           │
│  │                                                            │           │
│  │   # Real-time dashboards                                   │           │
│  │   - name: influx_metrics                                   │           │
│  │     connector: InfluxLP                                    │           │
│  │     address: https://metrics.company.com                   │           │
│  │     bucket_name: automotive_production                     │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  KEY METRICS TRACKED:                                                      │
│  • First Pass Yield: 98.5% → 99.8%                                       │
│  • Cycle Time: 45 sec → 42 sec                                           │
│  • OEE: 65% → 85%                                                         │
│  • Downtime: 47% reduction                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Pharmaceutical Manufacturing Solution

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   Pharmaceutical Manufacturing Solution                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  21 CFR PART 11 COMPLIANT DATA COLLECTION:                                │
│                                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ # pharma_batch_production.yaml                             │           │
│  │                                                            │           │
│  │ sources:                                                   │           │
│  │   # Batch reactor monitoring                               │           │
│  │   - name: reactor_1                                        │           │
│  │     connector: OpcUA                                       │           │
│  │     address: 10.20.1.100                                   │           │
│  │     username: batch_reader                                 │           │
│  │     password: ${REACTOR_PASSWORD}                          │           │
│  │     mode: !!int 3          # SignAndEncrypt                │           │
│  │     policy: !!int 4        # Basic256Sha256                │           │
│  │     audit_trail: !!bool true                               │           │
│  │     items:                                                 │           │
│  │       - name: batch_id                                     │           │
│  │         address: BatchControl.CurrentBatch.ID              │           │
│  │         electronic_signature: !!bool true                  │           │
│  │       - name: temperature                                  │           │
│  │         address: ProcessValues.Temperature                 │           │
│  │         critical_parameter: !!bool true                    │           │
│  │         limits:                                            │           │
│  │           low: 20.0                                        │           │
│  │           high: 25.0                                       │           │
│  │         script: |                                          │           │
│  │           if result < 20.0 or result > 25.0 then          │           │
│  │             emit('./temperature_deviation', {              │           │
│  │               batch = cache('./batch_id'),                 │           │
│  │               value = result,                              │           │
│  │               timestamp = os.date()                        │           │
│  │             })                                             │           │
│  │           end                                              │           │
│  │           return result                                    │           │
│  │                                                            │           │
│  │   # Environmental monitoring                               │           │
│  │   - name: cleanroom_sensors                                │           │
│  │     connector: ModbusTCP                                   │           │
│  │     address: 10.20.2.100                                   │           │
│  │     items:                                                 │           │
│  │       - name: particle_count                               │           │
│  │         type: !!int 3                                      │           │
│  │         address: !!int 1000                                │           │
│  │         grade: A          # ISO 14644-1                    │           │
│  │       - name: differential_pressure                        │           │
│  │         type: !!int 3                                      │           │
│  │         address: !!int 1002                                │           │
│  │                                                            │           │
│  │   # Batch record generation                                │           │
│  │   - name: batch_recorder                                   │           │
│  │     connector: Script                                      │           │
│  │     scan_interval: !!int 60000  # Every minute             │           │
│  │     items:                                                 │           │
│  │       - name: batch_summary                                │           │
│  │         script: |                                          │           │
│  │           local batch = {                                  │           │
│  │             id = cache('reactor_1/batch_id'),              │           │
│  │             temperature = cache('reactor_1/temperature'),  │           │
│  │             pressure = cache('reactor_1/pressure'),        │           │
│  │             particle_count = cache('cleanroom_sensors/particle_count'),│           │
│  │             timestamp = os.date(),                         │           │
│  │             operator = env('OPERATOR_ID'),                 │           │
│  │             signature = env('OPERATOR_SIGNATURE')          │           │
│  │           }                                                │           │
│  │           return to_string(batch)                          │           │
│  │                                                            │           │
│  │ sinks:                                                     │           │
│  │   # Validated database                                     │           │
│  │   - name: batch_database                                   │           │
│  │     connector: Postgres                                    │           │
│  │     connection_string: |                                   │           │
│  │       Host=batch-db.pharma.com;Port=5432;                 │           │
│  │       Database=production;SSL Mode=Require;                │           │
│  │       Username=batch_writer;Password=${DB_PASSWORD};       │           │
│  │     audit_log: !!bool true                                 │           │
│  │     data_integrity: SHA256                                 │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  COMPLIANCE FEATURES:                                                      │
│  • Electronic signatures and records                                      │
│  • Audit trail with user/timestamp/action                                 │
│  • Data integrity checks (checksums)                                      │
│  • Automatic deviation reporting                                          │
│  • Batch genealogy tracking                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 10. API & INTEGRATION

### 10.1 REST API Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          REST API Reference                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  BASE URL: http://localhost:9999                                          │
│                                                                            │
│  SYSTEM ENDPOINTS:                                                         │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ GET    /status                 # System status             │           │
│  │ GET    /health                 # Health check              │           │
│  │ GET    /metrics                # Prometheus metrics        │           │
│  │ GET    /service/info           # Service information       │           │
│  │ GET    /service/restart        # Restart service          │           │
│  │ POST   /service/shutdown       # Graceful shutdown         │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  CONFIGURATION ENDPOINTS:                                                  │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ GET    /config/yaml            # Get current config        │           │
│  │ POST   /config/yaml            # Update configuration      │           │
│  │ GET    /config/validate        # Validate config syntax    │           │
│  │ GET    /config/backup          # Download config backup    │           │
│  │ POST   /config/restore         # Restore from backup       │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  CONNECTOR ENDPOINTS:                                                      │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ GET    /collectors             # List all connectors       │           │
│  │ GET    /collectors/{name}      # Get connector details     │           │
│  │ POST   /collectors/{name}/start    # Start connector       │           │
│  │ POST   /collectors/{name}/stop     # Stop connector        │           │
│  │ POST   /collectors/{name}/restart  # Restart connector     │           │
│  │ GET    /collectors/{name}/metrics  # Connector metrics     │           │
│  │ GET    /collectors/{name}/faults   # Fault history         │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  DATA ENDPOINTS:                                                           │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ GET    /data/cache             # Get all cached values     │           │
│  │ GET    /data/cache/{path}      # Get specific value        │           │
│  │ POST   /data/emit              # Emit custom message       │           │
│  │ GET    /data/history/{path}    # Get historical values     │           │
│  │                                (if history enabled)        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  EXAMPLE: Get connector status                                             │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ curl http://localhost:9999/collectors/plc1                 │           │
│  │                                                            │           │
│  │ Response:                                                  │           │
│  │ {                                                          │           │
│  │   "name": "plc1",                                          │           │
│  │   "type": "SiemensS7",                                     │           │
│  │   "enabled": true,                                         │           │
│  │   "status": "Connected",                                   │           │
│  │   "connection": {                                          │           │
│  │     "address": "192.168.1.100",                           │           │
│  │     "connected_since": "2024-01-15T08:00:00Z"             │           │
│  │   },                                                       │           │
│  │   "statistics": {                                          │           │
│  │     "messages_sent": 1234567,                             │           │
│  │     "execution_time_avg": 12.5,                           │           │
│  │     "execution_time_max": 145.2,                          │           │
│  │     "faults": 0,                                          │           │
│  │     "uptime": "12:34:56"                                  │           │
│  │   },                                                       │           │
│  │   "items": [                                              │           │
│  │     {                                                      │           │
│  │       "name": "temperature",                              │           │
│  │       "value": 23.5,                                      │           │
│  │       "timestamp": "2024-01-15T10:23:45Z",                │           │
│  │       "quality": "Good"                                   │           │
│  │     }                                                      │           │
│  │   ]                                                        │           │
│  │ }                                                          │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 10.2 WebSocket Interface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         WebSocket Interface                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ENDPOINT: ws://localhost:9998                                            │
│                                                                            │
│  MESSAGE TYPES:                                                            │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ // Subscribe to all updates                                │           │
│  │ {                                                          │           │
│  │   "action": "subscribe",                                   │           │
│  │   "filter": "*"                                            │           │
│  │ }                                                          │           │
│  │                                                            │           │
│  │ // Subscribe to specific connector                         │           │
│  │ {                                                          │           │
│  │   "action": "subscribe",                                   │           │
│  │   "filter": "plc1/*"                                       │           │
│  │ }                                                          │           │
│  │                                                            │           │
│  │ // Unsubscribe                                             │           │
│  │ {                                                          │           │
│  │   "action": "unsubscribe",                                 │           │
│  │   "filter": "plc1/*"                                       │           │
│  │ }                                                          │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  INCOMING MESSAGES:                                                        │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ // Data update                                             │           │
│  │ {                                                          │           │
│  │   "type": "data",                                          │           │
│  │   "path": "plc1/temperature",                              │           │
│  │   "value": 23.5,                                           │           │
│  │   "timestamp": "2024-01-15T10:23:45.123Z",                │           │
│  │   "quality": "Good"                                        │           │
│  │ }                                                          │           │
│  │                                                            │           │
│  │ // Status update                                           │           │
│  │ {                                                          │           │
│  │   "type": "status",                                        │           │
│  │   "connector": "plc1",                                     │           │
│  │   "status": "Connected",                                   │           │
│  │   "timestamp": "2024-01-15T10:23:45.123Z"                 │           │
│  │ }                                                          │           │
│  │                                                            │           │
│  │ // Metrics update                                          │           │
│  │ {                                                          │           │
│  │   "type": "metrics",                                       │           │
│  │   "connector": "plc1",                                     │           │
│  │   "execution_time": 12.5,                                  │           │
│  │   "message_rate": 156.7,                                   │           │
│  │   "timestamp": "2024-01-15T10:23:45.123Z"                 │           │
│  │ }                                                          │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  CLIENT EXAMPLE (JavaScript):                                              │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ const ws = new WebSocket('ws://localhost:9998');          │           │
│  │                                                            │           │
│  │ ws.onopen = () => {                                        │           │
│  │   // Subscribe to all data                                 │           │
│  │   ws.send(JSON.stringify({                                 │           │
│  │     action: 'subscribe',                                   │           │
│  │     filter: '*'                                            │           │
│  │   }));                                                     │           │
│  │ };                                                         │           │
│  │                                                            │           │
│  │ ws.onmessage = (event) => {                                │           │
│  │   const msg = JSON.parse(event.data);                      │           │
│  │   console.log(`${msg.path}: ${msg.value}`);               │           │
│  │ };                                                         │           │
│  └───────────────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 10.3 Custom Connector Development

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Custom Connector Development                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  CONNECTOR BASE CLASS STRUCTURE:                                           │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ // C# Example - Custom Source Connector                    │           │
│  │                                                            │           │
│  │ using DIME.Connectors;                                     │           │
│  │                                                            │           │
│  │ public class MyCustomConnector :                           │           │
│  │     PollingSourceConnector<MyConfig, MyItem>               │           │
│  │ {                                                          │           │
│  │     // Lifecycle method 1: Initialize                      │           │
│  │     protected override void OnInit()                       │           │
│  │     {                                                      │           │
│  │         // One-time initialization                         │           │
│  │         // Open connections, allocate resources            │           │
│  │     }                                                      │           │
│  │                                                            │           │
│  │     // Lifecycle method 2: Create                          │           │
│  │     protected override void OnCreate()                     │           │
│  │     {                                                      │           │
│  │         // Called after configuration is loaded            │           │
│  │         // Validate config, prepare items                  │           │
│  │     }                                                      │           │
│  │                                                            │           │
│  │     // Lifecycle method 3: Connect                         │           │
│  │     protected override void OnConnect()                    │           │
│  │     {                                                      │           │
│  │         // Establish connection to device                  │           │
│  │         _client = new DeviceClient(Config.Address);        │           │
│  │         _client.Connect();                                 │           │
│  │     }                                                      │           │
│  │                                                            │           │
│  │     // Lifecycle method 4: Read (called on interval)       │           │
│  │     protected override object OnRead(MyItem item)          │           │
│  │     {                                                      │           │
│  │         // Read data for specific item                     │           │
│  │         return _client.ReadValue(item.Address);            │           │
│  │     }                                                      │           │
│  │                                                            │           │
│  │     // Lifecycle method 5: Disconnect                      │           │
│  │     protected override void OnDisconnect()                 │           │
│  │     {                                                      │           │
│  │         // Clean disconnect                                │           │
│  │         _client?.Disconnect();                             │           │
│  │     }                                                      │           │
│  │                                                            │           │
│  │     // Lifecycle method 6: Deinitialize                    │           │
│  │     protected override void OnDeInit()                     │           │
│  │     {                                                      │           │
│  │         // Release all resources                           │           │
│  │         _client?.Dispose();                                │           │
│  │     }                                                      │           │
│  │ }                                                          │           │
│  │                                                            │           │
│  │ // Configuration class                                      │           │
│  │ public class MyConfig : ConnectorConfig                    │           │
│  │ {                                                          │           │
│  │     public string Address { get; set; }                    │           │
│  │     public int Port { get; set; } = 502;                   │           │
│  │     public int Timeout { get; set; } = 1000;               │           │
│  │ }                                                          │           │
│  │                                                            │           │
│  │ // Item class                                              │           │
│  │ public class MyItem : ConnectorItem                        │           │
│  │ {                                                          │           │
│  │     public string DataType { get; set; }                   │           │
│  │     public int RegisterCount { get; set; } = 1;            │           │
│  │ }                                                          │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  REGISTRATION:                                                             │
│  ┌───────────────────────────────────────────────────────────┐           │
│  │ // Add to SourceConnectorFactory.cs                        │           │
│  │                                                            │           │
│  │ case "MyCustom":                                           │           │
│  │     return new MyCustomConnector();                        │           │
│  └───────────────────────────────────────────────────────────┘           │
│                                                                            │
│  DEPLOYMENT:                                                               │
│  1. Build connector as .NET assembly                                      │
│  2. Place in DIME installation directory                                  │
│  3. Use in configuration:                                                  │
│     connector: MyCustom                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Appendix: Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Quick Reference                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  COMMON PORTS:                                                             │
│  • 5000  - MTConnect Agent                                                │
│  • 7878  - SHDR Adapter                                                   │
│  • 8080  - HTTP Server Sink                                               │
│  • 8081  - HTTP Server Source                                             │
│  • 8082  - WebSocket Server                                               │
│  • 9998  - Status WebSocket                                               │
│  • 9999  - Status HTTP                                                    │
│                                                                            │
│  YAML TYPE HINTS:                                                          │
│  • !!int 123      - Integer value                                         │
│  • !!bool true    - Boolean value                                         │
│  • !!float 1.23   - Floating point                                        │
│  • ~              - Null value                                            │
│  • |              - Multi-line string                                     │
│                                                                            │
│  PATH FORMATS:                                                             │
│  • connector/item          - Absolute path                                │
│  • ./item                  - Current connector                            │
│  • item                    - Shorthand                                    │
│  • connector/$SYSTEM/prop  - System property                              │
│                                                                            │
│  REGEX PATTERNS:                                                           │
│  • .*                      - Match all                                    │
│  • ^plc1/.*                - Starts with plc1/                            │
│  • .*temperature$          - Ends with temperature                        │
│  • plc[0-9]/.*             - plc0 through plc9                            │
│                                                                            │
│  SUPPORT:                                                                  │
│  • Documentation: https://github.com/Ladder99/DIME                        │
│  • Issues: https://github.com/Ladder99/DIME/issues                        │
│  • License: Contact sales@mriiot.com                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```