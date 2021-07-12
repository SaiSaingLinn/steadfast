import { lazy } from 'react'

const Ticket = lazy(() => import('./serviceticket'))
const TicketDetail = lazy(() => import('./serviceticketdetail'))
const TicketCheckout = lazy(() => import('./checkout'))
const TicketOrderSuccess = lazy(() => import('./ticketordersuccess'))

const ServiceTicket = {
  Ticket,
  TicketDetail,
  TicketCheckout,
  TicketOrderSuccess
}

export default ServiceTicket