const connectors = [
  {
    id: "common-source",
    name: "Common Source Properties",
    category: "common",
    icon: "📋",
    description: "Properties available for all source connectors in DIME.",
    type: "source",
    parameters: [
      { name: "name", type: "string", default: "\"Unnamed\"", description: "Unique connector name." },
      { name: "enabled", type: "boolean", default: "TRUE", description: "Is connector enabled." },
      { name: "connector", type: "string", default: "\"Undefined\"", description: "Connector type." },
      { name: "scan_interval", type: "int", default: "1000", description: "Scanning frequency in milliseconds." },
      { name: "rbe", type: "boolean", default: "TRUE", description: "Report data by exception, or unique value." },
      { name: "itemized_read", type: "boolean", default: "FALSE", description: "Process incoming data based on items array." },
      { name: "lang_script", type: "string", default: "Lua", description: "Python or Lua scripting language." },
      { name: "paths_script", type: "string[]", default: "Empty", description: "Absolute or relative additional paths to use for scripting libraries." },
      { name: "init_script", type: "string", default: "Empty", description: "Startup script." },
      { name: "deinit_script", type: "string", default: "Empty", description: "Shutdown script." },
      { name: "enter_script", type: "string", default: "Empty", description: "Execution loop entry script." },
      { name: "exit_script", type: "string", default: "Empty", description: "Execution loop exit script." },
      { name: "item_script", type: "string", default: "Empty", description: "Script executed for each item when undefined at item level." },
      { name: "sink", type: "dictionary", default: "Empty", description: "Sink metadata." },
      { name: "strip_path_prefix", type: "boolean", default: "FALSE", description: "Remove connector name from messages placed in outbox." },
      { name: "create_dummy_messages_on_startup", type: "boolean", default: "FALSE", description: "For itemized_read connectors, create a zero value message for each item on connector startup." },
      { name: "items", type: "list", default: "Empty", description: "List of items to read from the source." },
      { name: "items.name", type: "string", default: "\"Unnamed\"", description: "Unique item name." },
      { name: "items.enabled", type: "boolean", default: "TRUE", description: "Is item enabled." },
      { name: "items.rbe", type: "boolean", default: "TRUE", description: "Report data by exception override at item level." },
      { name: "items.every", type: "int", default: "1", description: "Execute item every x scan_interval." },
      { name: "items.address", type: "string", default: "Empty", description: "Source data address, formatting specific to connector type." },
      { name: "items.script", type: "string", default: "Empty", description: "Lua script executed after source data is read." },
      { name: "items.sink", type: "dictionary", default: "Empty", description: "Sink metadata override at item level." }
    ],
    example: `- name: script1
  enabled: !!bool true
  connector: ActiveMQ
  scan_interval: !!int 1000
  rbe: !!bool true
  itemized_read: !!bool true
  init_script: |
    print('hello from Lua');
  deinit_script: ~
  enter_script: print('entering loop');
  exit_script: print('exiting loop');
  sink:
    transform:
      type: script
      template: Message.Data
  strip_path_prefix: !!bool false
  create_dummy_messages_on_startup: !!bool false
  items:
    - name: randomNumber1
      enabled: !!bool true
      rbe: !!bool true
      every: !!int 1
      script: return math.random(10);`
  },
  {
    id: "common-sink",
    name: "Common Sink Properties",
    category: "common",
    icon: "📋",
    description: "Properties available for all sink connectors in DIME.",
    type: "sink",
    parameters: [
      { name: "name", type: "string", default: "\"Unnamed\"", description: "Unique connector name." },
      { name: "enabled", type: "boolean", default: "TRUE", description: "Is connector enabled." },
      { name: "connector", type: "string", default: "\"Undefined\"", description: "Connector type." },
      { name: "scan_interval", type: "int", default: "1000", description: "Scanning frequency in milliseconds." },
      { name: "exclude_filter", type: "list", default: "Empty", description: "Message path exclusion filter." },
      { name: "include_filter", type: "list", default: "Empty", description: "Message path inclusion filter." },
      { name: "use_sink_transform", type: "boolean", default: "FALSE", description: "Execute transform defined on the source connector." }
    ],
    example: `- name: console1
  enabled: !!bool true
  connector: Console
  scan_interval: !!int 1000
  exclude_filter:
    - script1/$SYSTEM
  #include_filter:
  #  - script1/randomNumber1
  use_sink_transform: !!bool true`
  },
  {
    id: "activemq",
    name: "ActiveMQ",
    category: "messaging",
    icon: "📨",
    description: "Subscribes to ActiveMQ topics and queues.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"ActiveMQ\"." },
      { name: "address", type: "string", default: "Empty", description: "Broker URI." },
      { name: "username", type: "string", default: "Empty", description: "Broker username." },
      { name: "password", type: "string", default: "Empty", description: "Broker password." },
      { name: "itemized_read", type: "bool", default: "FALSE", description: "When TRUE, streaming data from broker is matched against the 'items' list and processed, unmatched 'item.address' are dropped and not forwarded to sinks. When FALSE, data streaming from broker is matched against the 'items' list and processed, unmatched 'item.address' are forwarded to sinks." }
    ],
    example: `- name: amq
  connector: ActiveMQ
  address: activemq:tcp://172.24.56.104:61616
  username: artemis
  password: artemis
  items:
    - name: FooBar
      address: topic://FOO.BAR
    - name: BarFoo
      address: queue://BAR.FOO`
  },
  {
    id: "asccpc",
    name: "ASC CPC",
    category: "industrial",
    icon: "🏭",
    description: "Reads data from ASC autoclave systems.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"AscCPC\"." },
      { name: "address", type: "string", default: "Empty", description: "CPC instance hostname or IP address." },
      { name: "port", type: "string", default: "9999", description: "CPC instance port." },
      { name: "bypass_ping", type: "bool", default: "FALSE", description: "Ping CPC host before reading to determine connector connection status." }
    ],
    example: `- name: ascCpcSource1
  connector: AscCPC
  address: 192.168.111.12
  port: !!int 9999
  bypass_ping: !!bool true
  items:
    - name: Temperature
      address: .Autoclave.Inputs.AIRTC\\Value`
  },
  {
    id: "beckhoffads",
    name: "Beckhoff ADS",
    category: "industrial",
    icon: "🏭",
    description: "Reads data from Beckhoff PLCs.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"BeckhoffADS\"." },
      { name: "local_netid", type: "string", default: "Empty", description: "Local AMS Net ID." },
      { name: "address", type: "string", default: "Empty", description: "Remote AMS Net ID." },
      { name: "target_ip", type: "string", default: "Empty", description: "IPv4 address to remote AMS Net ID." },
      { name: "port", type: "int", default: "851", description: "ADS port." },
      { name: "items.type", type: "string", default: "Empty", description: "PLC register type ('bool', 'sbyte', 'short', 'int', 'long', 'float', 'string')." }
    ],
    example: `- name: ads1
  connector: BeckhoffADS
  local_netid: 1.1.1.1.1.1
  target_ip: 192.168.111.191
  address: 192.168.111.191.1.1
  port: !!int 851
  items:
    - name: boolTag1
      type: bool
      address: MAIN.someBool
    - name: intTag2
      type: int
      address: MAIN.someInt`
  },
  {
    id: "console",
    name: "Console",
    category: "utility",
    icon: "🔨",
    description: "Writes data to the console.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"Console\"." }
    ],
    example: `- name: consoleSink1
  connector: Console`
  },
  {
    id: "csvwriter",
    name: "CSV Writer",
    category: "utility",
    icon: "🔨",
    description: "Writes data to a CSV file.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"CSVWriter\"." },
      { name: "filename", type: "string", default: "Empty", description: "Absolute or relative file path and file name to write to." },
      { name: "filter_duplicate_paths", type: "bool", default: "FALSE", description: "Filter paths with same name, outputting only one instance of each path." }
    ],
    example: `- name: csvSink1
  connector: CSVWriter
  filename: ./Output/airsharc2.csv
  filter_duplicate_paths: !!bool false`
  },
  {
    id: "ethernetip",
    name: "Ethernet/IP",
    category: "industrial",
    icon: "🏭",
    description: "Reads data from Allen-Bradley PLCs.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"EthernetIP\"." },
      { name: "type", type: "string", default: "ControlLogix", description: "PLC type ('ControlLogix', 'Plc5', 'Slc500', 'LogixPccc', 'Micro800', 'MicroLogix', 'Omron')" },
      { name: "address", type: "string", default: "Empty", description: "PLC hostname, IP address." },
      { name: "path", type: "string", default: "1,0", description: "Connection path." },
      { name: "log", type: "int", default: "0", description: "Library log level (0: None … 5: Verbose)" },
      { name: "timeout", type: "int", default: "1000", description: "PLC read timeout in milliseconds." },
      { name: "bypass_ping", type: "bool", default: "FALSE", description: "Ping PLC before reading to determine connector connection status." },
      { name: "items.type", type: "string", default: "Empty", description: "PLC register type ('bool', 'ubyte', 'byte', 'ushort', 'short', 'uint', 'int', 'ulong', 'long', 'float', 'double', 'string')." }
    ],
    example: `- name: plcSource1
  connector: EthernetIP
  type: MicroLogix
  address: 192.168.111.20
  path: 1,0
  log: !!int 0
  timeout: !!int 1000
  bypass_ping: !!bool true
  items:
    - name: boolTag1
      type: bool
      address: B3:0/2
    - name: intTag2
      type: int
      address: N7:1`
  },
  {
    id: "fanucrobot",
    name: "Fanuc Robot",
    category: "robotics",
    icon: "🤖",
    description: "Reads R-J3iB, R-30iA, R-30iB Fanuc Robot controllers using SNPX.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"FanucRobot\"." },
      { name: "address", type: "string", default: "Empty", description: "Robot hostname, IP address." },
      { name: "items.address", type: "string", default: "Empty", description: "Variable to read." }
    ],
    example: `- name: fanuc1
  connector: FanucRobot
  address: 192.168.111.20
  items:
    - name: UI1
      address: UI.1`
  },
  {
    id: "haasshdr",
    name: "Haas SHDR",
    category: "cnc",
    icon: "⚙️",
    description: "Receives SHDR-like steaming data from a Haas controller over an undocumented port.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"HaasSHDR\"." },
      { name: "itemized_read", type: "bool", default: "FALSE", description: "When TRUE, streaming data from controller is matched against the 'items' list and processed, unmatched 'item.address' are dropped and not forwarded to sinks. When FALSE, data streaming from controller is matched against the 'items' list and processed, unmatched 'item.address' are forwarded to sinks." },
      { name: "address", type: "string", default: "Empty", description: "Controller IP hostname or address." },
      { name: "port", type: "int", default: "9998", description: "Controller port number." },
      { name: "timeout", type: "int", default: "1000", description: "Connection timeout in milliseconds." },
      { name: "heartbeat_interval", type: "int", default: "4000", description: "Heartbeat frequency in milliseconds." },
      { name: "retry_interval", type: "int", default: "10000", description: "Retry frequency in milliseconds." }
    ],
    example: `- name: haasSource1
  connector: HaasSHDR
  itemized_read: !!bool true
  address: 192.168.111.221
  port: !!int 9998
  timeout: !!int 1000
  heartbeat_interval: !!int 4000
  retry_interval: !!int 10000
  items:
    - name: CPU
      enabled: !!bool true
      address: CPU
      script: |
        if tonumber(result) > 0.5 then
          return 'HIGH';
        else
          return 'LOW';
        end`
  },
  {
    id: "httpclient",
    name: "HTTP Client",
    category: "web",
    icon: "🌐",
    description: "Posts data to an HTTP server.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"HTTPClient\"." },
      { name: "uri", type: "string", default: "http://localhost/", description: "Resource URL to POST JSON payload to." },
      { name: "headers", type: "dictionary", default: "Empty", description: "Dictionary of request headers." }
    ],
    example: `- name: httpClientSink1
  connector: HttpClient
  uri: https://webhook.site/0e10dc3d-6bec-45fa-952d-dba785bc3109
  headers:
    Content-Type: text/plain;
    Authorization: None`
  },
  {
    id: "httpserversource",
    name: "HTTP Server",
    category: "web",
    icon: "🌐",
    description: "Starts an HTTP server and listens to HTTP POST requests. Posted data is matched to individual items by the relative path where it was posted.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"HTTPServer\"." },
      { name: "uri", type: "string", default: "http://localhost:8081/", description: "URL to listen for POST requests." },
      { name: "items.address", type: "string", default: "Empty", description: "URI path where to get POST data from." }
    ],
    example: `- name: httpServerSource1
  connector: HTTPServer
  uri: http://localhost:8081/
  init_script: |
    json = require('json');
  items:
    - name: postData
      address: post/data
      script: |
        return json.decode(result).hello;`
  },
  {
    id: "httpserversink",
    name: "HTTP Server",
    category: "web",
    icon: "🌐",
    description: "Starts an HTTP server and serves all data items to external HTTP clients.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"HTTPServer\"." },
      { name: "uri", type: "string", default: "http://localhost:8080/", description: "URL to serve items." }
    ],
    example: `- name: httpServerSink1
  connector: HttpServer
  uri: http://localhost:8080/`
  },
  {
    id: "influxlp",
    name: "InfluxLP",
    category: "analytics",
    icon: "📊",
    description: "Writes data to an Influx Data bucket.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"InfluxLP\"." },
      { name: "address", type: "string", default: "Empty", description: "URL to your Influx instance." },
      { name: "token", type: "string", default: "Empty", description: "Influx token." },
      { name: "org_name", type: "string", default: "Empty", description: "Influx organization name." },
      { name: "bucket_name", type: "string", default: "Empty", description: "" }
    ],
    example: `- name: influxLpSink1
  connector: InfluxLP
  address: https://us-east-1-1.aws.cloud2.influxdata.com
  token: abc123
  org_name: mriiot
  bucket_name: bucket1`
  },
  {
    id: "jsonwebscraper",
    name: "JSONWebScraper",
    category: "web",
    icon: "🌐",
    description: "Reads data from an JSON web page.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"JSONWebScraper\"." },
      { name: "uri", type: "string", default: "http://localhost/", description: "Web page address." },
      { name: "items.address", type: "string", default: "Empty", description: "Jsonata query." }
    ],
    example: `- name: json1
  connector: JsonWebScraper
  uri: https://raw.githubusercontent.com/jpadfield/simple-site/refs/heads/master/build/mirador.json
  init_script: json = require('json')
  items:
    - name: node1
      address: $.catalog.manifestID
      script: |
        return json.decode(result)[1];`
  },
  {
    id: "logger",
    name: "Logger",
    category: "utility",
    icon: "🔨",
    description: "Writes data to an NLog logger.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"Logger\"." }
    ],
    example: `- name: loggerSink1
  connector: Logger`
  },
  {
    id: "modbustcp",
    name: "ModbusTCP",
    category: "industrial",
    icon: "🏭",
    description: "Reads data from a Modbus/TCP device.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"ModbusTCP\"." },
      { name: "address", type: "string", default: "Empty", description: "Device hostname or IP address." },
      { name: "port", type: "int", default: "502", description: "Port number." },
      { name: "slave", type: "int", default: "1", description: "Modbus slave ID." },
      { name: "timeout", type: "int", default: "1000", description: "Read timeout in milliseconds." },
      { name: "items.address", type: "string", default: "Empty", description: "Register address." },
      { name: "items.type", type: "string", default: "1", description: "Register type (1 - coil, 2 - input, 3 - holding register, 4 - input register)." },
      { name: "items.count", type: "int", default: "1", description: "Number of consecutive registers to read." }
    ],
    example: `- name: modbusSource1
  connector: ModbusTCP
  address: 192.168.111.20
  port: !!int 502
  slave: !!int 1
  timeout: !!int 1000
  init_script: struct = require('struct')
  items:
    - name: coilTags
      type: !!int 1
      address: !!int 1
      count: !!int 10
    - name: holdingTags
      type: !!int 3
      address: !!int 24
      count: !!int 2
      script: |
        -- https://www.scadacore.com/tools/programming-calculators/online-hex-converter/
        return struct.unpack('<I', struct.pack('<HH', result[0], result[1]));`
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    icon: "🗄️",
    description: "Writes data to a MongoDB collection.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"MongoDB\"." },
      { name: "address", type: "string", default: "Empty", description: "Database connection string." },
      { name: "database", type: "string", default: "Empty", description: "Database name." },
      { name: "collection", type: "string", default: "Empty", description: "Collection name." }
    ],
    example: `- name: mongo
  connector: MongoDB
  address: mongodb+srv://user:password@cluster0.h7xod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  database: DIME
  collection: TS`
  },
  {
    id: "mqttsource",
    name: "MQTT",
    category: "messaging",
    icon: "📨",
    description: "Subscribes to MQTT broker topics.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"MQTT\"." },
      { name: "address", type: "string", default: "Empty", description: "Broker hostname or IP address." },
      { name: "port", type: "int", default: "1883", description: "Broker port." },
      { name: "qos", type: "int", default: "0", description: "Quality of Service (0, 1, 2)." },
      { name: "itemized_read", type: "bool", default: "FALSE", description: "When TRUE, streaming data from broker is matched against the 'items' list and processed, unmatched 'item.address' are dropped and not forwarded to sinks. When FALSE, data streaming from broker is matched against the 'items' list and processed, unmatched 'item.address' are forwarded to sinks." },
      { name: "clean_session", type: "bool", default: "TRUE", description: "MQTT clean session." },
      { name: "tls", type: "bool", default: "FALSE", description: "SSL/TLS connection." },
      { name: "tls_insecure", type: "bool", default: "FALSE", description: "Allow untrusted certificates." },
      { name: "client_cert_path", type: "string", default: "Empty", description: "Relative or absolute path to the client certificate (.pfx)." },
      { name: "client_cert_password", type: "string", default: "Empty", description: "Client certificate password." },
      { name: "ca_cert_path", type: "string", default: "Empty", description: "Relative or absolute path to the certificate authority certificate." },
      { name: "username", type: "string", default: "Empty", description: "Username." },
      { name: "password", type: "string", default: "Empty", description: "Password." },
      { name: "items.address", type: "string", default: "Empty", description: "Single or wildcard subscription topic." }
    ],
    example: `- name: mqttSource1
  connector: MQTT
  address: wss.sharc.tech
  port: !!int 1883
  items:
    - name: subscribe1
      address: sharc/+/evt/#`
  },
  {
    id: "mqttsink",
    name: "MQTT",
    category: "messaging",
    icon: "📨",
    description: "Publishes data to an MQTT broker.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"MQTT\"." },
      { name: "address", type: "string", default: "Empty", description: "Broker hostname or IP address." },
      { name: "port", type: "int", default: "1883", description: "Broker port." },
      { name: "qos", type: "int", default: "0", description: "Quality of Service (0, 1, 2)." },
      { name: "retain", type: "bool", default: "TRUE", description: "Retain published messages." },
      { name: "base_topic", type: "string", default: "dime", description: "Topic prefix for published messages." },
      { name: "clean_session", type: "bool", default: "TRUE", description: "MQTT clean session." },
      { name: "tls", type: "bool", default: "FALSE", description: "SSL/TLS connection." },
      { name: "tls_insecure", type: "bool", default: "FALSE", description: "Allow untrusted certificates." },
      { name: "client_cert_path", type: "string", default: "Empty", description: "Relative or absolute path to the client certificate (.pfx)." },
      { name: "client_cert_password", type: "string", default: "Empty", description: "Client certificate password." },
      { name: "ca_cert_path", type: "string", default: "Empty", description: "Relative or absolute path to the certificate authority certificate." },
      { name: "username", type: "string", default: "Empty", description: "Username." },
      { name: "password", type: "string", default: "Empty", description: "Password." }
    ],
    example: `- name: mqttSink1
  connector: MQTT
  address: wss.sharc.tech
  port: !!int 1883
  base_topic: ids
  qos: !!int 0
  retain: !!bool true`
  },
  {
    id: "mssql",
    name: "MSSQL",
    category: "database",
    icon: "🗄️",
    description: "Reads data from a Microsoft SQL database.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"MSSQL\"." },
      { name: "connection_string", type: "string", default: "Empty", description: "Database connection string." },
      { name: "command_text", type: "string", default: "Empty", description: "SQL query." },
      { name: "items.address", type: "string", default: "Empty", description: "DataTable column name." }
    ],
    example: `- name: msSqlSource1
  connector: MSSQL
  connection_string: Server=172.16.10.5;Database=Tykma;User Id=datareader;Password=datareader;Encrypt=True;TrustServerCertificate=True;
  command_text: select top 5 * from dbo.SiliconeRubberOrders;
  items:
    - name: OrderNumber
      address: ManufacturingOrderNumber
      script: return result[0];
    - name: OrderQuantity
      address: OrderQuantity
      script: return result[0];`
  },
  {
    id: "mtconnectagentsource",
    name: "MTConnect Agent",
    category: "cnc",
    icon: "⚙️",
    description: "Reads streaming data from an external MTConnect Agent.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"MTConnectAgent\"." },
      { name: "address", type: "string", default: "Empty", description: "Agent hostname or IP address." },
      { name: "port", type: "int", default: "5000", description: "Agent port." },
      { name: "device", type: "string", default: "Empty", description: "Device name to query." },
      { name: "itemized_read", type: "bool", default: "FALSE", description: "When TRUE, streaming data from agent is matched against the 'items' list and processed, unmatched 'item.address' are dropped and not forwarded to sinks. When FALSE, data streaming from agent is matched against the 'items' list and processed, unmatched 'item.address' are forwarded to sinks." },
      { name: "items.address", type: "string", default: "Empty", description: "DataItem ID to read." }
    ],
    example: `- name: mtConnectSource1
  connector: MTConnectAgent
  address: mtconnect.mazakcorp.com
  port: !!int 5719
  device: HCN001
  interval: !!int 100
  items:
    - name: PathPositionSample
      address: pathpos
      script: |
        return result[0].Value;`
  },
  {
    id: "mtconnectagentsink",
    name: "MTConnect Agent",
    category: "cnc",
    icon: "⚙️",
    description: "Serve MTConnect embedded Agent.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"MTConnectAgent\"." },
      { name: "address", type: "string", default: "Empty", description: "Agent hostname or IP address." },
      { name: "port", type: "int", default: "5000", description: "Agent port." }
    ],
    example: `- name: mtConnectSink1
  connector: MTConnectAgent
  port: !!int 5000`
  },
  {
    id: "mtconnectshdr",
    name: "MTConnect SHDR",
    category: "cnc",
    icon: "⚙️",
    description: "Stream SHDR to an external Agent.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"MTConnectSHDR\"." },
      { name: "port", type: "int", default: "7878", description: "SHDR listening port." },
      { name: "device_key", type: "string", default: "Empty", description: "Device key." },
      { name: "heartbeat_interval", type: "int", default: "10000", description: "Ping/Pong frequency in milliseconds." },
      { name: "filter_duplicates", type: "bool", default: "TRUE", description: "Filter duplicates." },
      { name: "output_folder", type: "string", default: "./Output/MTConnect", description: "Absolute or relative folder path where to write Devices.xml." }
    ],
    example: `- name: shdrSink1
  connector: MTConnectSHDR
  port: !!int 7878
  device_key: ~
  heartbeat_interval: !!int 10000
  filter_duplicates: !!bool true`
  },
  {
    id: "nwsweather",
    name: "Nws Weather",
    category: "utility",
    icon: "🔨",
    description: "Reads weather at the specified location.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"NwsWeather\"." },
      { name: "address", type: "string", default: "https://api.weather.gov", description: "Server hostname or IP address." },
      { name: "agent", type: "string", default: "(MyWeatherApp, contact@example.com)", description: "Unique user-agent." },
      { name: "items.address", type: "string", default: "Empty", description: "Longitude and Latitude, comma separated." },
      { name: "items.forecast", type: "string", default: "daily", description: "Daily or hourly forecast." }
    ],
    example: `- name: nwsweather
  enabled: !!bool true
  scan_interval: !!int 10000
  connector: NwsWeather
  address: https://api.weather.gov
  agent: (DimeWeather, contact@dime.com)
  items:
    - name: NewYork
      address: 40.7128, -74.0060
      forecast: daily
      script: |
        print(result.properties.periods[0].temperature)
        return result.properties.periods[0].temperature;`
  },
  {
    id: "opcda",
    name: "OPC-DA",
    category: "industrial",
    icon: "🏭",
    description: "Reads items from an OPC-DA server.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"OpcDA\"." },
      { name: "address", type: "string", default: "Kepware.KEPServerEX.V6", description: "Server node." },
      { name: "items.address", type: "string", default: "Empty", description: "Node ID to read." }
    ],
    example: `- name: opcDaSource1
  connector: OpcDA
  address: Kepware.KEPServerEX.V6
  items:
    - name: DateTime
      address: _System._DateTime`
  },
  {
    id: "opcuasource",
    name: "OPC-UA",
    category: "industrial",
    icon: "🏭",
    description: "Reads items from an OPC-UA server.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"OpcUA\"." },
      { name: "address", type: "string", default: "Empty", description: "Server hostname or IP address." },
      { name: "port", type: "int", default: "49320", description: "Server port." },
      { name: "path", type: "string", default: "Empty", description: "Server path." },
      { name: "timeout", type: "int", default: "1000", description: "Timeout in milliseconds." },
      { name: "mode", type: "int", default: "None", description: "1=None, 2=Sign, 3=SignAndEncrypt" },
      { name: "policy", type: "int", default: "None", description: "1=None, 2=Basic256, 3=Basic128Rsa15, 4=Basic256Sha256" },
      { name: "anonymous", type: "bool", default: "FALSE", description: "Connect anonymously." },
      { name: "username", type: "string", default: "Empty", description: "Username." },
      { name: "password", type: "string", default: "Empty", description: "Password." },
      { name: "allow_status_codes", type: "list", default: "Empty", description: "List of allowed status codes. Codes in this list will not cause connector to throw an error." },
      { name: "items.address", type: "string", default: "Empty", description: "Node ID to read." },
      { name: "items.namespace", type: "int", default: "2", description: "Namespace ID to read." }
    ],
    example: `- name: opcUaSource1
  connector: OpcUA
  address: localhost
  port: !!int 49320
  timeout: !!int 1000
  anonymous: !!bool false
  username: chris
  password: passwordpassword
  allowed_status_codes:
    - 2156724224
  items:
    - name: DateTime
      namespace: !!int 2
      address: _System._DateTime
    - name: Random
      namespace: !!int 2
      address: Simulation Examples.Functions.Random6`
  },
  {
    id: "opcuasink",
    name: "OPC-UA",
    category: "industrial",
    icon: "🏭",
    description: "Writes items to an OPC-UA server.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"OpcUA\"." },
      { name: "address", type: "string", default: "Empty", description: "Server hostname or IP address." },
      { name: "port", type: "int", default: "49320", description: "Server port." },
      { name: "timeout", type: "int", default: "1000", description: "Timeout in milliseconds." },
      { name: "mode", type: "int", default: "None", description: "1=None, 2=Sign, 3=SignAndEncrypt" },
      { name: "policy", type: "int", default: "None", description: "1=None, 2=Basic256, 3=Basic128Rsa15, 4=Basic256Sha256" },
      { name: "anonymous", type: "bool", default: "FALSE", description: "Connect anonymously." },
      { name: "username", type: "string", default: "Empty", description: "Username." },
      { name: "password", type: "string", default: "Empty", description: "Password." }
    ],
    example: `- name: opcUaSource1
  connector: OpcUA
  address: localhost
  port: !!int 49320
  timeout: !!int 1000
  anonymous: !!bool false
  username: chris
  password: passwordpassword`
  },
  {
    id: "postgres",
    name: "Postgres",
    category: "database",
    icon: "🗄️",
    description: "Reads data from a PostgreSQL database.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"Postgres\"." },
      { name: "connection_string", type: "string", default: "Empty", description: "Database connection string." },
      { name: "command_text", type: "string", default: "Empty", description: "SQL query." },
      { name: "items.address", type: "string", default: "Empty", description: "DataTable column name." }
    ],
    example: `- name: postgresSource1
  connector: Postgres
  connection_string: Host=172.16.10.43;Port=5342;Username=postgres;Password=postgres;Database=pg;
  command_text: select * from public.fedex limit 3;
  items:
    - name: TrackingNumber
      address: package_tracking_number
      script: return result[0];
    - name: ShipToName
      address: ship_to_name
      script: return result;`
  },
  {
    id: "redissource",
    name: "Redis",
    category: "database",
    icon: "🗄️",
    description: "Reads data from Redis.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"Redis\"." },
      { name: "address", type: "string", default: "Empty", description: "Server hostname or IP address." },
      { name: "port", type: "int", default: "6379", description: "Server port." },
      { name: "database", type: "int", default: "0", description: "Database ID." },
      { name: "items.address", type: "string", default: "Empty", description: "Cache path." }
    ],
    example: `- name: redisSink1
  connector: Redis
  address: 172.24.56.104
  port: !!int 6379
  database: !!int 0
  items:
    - name: plcGoodPartCount
      address: eipSource1/GoodPartCount`
  },
  {
    id: "redissink",
    name: "Redis",
    category: "database",
    icon: "🗄️",
    description: "Writes data to Redis.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"Redis\"." },
      { name: "address", type: "string", default: "Empty", description: "Server hostname or IP address." },
      { name: "port", type: "int", default: "6379", description: "Server port." },
      { name: "database", type: "int", default: "0", description: "Database ID." }
    ],
    example: `- name: redisSink1
  connector: Redis
  address: 172.24.56.104
  port: !!int 6379
  database: !!int 0`
  },
  {
    id: "script",
    name: "Script",
    category: "utility",
    icon: "🔨",
    description: "Executes arbitrary scripts.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"Script\"." }
    ],
    example: `- name: scriptSource1
  connector: Script
  init_script: ~
  deinit_script: ~
  enter_script: ~
  exit_script: ~
  items:
    - name: Temperature
      script: |
        return math.random(100);`
  },
  {
    id: "siemenss7",
    name: "Siemens S7",
    category: "industrial",
    icon: "🏭",
    description: "Reads registers from a Siemens S7 PLC.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"SiemensS7\"." },
      { name: "type", type: "string", default: "S71200", description: "PLC type ('S71200', 'S7200', 'S7300', 'S7400', 'S7200Smart', 'S71500', 'Logo0BA8')." },
      { name: "address", type: "string", default: "Empty", description: "PLC hostname or IP address." },
      { name: "port", type: "int", default: "102", description: "PLC port." },
      { name: "rack", type: "int", default: "0", description: "PLC rack." },
      { name: "slot", type: "int", default: "0", description: "PLC slot." },
      { name: "bypass_ping", type: "bool", default: "FALSE", description: "Ping PLC before reading to determine connector connection status." },
      { name: "items.address", type: "string", default: "Empty", description: "Register address." },
      { name: "items.type", type: "string", default: "Empty", description: "PLC register type ('bool', 'sbyte', 'short', 'int', 'long', 'float', 'string')." }
    ],
    example: `- name: plcSource1
  connector: SiemensS7
  type: S71200
  address: 192.168.111.20
  port: !!int 102
  rack: !!int 0
  slow: !!int 0
  bypass_ping: !!bool true
  items:
    - name: input0
      type: bool
      address: I0.0
    - name: output0
      type: bool
      address: Q0.0`
  },
  {
    id: "snmp",
    name: "SNMP",
    category: "industrial",
    icon: "🏭",
    description: "Reads SNMP device.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"SNMP\"." },
      { name: "address", type: "string", default: "Empty", description: "Device hostname or IP address." },
      { name: "port", type: "int", default: "161", description: "Device port." },
      { name: "community", type: "string", default: "public", description: "Community." },
      { name: "timeout", type: "int", default: "1000", description: "Read timeout." },
      { name: "items.address", type: "string", default: "Empty", description: "Item OID." }
    ],
    example: `- name: snmpSource1
  connector: SNMP
  address: 192.168.150.143
  port: !!int 161
  community: public
  timeout: !!int 1000
  items:
    - name: Temperature
      address: 1.3.6.1.4.1.6574.1.2.0
    - name: Model
      address: 1.3.6.1.4.1.6574.1.5.1.0
    - name: SerialNumber
      address: 1.3.6.1.4.1.6574.1.5.2.0`
  },
  {
    id: "sparkplugbsource",
    name: "SparkplugB",
    category: "messaging",
    icon: "📨",
    description: "Subscribes to a SparkplugB host.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"SparkplugB\"." },
      { name: "address", type: "string", default: "Empty", description: "Host hostname or IP address." },
      { name: "port", type: "int", default: "1883", description: "Host port." },
      { name: "username", type: "string", default: "Empty", description: "Username." },
      { name: "password", type: "string", default: "Empty", description: "Password." },
      { name: "clean_session", type: "bool", default: "TRUE", description: "Clean session." },
      { name: "qos", type: "int", default: "0", description: "Quality of service (0, 1, 2)" },
      { name: "items.address", type: "string", default: "Empty", description: "SpB topic." }
    ],
    example: `- name: spb
  connector: SparkplugB
  address: localhost
  port: !!int 1883
  username: user
  password: password
  clean_session: !!bool true
  qos: !!int 0
  items:
    - name: F1D1
      address: spBv1.0/Chicago/DDATA/Factory1/DIME1`
  },
  {
    id: "sparkplugbsink",
    name: "SparkplugB",
    category: "messaging",
    icon: "📨",
    description: "Publishes data to a SparkplugB host.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"SparkplugB\"." },
      { name: "address", type: "string", default: "Empty", description: "Host hostname or IP address." },
      { name: "port", type: "int", default: "1883", description: "Host port." },
      { name: "username", type: "string", default: "Empty", description: "Username." },
      { name: "password", type: "string", default: "Empty", description: "Password." },
      { name: "host_id", type: "string", default: "dime", description: "Host ID." },
      { name: "group_id", type: "string", default: "dime", description: "Group ID." },
      { name: "node_id", type: "string", default: "dime", description: "Node ID." },
      { name: "device_id", type: "string", default: "dime", description: "Device ID." },
      { name: "reconnect_interval", type: "int", default: "15000", description: "Reconnect interval in millseconds." },
      { name: "birth_delay", type: "int", default: "10000", description: "Delay birth certificate creation in milliseconds." }
    ],
    example: `- name: sparkplugBSink1
  connector: SparkplugB
  address: localhost
  port: !!int 1883
  username: admin
  password: admin
  host_id: dime
  group_id: dime
  node_id: dime
  device_id: dime
  reconnect_interval: !!int 15000
  birth_delay: !!int 10000`
  },
  {
    id: "splunkehsdk1",
    name: "Splunk EH SDK (Version 1.0)",
    category: "analytics",
    icon: "📊",
    description: "Writes data to Splunk via Splunk EdgeHub SDK.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"SplunkEhSdk1\"." },
      { name: "address", type: "string", default: "http://host.docker.internal", description: "Internal address." },
      { name: "port", type: "int", default: "50051", description: "Internal port." },
      { name: "numbers_to_metrics", type: "bool", default: "FALSE", description: "Write numbers as metrics." }
    ],
    example: `- name: splunkEhSdk
  connector: SplunkEhSDK1
  address: http://host.docker.internal
  port: !!int 50051
  numbers_to_metrics: !!bool true`
  },
  {
    id: "splunkehsdk2",
    name: "Splunk EH SDK (Version 2.0)",
    category: "analytics",
    icon: "📊",
    description: "Writes data to Splunk via Splunk EdgeHub SDK.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"SplunkEhSdk2\"." },
      { name: "address", type: "string", default: "http://host.docker.internal", description: "Internal address." },
      { name: "port", type: "int", default: "50051", description: "Internal port." }
    ],
    example: `- name: splunkEhSdk
  connector: SplunkEhSDK2
  address: http://host.docker.internal
  port: !!int 50051`
  },
  {
    id: "splunkhec",
    name: "Splunk HEC",
    category: "analytics",
    icon: "📊",
    description: "Writes data to Splunk via Splunk HEC.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"SplunkHEC\"." },
      { name: "address", type: "string", default: "Empty", description: "Splunk hostname or IP address." },
      { name: "port", type: "int", default: "8088", description: "Splunk HEC port." },
      { name: "use_ssl", type: "bool", default: "FALSE", description: "Use HTTP or HTTPS." },
      { name: "token", type: "string", default: "Empty", description: "Splunk HEC token." },
      { name: "event_or_metric", type: "string", default: "event", description: "Send as 'event' or 'metric'." },
      { name: "source", type: "string", default: "Empty", description: "Source." },
      { name: "source_type", type: "string", default: "_json", description: "Source type." }
    ],
    example: `- name: splunkHecSink1
  connector: SplunkHEC
  address: localhost
  port: 8088
  use_ssl: false
  token: abc123
  event_or_metric: event
  source: source1
  source_type: _json`
  },
  {
    id: "tcpascii",
    name: "TcpASCII",
    category: "web",
    icon: "🌐",
    description: "Sends ASCII commands over a socket and reads back the response.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"TcpASCII\"." },
      { name: "address", type: "string", default: "Empty", description: "Hostname or IP address." },
      { name: "port", type: "int", default: "23", description: "Port." },
      { name: "read_delay", type: "int", default: "0", description: "Delay in milliseconds between socket write and socket read." },
      { name: "reuse_connection", type: "bool", default: "TRUE", description: "Maintain a single connection." }
    ],
    example: `- name: haas1
  connector: TcpASCII
  address: 192.168.111.216
  port: !!int 5051
  read_delay: !!int 400
  items:
    - name: SerialNumber
      address: ?Q100`
  },
  {
    id: "timescalews",
    name: "TimescaleWS",
    category: "analytics",
    icon: "📊",
    description: "Subscribes to data from a Timescale Historian via a WebSocket.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"TimebaseWS\"." },
      { name: "address", type: "string", default: "Empty", description: "Hostname or IP address." },
      { name: "port", type: "int", default: "4511", description: "Port." },
      { name: "items.address", type: "string", default: "Empty", description: "Path to historian item." },
      { name: "items.group", type: "string", default: "Empty", description: "Historian item group." }
    ],
    example: `- name: timebaseWsSource1
  connector: TimebaseWS
  address: localhost
  port: 4511
  items:
    - name: plcExecution
      group: MQTT Data
      address: dime/eipSource1/Execution/Data`
  },
  {
    id: "trakhoundhttp",
    name: "TrakhoundHTTP",
    category: "analytics",
    icon: "📊",
    description: "Writes data to a Trakhound server.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"TrakhoundHTTP\"." },
      { name: "address", type: "string", default: "Empty", description: "Trakhound hostname or IP address." },
      { name: "port", type: "int", default: "8472", description: "Trakhound port." },
      { name: "use_ssl", type: "bool", default: "FALSE", description: "Use HTTPS or HTTP." },
      { name: "router", type: "string", default: "Empty", description: "Router name." },
      { name: "host_path", type: "string", default: "Empty", description: "Host path." },
      { name: "base_path", type: "string", default: "Empty", description: "Base path." }
    ],
    example: `- name: trakhoundHttpSink1
  enabled: !!bool false
  scan_interval: !!int 1000
  connector: TrakHoundHTTP
  address: localhost
  port: 8472
  use_ssl: false
  router: default
  base_path: Ladder99:/DIME/HttpSink`
  },
  {
    id: "udpserver",
    name: "UDP Server",
    category: "web",
    icon: "🌐",
    description: "Reads data from a UDP socket.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"UDPServer\"." },
      { name: "address", type: "string", default: "Empty", description: "IP address, hostname is not accepted." },
      { name: "port", type: "int", default: "2323", description: "Port to listen on." },
      { name: "items.address", type: "string", default: "Empty", description: "Here 'message' represents the byte array received." }
    ],
    example: `- name: udpserver
  enabled: !!bool true
  scan_interval: !!int 1000
  connector: UDPServer
  address: 0.0.0.0
  port: 2323
  items:
    - name: message
      address: message
      script: return result[0]`
  },
  {
    id: "websocketserver",
    name: "WebsocketServer",
    category: "web",
    icon: "🌐",
    description: "Serve data from a Websocket Server.",
    type: "sink",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"WebsocketServer\"." },
      { name: "uri", type: "string", default: "ws://127.0.0.1:8082/", description: "Websocket server address." }
    ],
    example: `- name: wsServerSink1
  connector: WebsocketServer
  uri: ws://127.0.0.1:8082/`
  },
  {
    id: "wintrisssmartpac",
    name: "Wintriss SmartPAC",
    category: "cnc",
    icon: "⚙️",
    description: "Reads data from a Wintriss SmartPAC controller",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"SmartPAC\"." },
      { name: "address", type: "string", default: "Empty", description: "Hostname or IP address." },
      { name: "port", type: "int", default: "1007", description: "Port." }
    ],
    example: `- name: smartpacSource1
  connector: SmartPAC
  address: 172.16.200.18
  port: !!int 1007
  items:
    - name: PressType
      enabled: !!bool true
      script: return result[0];
    - name: PressName
      enabled: !!bool true
      script: return result[1];`
  },
  {
    id: "xmlwebscraper",
    name: "XMLWebScraper",
    category: "web",
    icon: "🌐",
    description: "Reads data from an XML web page.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"XMLWebScraper\"." },
      { name: "uri", type: "string", default: "http://localhost/", description: "Web page address." },
      { name: "namespaces", type: "dictionary", default: "Empty", description: "Namespace mappings." },
      { name: "items.address", type: "string", default: "Empty", description: "XPath query." }
    ],
    example: `- name: xml1
  connector: XMLWebScraper
  uri: http://192.168.111.216:8082/current
  namespaces:
    mt: urn:mtconnect.org:MTConnectStreams:1.2
  item_script: |
    return result.InnerText
  items:
    - name: node1
      address: //mt:Message[@dataItemId='sp2maxpwr']`
  },
  {
    id: "yaskawarobot",
    name: "Yaskawa Robot",
    category: "robotics",
    icon: "🤖",
    description: "Reads data from DX200, YRC1000, YRC1000 Micro Yaskawa controllers.",
    type: "source",
    parameters: [
      { name: "connector", type: "string", default: "Undefined", description: "Connector type, \"Yaskawa\"." },
      { name: "address", type: "string", default: "Empty", description: "Robot IP address or hostname." },
      { name: "items.address", type: "string", default: "Empty", description: "Robot variable address." }
    ],
    example: `- name: yaskawa1
  connector: Yaskawa
  uri: 10.1.1.200
  items:
    - name: xpos
      address: cartesianPositions.X`
  }
];