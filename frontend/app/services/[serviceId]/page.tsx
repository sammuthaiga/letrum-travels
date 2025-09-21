import { notFound } from 'next/navigation'
import ServiceDetailPage from '@/components/ServiceDetailPage'

// Define valid service IDs
const validServiceIds = [
  'safari-tours',
  'flight-booking', 
  'car-rentals',
  'visa-processing',
  'travel-products',
  'client-account'
]

interface PageProps {
  params: {
    serviceId: string
  }
}

export default async function ServicePage({ params }: PageProps) {
  // params may be a Promise in some Next.js routing setups; await to be safe
  const p = await params as { serviceId: string }
  const { serviceId } = p

  // Check if the service ID is valid
  if (!validServiceIds.includes(serviceId)) {
    notFound()
  }

  return <ServiceDetailPage serviceId={serviceId} />
}

// Generate static params for all valid service IDs
export function generateStaticParams() {
  return validServiceIds.map((serviceId) => ({
    serviceId,
  }))
}

// Generate metadata for each service
export async function generateMetadata({ params }: PageProps) {
  // await params to handle possible promise
  const p = await params as { serviceId: string }
  const { serviceId } = p

  const serviceNames: Record<string, string> = {
    'safari-tours': 'Safari Tours - African Wildlife Adventures',
    'flight-booking': 'Flight Booking - Best Prices Guaranteed', 
    'car-rentals': 'Car Rentals - Premium 4WD Vehicles',
    'visa-processing': 'Visa Processing - Complete Assistance',
    'travel-products': 'Travel Products - Essential Safari Gear',
    'client-account': 'Client Account - Manage Your Adventures'
  }

  return {
    title: serviceNames[serviceId] || 'Service - Letrum Agency',
    description: `Discover our ${serviceId.replace('-', ' ')} services at Letrum Agency. Professional travel solutions for your African adventure.`
  }
}
