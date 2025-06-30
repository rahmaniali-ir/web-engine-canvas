# WebEngine Canvas Debug & Event System

The WebEngine Canvas now includes a comprehensive debug and event system that allows developers to monitor all internal operations and listen to events for integration purposes.

## Features

### Debug System

- **Configurable logging**: Enable/disable debug output with fine-grained control
- **Console logging**: Automatic console output with timestamps and structured data
- **Custom handlers**: Send debug events to external logging services
- **Event filtering**: Filter which types of events to log
- **Stack traces**: Optional stack trace inclusion for debugging

### Event System

- **Comprehensive event coverage**: All internal operations emit events
- **Type-safe events**: Fully typed event system with TypeScript support
- **Event listeners**: Subscribe to specific event types or all events
- **Event service access**: Access the event service through the canvas context
- **Wildcard listeners**: Listen to all events with the "\*" event type

## Usage

### Basic Debug Mode

Enable debug mode with a simple boolean:

```tsx
<WebEngineCanvas
  manifest={manifest}
  debug={true}
  // ... other props
/>
```

### Advanced Debug Configuration

Configure debug behavior with detailed options:

```tsx
<WebEngineCanvas
  manifest={manifest}
  debug={{
    enabled: true,
    logLevel: "log", // "log" | "warn" | "error" | "info"
    logToConsole: true,
    includeTimestamps: true,
    includeStackTraces: false,
    filterEvents: ["webObject", "router"], // Only log specific event types
    logToCustomHandler: debugEvent => {
      // Send to external logging service
      sendToLoggingService(debugEvent)
    },
  }}
  // ... other props
/>
```

### Event Listening

Listen to all events:

```tsx
<WebEngineCanvas
  manifest={manifest}
  onEvent={event => {
    console.log("Canvas event:", event.type, event.subtype, event)
  }}
  // ... other props
/>
```

### Accessing Event Service

Access the event service through the canvas context:

```tsx
<WebEngineCanvas
  manifest={manifest}
  onCanvasReady={context => {
    // Listen to specific event types
    context.eventService.on("webObject", event => {
      if (event.type === "webObject") {
        console.log("WebObject event:", event.webObjectId, event.subtype)
      }
    })

    context.eventService.on("router", event => {
      if (event.type === "router") {
        console.log(
          "Router event:",
          event.subtype,
          event.routerState.currentPath
        )
      }
    })

    // Listen to all events
    context.eventService.on("*", event => {
      console.log("All events:", event)
    })
  }}
  // ... other props
/>
```

## Event Types

### WebObject Events

- **ready**: WebObject component is ready and mounted
- **update**: WebObject properties have been updated
- **add**: New WebObject has been added to the tree
- **remove**: WebObject has been removed from the tree
- **move**: WebObject has been moved to a different parent

### Router Events

- **change**: Route has changed (includes previous state)
- **navigate**: Navigation to a new path
- **back**: Browser back navigation
- **forward**: Browser forward navigation

### Service Events

- **initialize**: Service has been initialized
- **error**: Service has encountered an error

### Canvas Events

- **ready**: Canvas is ready and context is available
- **mount**: Canvas component has mounted
- **unmount**: Canvas component has unmounted

### Debug Events

- **log**: General debug information
- **warn**: Warning messages
- **error**: Error messages
- **info**: Informational messages

## Event Structure

All events follow this base structure:

```typescript
interface BaseEvent {
  type: string // Event type (webObject, router, service, canvas, debug)
  timestamp: number // Unix timestamp
  source: string // Source component/service
  data?: any // Additional data
}
```

Specific event types extend this with additional properties:

```typescript
// WebObject events
interface WebObjectEvent extends BaseEvent {
  type: "webObject"
  subtype: "ready" | "update" | "add" | "remove" | "move"
  webObjectId: string
  webObject: WebObject
  element?: HTMLElement
  // Additional properties based on subtype
}

// Router events
interface RouterEvent extends BaseEvent {
  type: "router"
  subtype: "change" | "navigate" | "back" | "forward"
  routerState: RouterState
  // Additional properties based on subtype
}
```

## Debug Configuration Options

| Option               | Type     | Default   | Description                          |
| -------------------- | -------- | --------- | ------------------------------------ |
| `enabled`            | boolean  | false     | Enable/disable debug mode            |
| `logLevel`           | string   | "log"     | Log level for debug output           |
| `logToConsole`       | boolean  | true      | Output debug info to console         |
| `includeTimestamps`  | boolean  | true      | Include timestamps in debug output   |
| `includeStackTraces` | boolean  | false     | Include stack traces in debug output |
| `filterEvents`       | string[] | undefined | Filter which event types to log      |
| `logToCustomHandler` | function | undefined | Custom debug event handler           |

## Examples

### Production Debug Mode

```tsx
// Only log errors and warnings
<WebEngineCanvas
  manifest={manifest}
  debug={{
    enabled: true,
    logLevel: "error",
    logToConsole: false,
    logToCustomHandler: event => {
      // Send to production logging service
      analytics.track("canvas_error", event)
    },
  }}
/>
```

### Development Debug Mode

```tsx
// Full debug output for development
<WebEngineCanvas
  manifest={manifest}
  debug={{
    enabled: true,
    logLevel: "log",
    logToConsole: true,
    includeTimestamps: true,
    includeStackTraces: true,
    filterEvents: ["webObject", "router", "service"],
  }}
/>
```

### Event Analytics

```tsx
<WebEngineCanvas
  manifest={manifest}
  onEvent={event => {
    // Track user interactions
    if (event.type === "webObject" && event.subtype === "ready") {
      analytics.track("webobject_ready", {
        id: event.webObjectId,
        type: event.webObject.type,
      })
    }

    // Track navigation
    if (event.type === "router" && event.subtype === "change") {
      analytics.track("route_change", {
        path: event.routerState.currentPath,
        scene: event.routerState.currentScene?.id,
      })
    }
  }}
/>
```

## Best Practices

1. **Production**: Use minimal debug output and send errors to external logging
2. **Development**: Enable full debug output for troubleshooting
3. **Event filtering**: Only listen to events you need to avoid performance impact
4. **Memory management**: Remove event listeners when components unmount
5. **Type safety**: Use TypeScript type guards when handling specific event types

## Performance Considerations

- Debug mode adds minimal overhead when disabled
- Event listeners are automatically cleaned up when the canvas unmounts
- Use event filtering to reduce the number of events processed
- Consider using `once()` for one-time event listeners
- Monitor memory usage when using many event listeners
