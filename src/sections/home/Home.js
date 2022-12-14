import React, { useState, useMemo, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import Button from '../../common/components/Button/Button'
import TextField from '../../common/components/TextField/TextField'
import FullPageLoader from '../../common/components/FullPageLoader/FullPageLoader'
import ConnectionStatus from '../../common/components/ConnectionStatus/ConnectionStatus'
import ProductImage from './components/ProductImage/ProductImage'
import CountDownTimer from '../../common/components/CountDownTimer/CountDownTimer'

// Utils
import { getConnectionStatus } from '../../common/utils/connectionStatus'
import { notifyError, notifySuccess } from '../../common/utils/toastifyActions'

import styles from './Home.module.css'
import Card from '../../common/components/Card/Card'

export default function HomeSection({}) {
  //Public API that will echo messages sent to it back to the client
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    process.env.NEXT_PUBLIC_SOCKET_URL,
    {
      shouldReconnect: () => true, // Attempt to reconnect
      reconnectInterval: 1000,
    }
  )

  const [bid, setBid] = useState(undefined)
  const [product, setProduct] = useState()
  const [currentBid, setCurrentBid] = useState()

  useEffect(() => {
    if (!lastMessage) return

    const { product: _product, event } = JSON.parse(lastMessage.data)

    if (JSON.stringify(_product) === JSON.stringify(product)) {
      return
    }

    if (event === 'product-updated') {
      notifySuccess('El producto ha sido actualizado')
    }

    if (event === 'error') {
      notifyError('Ha ocurrido un error inesperado.')
    }

    if (event === 'test') {
      notifySuccess('Conexión establecida.')
    }

    if (_product) {
      setProduct(_product)
      setCurrentBid([...(_product.bids || [])].pop()?.value || _product.initialPrice)
    }
  }, [lastMessage?.data])

  // TODO: Implement debounce
  const handleSetBid = (evt) => {
    setBid(evt.target.value)
    evt.preventDefault()
  }

  const round = (value) => {
    let parsedValue = value.replace(',', '.')

    if (value.split('.')?.[1]?.length === 0) {
      parsedValue = value.replace('.', '')
    }

    return Math.round((+parsedValue + Number.EPSILON) * 100) / 100
  }

  const handleClickSendMessage = () => {
    if (!bid || round(bid) <= currentBid) {
      notifyError('La puja debe ser mas alta.')
      return
    }

    if (bid > 100000) {
      notifyError('No te pases chic@')
      return
    }

    sendJsonMessage({
      event: 'bid',
      bidValue: round(bid),
    })

    setBid(null)
  }

  const connectionStatus = getConnectionStatus(readyState)

  if (!product || readyState === ReadyState.CONNECTING) return <FullPageLoader />

  return (
    <>
      <div className={styles.content}>
        <ProductImage src={product.photo} alt={product.name} />

        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <CountDownTimer productWeek={product.week} />

        <Card className={styles.bid}>
          <h2>{currentBid}€</h2>
          <div>
            <div className={styles.bidInput}>
              <TextField onChange={handleSetBid} type="number" value={bid} />
              <Button onClick={handleClickSendMessage}>Bid</Button>
            </div>
          </div>
        </Card>
      </div>
      <ConnectionStatus connectionStatus={connectionStatus} />
    </>
  )
}
