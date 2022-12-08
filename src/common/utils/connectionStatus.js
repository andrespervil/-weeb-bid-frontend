import { ReadyState } from 'react-use-websocket'

export const connectionStatuses = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
}

export const getConnectionStatus = (connectionStatus) => {
  return connectionStatuses[connectionStatus]
}
