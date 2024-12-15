'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../assets/icons/icons'
import { useUser } from "../../utils/hooks/useUser"
import Link from 'next/link' // Use Next.js Link component

function Complete() {
  const { currentUser } = useUser();

  return (
    <div className='complete'>
      <FontAwesomeIcon icon={icons.check} alt="" />
      <h1>Your order is confirmed!</h1>
      <p>Thank you for your order, {currentUser.firstName}.</p>
      <Link href="/"><button>CONTINUE SHOPPING</button></Link> {/* Correct Link usage */}
    </div>
  )
}

export default Complete
